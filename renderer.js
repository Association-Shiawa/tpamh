// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

let Chart = require('chart.js')


let canvas = document.getElementById("myChart")
let ctx = canvas.getContext("2d")

let colors = [
    "#ec407a",
    "#457810",
    "#ec78dc",
    "#78df45"
];

let data = {
    labels: [
        "Red",
        "Blue",
        "Yellow"
    ],
    datasets: [
        {
            data: [1, 1, 1],
            backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
            ],
            hoverBackgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
            ]
        }]
};

let options = {
    animation:{
        animateScale:true
    },
    responsive: true
};

// For a pie chart
let myPieChart = new Chart(ctx,{
    type: 'pie',
    data: data,
    options: options
})

function randomize(){
    setInterval(function(){
        // Get a random index point
        let indexToUpdate = Math.round(Math.random() * (data.datasets[0].data.length -1) );

        // Update one of the points in the second dataset
        myPieChart.data.datasets[0].data[indexToUpdate] = Math.random() * 100;

        myPieChart.update();
    }, 100);
}

function newTeam(name) {
    let labels = myPieChart.data.labels;
    let bgColors = myPieChart.data.datasets[0].backgroundColor;
    let hoverColors = myPieChart.data.datasets[0].hoverBackgroundColor;
    let data = myPieChart.data.datasets[0].data;
    let randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
    let randomColor2 = '#'+Math.floor(Math.random()*16777215).toString(16);

    labels.push(name);
    data.push(10);
    bgColors.push(randomColor);
    hoverColors.push(randomColor2);
}

function updateScore(team, score ) {

}

canvas.onclick = function (evt) {
    var activePoints = myPieChart.getElementsAtEvent(evt);
    var chartData = activePoints[0]['_chart'].config.data;
    var idx = activePoints[0]['_index'];

    var label = chartData.labels[idx];
    var value = chartData.datasets[0].data[idx]++;
    myPieChart.update();

    var url = "http://example.com/?label=" + label + "&value=" + value;
    console.log(url);
};

// randomize();


