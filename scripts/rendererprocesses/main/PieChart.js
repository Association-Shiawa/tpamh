let Chart = require('chart.js')

class PieChart{
    constructor(nbTeam, canvas) {
        this.nbTeam = nbTeam;
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.best = null;
    }

    chart(){
        return new Chart(this.ctx,{
            type: 'pie',
            data: this.data(),
            options: this.options()
        })
    }

    get best(){

    }

    set best(best){

    }

    newTeam(){

    }

    colors() {
        return [
            "#ec407a",
            "#457810",
            "#ec78dc",
            "#78df45"
        ]
    }

    data() {
        return {
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
    }

    options() {
        return {
            animation:{
                animateScale:true
            },
            responsive: true
        };
    }

}
module.exports = PieChart;