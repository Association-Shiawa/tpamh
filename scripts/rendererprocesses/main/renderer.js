// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.


let PieChart = require('./PieChart');

let menuScreen = document.getElementById("menuScreen")
let canvas = document.getElementById("myChart")
let ctx = canvas.getContext("2d")
let myPieChart, mpc;

let gameSelectors = document.querySelectorAll(".btn-choic-team")

gameSelectors.forEach(function(element){
    element.addEventListener('click', generateScene)
})

function generateScene(e){
    let id = e.currentTarget.id;
    let nbPlayer = id.slice(-1);
    menuScreen.classList.add("toOutofScope")


    myPieChart = new PieChart(nbPlayer, canvas);
    mpc = myPieChart.pie;

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


