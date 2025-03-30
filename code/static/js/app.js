// Function to build the metadata panel (displays demographic info about a sample)
function buildMetadata(sample) {

  // Fetch JSON data asynchronously from the provided URL
  // `.then((data) => ` ensures that the code inside executes *after* the data is successfully retrieved.
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Extract the `metadata` (array of objects containing demographic information about a sample) field from the JSON object
    let metadata = data.metadata;

    // Filter the metadata for the object with the desired sample number
    let resultsArray = metadata.filter(sampleObj => sampleObj.id == sample);
    let result = resultsArray[0];

    // Use d3 to select the panel with id of `#sample-metadata`
    let PANEL = d3.select("#sample-metadata");   // this will display info on the webpage

    // Clear any existing metadata from the panel before inserting new data
    PANEL.html("");

    // Loop through each key-value pair in the `result` object
    // Append an `h6` (heading 6) tag to the panel for each piece of metadata.
    for (key in result){
      PANEL.append("h6").text(`${key.toUpperCase()}: ${result[key]}`);
    };
  });
}

// function to build both charts (bar and bubble)
function buildCharts(sample) {

  // Fetch JSON data asynchronously from the provided URL
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Extract the `samples` (array of objects representing microbiome sample data) field from the JSON object
    let samples = data.samples;

    // Filter the samples for the object with the desired sample number
    let resultsArray = samples.filter(sampleObj => sampleObj.id == sample);
    let result = resultsArray[0];

    // Get the otu_ids, otu_labels, and sample_values from the selected sample
    let otu_ids = result.otu_ids;              // ids for the types of bacteria found
    let otu_labels = result.otu_labels;        // descriptions of the bacteria
    let sample_values = result.sample_values;  // quantity of each bacteria type found

    // Build a Bubble Chart
    let bubbleLayout = {                       // define layout settings for the bubble chart
      title: "Bacteria Cultures Per Sample",   // chart title
      margin: { t: 0 },                        // removes extra margin at the top
      hovermode: "closest",                    // ensures tooltips appear near the hovered point
      xaxis: {title: "OTU ID"},                // label for the x-axis
      yaxis: {'title': "Number of Bacteria"},  // label for the y-axis
      margin: { t: 30 }                        // adds slight top margin for spacing
    };

    // Define data for the bubble chart
    let bubbleData = [
      {
        x: otu_ids,                            // x-axis values (OTU IDs)
        y: sample_values,                      // y-axis values (bacteria counts)
        text: otu_labels,                      // hover text showing bacteria descriptions
        mode: "markers",                       // uses scatter plot markers
        marker: {
          size: sample_values,                 // marker size is based on bacteria count
          color: otu_ids,                      // marker color varies by OTU ID
          colorscale: "Earth"                  // uses a built-in color scheme
        }
      }
    ];

    // Render the Bubble Chart in the `bubble` div
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    let yticks = otu_ids.map(otuID => `OTU ${otuID}`);

    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    let barData = [
      {
        y: yticks.slice(0, 10).reverse(),          // selects the top 10 OTUs and reverses the order for correct bar chart alignment
        x: sample_values.slice(0, 10).reverse(),   // selects the top 10 sample values (bacteria count) and reverses them
        text: otu_labels.slice(0, 10).reverse(),   // selects the top 10 bacteria labels and reverses them
        type: "bar",                               // specifies a bar chart
        orientation: "h"                           // makes it a horizontal bar chart
      }
    ];

    let barLayout = {
      title: "Top 10 Bacteria Culture Found",   // chart title
      margin: {t:30, l:150},                    // adds top and left margin for readability
      xaxis: {'title': "Number of Bacteria"}    // label for the x-axis
    };

    // Render the Bar Chart in the `bar` div
    Plotly.newPlot("bar", barData, barLayout);
  });
}

// Function to run on page load and initialize the dashboard
function init() {

  // Fetch JSON data from the provided URL asynchronously
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Extract the 'names' field from the dataset (an array of sample IDs)
    let sampleNames = data.names;

    // Select the dropdown menu element with id `#selDataset` using d3
    let selector = d3.select("#selDataset");

    // Loop through each sample name in the dataset and add it as an option in the dropdown menu
    for (let i=0; i<sampleNames.length; i++){
      selector
        .append("option")                     // append a new <option> element
        .text(sampleNames[i])                 // set the text inside the option (displayed in dropdown)
        .property("value", sampleNames[i]);   // set the value attribute of the option
    };

    // Get the first sample from the list
    let firstSample = sampleNames[0];

    // Build charts and metadata panel with the first sample
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Function that gets triggered when a new sample is selected from the dropdown
function optionChanged(newSample) {

  // Build charts and metadata panel each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
