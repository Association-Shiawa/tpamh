// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.


let PieChart = require('./PieChart');

let canvas = document.getElementById("myChart")
let ctx = canvas.getContext("2d")

myPieChart = new PieChart(4, canvas);
let mpc = myPieChart.chart();

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
    //ajout de système de dblclick si deux clics sont effectués à la suite
    var activePoints = mpc.getElementsAtEvent(evt);
    var chartData = activePoints[0]['_chart'].config.data;
    var idx = activePoints[0]['_index'];

    var label = chartData.labels[idx];
    var value = chartData.datasets[0].data[idx]++;
    mpc.update();

    var url = "http://example.com/?label=" + label + "&value=" + value;
    console.log(url);
};

// randomize();


