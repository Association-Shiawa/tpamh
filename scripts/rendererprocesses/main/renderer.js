// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.


let PieChart = require('./PieChart');

let menuScreen = document.getElementById("menuScreen")
let canvas = document.getElementById("myChart")
let ctx = canvas.getContext("2d")
let myPieChart, mpc;

let gameSelectors = document.querySelectorAll(".btn-choic-team")
let bestZone = document.getElementById("best")

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

var timer;
var isClicked = 0;

canvas.ondblclick = function (evt) {
    console.log("dbl click")
    isClicked = 0;
    var activePoints = mpc.getElementsAtEvent(evt);
    var chartData = activePoints[0]['_chart'].config.data;
    var idx = activePoints[0]['_index'];

    var label = chartData.labels[idx];
    var value = chartData.datasets[0].data[idx]--;
    mpc.update();
    showBest();
};

canvas.onclick = function (evt) {
    console.log("timer : "+timer)
    console.log("Isclicked : "+ isClicked)

    if (isClicked) { clearTimeout(timer); return;}
    isClicked = 1;
    timer = setTimeout(function() {
        isClicked = 0;
        var activePoints = mpc.getElementsAtEvent(evt);
        var chartData = activePoints[0]['_chart'].config.data;
        var idx = activePoints[0]['_index'];

        var label = chartData.labels[idx];
        var value = chartData.datasets[0].data[idx]++;
        mpc.update();
        showBest();

    }, 400);
};

function showBest(){
    myPieChart.setBest();
    console.log(myPieChart.best);
    bestZone.innerText = myPieChart.best;
}
