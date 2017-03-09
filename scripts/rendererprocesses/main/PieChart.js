let Chart = require('chart.js')

Array.max = function( array ){
    return Math.max.apply( Math, array );
};

class PieChart{
    constructor(nbTeam, canvas) {
        this.nbTeam = nbTeam;
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.bestTeam = null;
        this.colors = [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#8dc73f"
        ];
        this.chart = new Chart(this.ctx,{
            type: 'pie',
            data: this.data(),
            options: this.options()
        });

        for(var i = 1; i <= this.nbTeam; i++){
            this.newTeam(i);
        }
    }

    get pie(){
        return this.chart;
    }

    get best(){
        return this.bestTeam;
    }

    set best(best){
        this.bestTeam = best;
    }

    setBest(){
        let arrayData = this.chart.data.datasets[0].data;
        let maxX = Array.max(arrayData);
        let bests = ""
        let labels = this.chart.data.labels;

        arrayData.forEach(function(element, index){
            if(element == maxX)
            {
                if(bests != ""){
                    bests += ", "
                }
                bests += labels[index];
            }
        });

        this.best = bests;
    }

    newTeam(nb){
        let labels = this.chart.data.labels;
        let bgColors = this.chart.data.datasets[0].backgroundColor;
        let hoverColors = this.chart.data.datasets[0].hoverBackgroundColor;
        let data = this.chart.data.datasets[0].data;
        let randomColor = this.getColor();
        let name = "Equipe " + nb;

        labels.push(name);
        data.push(1);
        bgColors.push(randomColor);
        hoverColors.push(randomColor);

        this.chart.update();
    }

    getColor(){
        return this.colors.pop()
    }

    data() {
        return {
            labels: [

            ],
            datasets: [
                {
                    data: [],
                    backgroundColor: [

                    ],
                    hoverBackgroundColor: [

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


function randomize(){
    setInterval(function(){
        // Get a random index point
        let indexToUpdate = Math.round(Math.random() * (data.datasets[0].data.length -1) );

        // Update one of the points in the second dataset
        myPieChart.data.datasets[0].data[indexToUpdate] = Math.random() * 100;

        myPieChart.update();
    }, 100);
}

module.exports = PieChart;