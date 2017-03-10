const ipc = require('electron').ipcRenderer;

let controllersContainer =  document.getElementById('controllers')
let doublers, scores;

ipc.send('controls-ready');

ipc.on('nb-teams', (evt, nbTeam) => {

    for(let i = 1; i <= nbTeam; i++){

        let col = Math.ceil(12 / nbTeam);


        let input = '<input type="number" class="scores" id="team-'+i+'" min="0" value="1"/>'
        let btn = '<a class="btn-choic-team doubler" id="double-'+i+'"><span>Doubler</span><div class="transition-bar"></div></a>'
        let teamControllers = document.createElement("div")
        teamControllers.classList.add("col-sm-"+ col)
        teamControllers.innerHTML = '<p> Team '+ i+'</p>' + input + btn;

        controllersContainer.appendChild(teamControllers)
    }

    doublers = document.querySelectorAll('.doubler')
    scores = document.querySelectorAll('.scores')

    doublers.forEach((element) => {
        element.addEventListener('click', doubleScore)
    })

    scores.forEach((element) => {
        element.addEventListener('keyup', changeScore)
        element.addEventListener('change', changeScore)
    })

})

ipc.on('update-input-score', (evt, id, score) => {
    id = id + 1;
    let input = document.getElementById("team-"+id)
    input.value = score
})


doubleScore = (e) => {
    e.preventDefault()
    let team = e.currentTarget.id.slice(-1);
    console.log("Sending event")
    ipc.send('double-score-clicked', team);
}

changeScore = (e) => {
    e.preventDefault()
    let id = e.currentTarget.id.slice(-1);
    let score = e.currentTarget.value;
    ipc.send('update-score-clicked', id, score);
}