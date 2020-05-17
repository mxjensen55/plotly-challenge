var dataSet;
var userInput = "";

// Initializes the page with a default plot
async function metaData(sample) {
    var url = "https://raw.githubusercontent.com/the-Coding-Boot-Camp-at-UT/UT-MCC-DATA-PT-01-2020-U-C/master/homework-instructions/15-Interactive-Visualizations-and-Dashboards/Instructions/data/samples.json?token=AOESZX4OOQNX3IHWFGMZHPK6ZHJ7I"
    dataSet = await d3.json(url)
    console.log(dataSet)

    var metaData = dataSet.metadata;
    console.log(metaData)
    var result_array = metaData.filter(object => object.id == sample)
    console.log(result_array)
    var result = result_array[0];
    console.log(result)
    var input_metadata = d3.select("#sample-metadata");
    input_metadata.html("");
    Object.entries(result).forEach(([key, value]) => {
        input_metadata.append("h6").text(`${key}: ${value}`);
    });

}
async function buildCharts(sample) {
    var url = "https://raw.githubusercontent.com/the-Coding-Boot-Camp-at-UT/UT-MCC-DATA-PT-01-2020-U-C/master/homework-instructions/15-Interactive-Visualizations-and-Dashboards/Instructions/data/samples.json?token=AOESZX4OOQNX3IHWFGMZHPK6ZHJ7I"
    dataSet = await d3.json(url)

    var samples = dataSet.samples;
    var result_array = samples.filter(object => object.id == sample)
    var result = result_array[0];
    var otu_ids = result.otu_ids;
    var sample_values = result.sample_values;
    var otu_labels = result.otu_labels;

    var barData = [{
        y: otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
        x: sample_values.slice(0, 10).reverse(),
        text: otu_labels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h"
    }];

    var barLayout = {
        title: "Top 10 OTUs per Subject",
        titlefont: {
            "size": 24
        },
        yaxis: {
            tickmode: "linear",
        },
        margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 30
        }
    };


    Plotly.newPlot("bar", barData, barLayout);

    var bubbleData = [{
        y: sample_values,
        x: otu_ids,
        text: otu_labels,
        mode: "markers",
        marker: {
            size: sample_values,
            color: otu_ids,
            colorscale: "Earth"
        }
    }];

    var bubbleLayout = {
        title: "Frequency of Total OTUs per Subject",
        titlefont: {
            "size": 24
        },
        showlegend: false,
        height: 600,
        width: 1000
    }

    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
}
async function init(names) {
    var url = "https://raw.githubusercontent.com/the-Coding-Boot-Camp-at-UT/UT-MCC-DATA-PT-01-2020-U-C/master/homework-instructions/15-Interactive-Visualizations-and-Dashboards/Instructions/data/samples.json?token=AOESZX4OOQNX3IHWFGMZHPK6ZHJ7I"
    dataSet = await d3.json(url)



    var inputButton = d3.select("#selDataset")

    dataSet.names.forEach(function(name) {
        inputButton.append("option").text(name);
    });
    var first_sample = dataSet.names[0];
    console.log(first_sample)
    metaData(first_sample);
    buildCharts(first_sample);
}


init();

function optionChanged(newSample) {
    metaData(newSample);
    buildCharts(newSample);

}