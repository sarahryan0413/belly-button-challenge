# Belly Button Biodiversity Dashboard

Ever wondered what kind of 🦠 microscopic life 🦠 is thriving in your belly button? This project dives into the fascinating world of navel-dwelling microbes using an interactive dashboard built with JavaScript, D3.js, and Plotly.

This dashboard allows users to explore the Belly Button Biodiversity dataset, which catalogs microbes found in human navels. The data shows that while most microbial species are unique to individuals, a small group of species is found in more than 70% of people. 🔬

## Features 🎛️
- Interactive Dropdown Menu: Select an individual sample to explore their unique microbial makeup.
- Bar Chart 📊: Displays the top 10 most common operational taxonomic units (OTUs) found in a sample.
- Bubble Chart 🟢🔴🔵: Visualizes the entire microbial community for a sample, with marker size representing abundance.
- Demographic Info Panel 📝: Provides key metadata about the selected individual.
- Dynamic Updates 🔄: All visualizations update seamlessly when a new sample is selected.

## How It Works ⚙️
### Data Handling 📡
- The app fetches data from an external JSON file using the D3 library.
- The JSON contains two key components:
  - samples: Microbial data for each individual.
  - metadata: Demographic information about each individual.

### Visualization Breakdown 📊
1. Bar Chart:
   - Displays the top 10 OTUs found in a sample.
   - Uses sample values for the bar lengths.
   - Uses OTU IDs for labels and OTU labels for hover text.
2. Bubble Chart:
   - Displays all detected OTUs in a sample.
   - Uses OTU IDs for x-values and sample values for y-values.
   - The size of each bubble represents the sample value, while the color is mapped to the OTU ID.
   - Uses OTU labels for hover text.
3. Metadata Panel:
   - Displays key demographic info for the selected sample.
   - Loops through metadata keys and dynamically updates the panel.

## Notes 📌
- I used console.log() liberally while debugging – seeing the raw data helps a lot!
- I checked out the [Plotly.js documentation](https://plotly.com/javascript/) for chart customization.

📊 Data provided by edX Boot Camps LLC for educational purposes.
