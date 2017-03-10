// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const ipc = require('electron').ipcRenderer;
let PieChart = require('./PieChart');

let menuScreen = document.getElementById("menuScreen")
let canvas = document.getElementById("myChart")
let ctx = canvas.getContext("2d")
let myPieChart, mpc;

let gameSelectors = document.querySelectorAll(".btn-choic-team")
let bestZone = document.getElementById("best")

let timer;
let isClicked = 0;

let generateScene = e => {
    e.preventDefault()
    let id = e.currentTarget.id;
    let nbPlayer = id.slice(-1);
    menuScreen.classList.add("toOutofScope")


    myPieChart = new PieChart(nbPlayer, canvas);
    mpc = myPieChart.pie;

    ipc.send('game-start', nbPlayer);
}

let showBest = () => {
    myPieChart.setBest();
    console.log(myPieChart.best);
    bestZone.innerText = myPieChart.best;
}

ipc.on("double-score", (evt, id) => {
    id = id -1;
    let score = mpc.data.datasets[0].data[id] =  mpc.data.datasets[0].data[id]*2;
    updateScore(id, score);
})

ipc.on("update-chart-score", (evt, id, score) => {
    id = id - 1;
    mpc.data.datasets[0].data[id] =  score;
    updateScore(id, score);
})

gameSelectors.forEach(element => {
    element.addEventListener('click', generateScene)
})

canvas.ondblclick = evt => {
    console.log("dbl click")
    isClicked = 0;
    var activePoints = mpc.getElementsAtEvent(evt);
    var chartData = activePoints[0]['_chart'].config.data;
    var idx = activePoints[0]['_index'];

    if(chartData.datasets[0].data[idx] -1 != 0)
    {
        var value = --chartData.datasets[0].data[idx];
        updateScore(idx, value);
    }
};

canvas.onclick = evt => {
    console.log("timer : "+timer)
    console.log("Isclicked : "+ isClicked)

    if (isClicked) { clearTimeout(timer); return;}
    isClicked = 1;
    timer = setTimeout(function() {
        isClicked = 0;
        var activePoints = mpc.getElementsAtEvent(evt);
        var chartData = activePoints[0]['_chart'].config.data;
        var idx = activePoints[0]['_index'];

        var value = ++chartData.datasets[0].data[idx];
        updateScore(idx, value);

    }, 400);
};

let updateScore = (id, score) => {
    mpc.update();
    ipc.send('updated-score', id, score);
    showBest();
}
