const playButton = document.getElementById("play-button");
const shotButton = document.getElementById("shot-button");
const passButton = document.getElementById("pass-button");
const infoSpace = document.getElementById("rules-scoreboard-div");
const intro = document.getElementById("intro-div");
const addPlayer = document.getElementById("add-player-field");
const addPlayerForm = document.getElementById("add-player-form")
const playerNameField = document.getElementById("add-player-field")

const playerDareButton = document.getElementById("player-dares");
const allDaresButton = document.getElementById("game-dares");
const ruleButton = document.getElementById("rules");
const showScoreboard = document.getElementById("scoreboard");

const turnPlayer = document.getElementById("turn-player");
const showDare = document.getElementById("dares");
const playerScore = document.getElementById("game-score");
const playerShots = document.getElementById("shots-count");


var listOfDares = [];
var previousDares = [];
var getScore = [];


var currentDare = {};
var currentId = -1;
var listOfPlayers = {};
var randomPlayer = {};
var selectedPlayer = {};

var currentPlayer = listOfPlayers[currentId];

addPlayer.focus()


//to be called on load
document.addEventListener('DOMContentLoaded', function(){
 	fetchDares();
 })

//click event(s) for play button
playButton.addEventListener("click", doneDare,false);
playButton.addEventListener("click", getScoreboard,false);
playButton.addEventListener("click", function(){generateDare(listOfDares)},false);
playButton.addEventListener("click", function(){createTurn(currentPlayer.id,currentDare.id)},false);

//click event(s) for shot button
shotButton.addEventListener("click", shotDare,false);
shotButton.addEventListener("click", function(){generateDare(listOfDares)},false);


//click event(s) for pass button
passButton.addEventListener("click", passDare,false);

//click event for add player button 
addPlayerForm.addEventListener('submit', e=> {
	e.preventDefault()

	let player = playerNameField.value
	player = capitalizeWord(player)

	let newPlayer = {name: player}

	if(player){
		adapter.createPlayer(newPlayer).then(res=> {
			//enable elements
		fetchPlayers();
		alert(player +" was added")
		playerNameField.value = ""
		playerNameField.placeholder="Add a Player"
		
		})
		playButton.disabled=false
		
	}
	else {
		alert("Please ener a name")
	}
});


function capitalizeWord(string){
	const s = string.toLowerCase()
	return s.charAt(0).toUpperCase() + s.slice(1)
}

function showPlayerDares(){
	infoSpace.innerHTML="player dares";
}

function showGameDares(){
	infoSpace.innerHTML="game dares";
}

function showRules(){
	infoSpace.innerHTML="rules";
}

function createTurn(player_id, dare_id){
	adapter.createPlayerTurn(currentPlayer.id, currentDare.id).then(res => {
		
		console.log(currentPlayer.id)
		console.log(currentDare.id)
		console.log("player turn created")
	})
}

function getScoreboard(){	
	var theScore = [];
	for(var i = 0; i < listOfPlayers.length; i++)
	{	
		 theScore += `
 		<span> 
 			${listOfPlayers[i].name}<br>
 			score: ${listOfPlayers[i].score}<br>
			shots: ${listOfPlayers[i].shots}<br>
			<br>
 		</span>

 	`
	}
	infoSpace.innerHTML= `<br><br><div class="ui raised segment" id="scores">
 		<a class="ui red ribbon label">Scoreboard</a>
 		<br><br>`+theScore +`</div>`
}

function doneDare(){
	if (previousDares.length >= 1){
		currentPlayer.score += currentDare.points
		playerScore.innerHTML = currentPlayer.score	
	}
	else{
		shotButton.disabled=false
		passButton.disabled=false
		// buttons for scoreboard, rules, player dares, and game dares
intro.innerHTML = "";
playerDareButton.addEventListener("click", showPlayerDares,false);
allDaresButton.addEventListener("click", showGameDares,false);
ruleButton.addEventListener("click", showRules,false);
scoreboard.addEventListener("click", getScoreboard,false);
	}
	TurnPlayer();
}

function shotDare(){
	currentPlayer.shots += currentDare.shots
	getScoreboard()
	TurnPlayer();
}

function passDare(){
	if (currentPlayer.score <=0) {
		alert("you dont have any points! \nYou will have to do the dare or take the penalty shot(s).")
	}
	else if ((currentPlayer.score - currentDare.points)<0) {
		alert("you dont have enough points to pass this dare! \nYou will have to do the dare or take the penalty shot(s).")
	}
	else{
	 	currentPlayer.score -= currentDare.points
	 	playerScore.innerHTML = currentPlayer.score
	 	TurnPlayer();
	 	getScoreboard()
	}
}

//cycles through the list of players
function TurnPlayer(){
	if (currentId >= listOfPlayers.length-1) {
		currentId = -1;
		console.log('reset');
	}
	currentId ++
	currentPlayer = listOfPlayers[currentId];

	turnPlayer.innerHTML = "Turn Player: "+ currentPlayer.name;
	playerScore.innerHTML = currentPlayer.score;
	playerShots.innerHTML = currentPlayer.shots;
}


//collects dares from backend.
function fetchDares() {
	adapter.getDares()
	.then(dares => retrieveDares(dares))	
}

//collects players from backend.
function fetchPlayers() {
	adapter.getPlayers()
	.then(players => retrievePlayers(players))	
}



//all loaded Dares
function  retrieveDares(dares){
	var dareList = [];
	dares.forEach(dare=> {		
		dareList.push(dare);	
	});
	listOfDares = dareList;
}

//all loaded Dares
function  retrievePlayers(players){
	var playerList = [];
	players.forEach(player=> {		
		playerList.push(player);	
	});
	listOfPlayers = playerList;
}

//randomly selects a Player.
function generatePlayer(){
	return Math.floor(Math.random() * (listOfPlayers.length));
}

//randomly selects a dare.
function generateDare()   
 {		 
 	
 		var ranDare = Math.floor(Math.random() * (listOfDares.length));
 		currentDare = listOfDares[ranDare];
 		console.log(currentDare);	
 		var dareText = currentDare.text
 	

 		//checks to see if a random player needs to be inserted
 		if (dareText.includes("[RandomPlayer]")){
 			randomPlayer=  generatePlayer();
 			selectedPlayer = listOfPlayers[randomPlayer];
 			console.log(selectedPlayer.id, currentPlayer.id)
 			//stops current player from being the random player
 			if (selectedPlayer.id == currentPlayer.id){
 				while (selectedPlayer.id == currentPlayer.id){
 					randomPlayer=  generatePlayer();
 					console.log(randomPlayer);
 					selectedPlayer = listOfPlayers[randomPlayer];
 				}
 			}


			dareText = dareText.replace("[RandomPlayer]", selectedPlayer.name);
			console.log('replaced RandomPlayer');
		}
 		
 	
 		showDare.innerHTML = dareText +
 		`<br><br><span>points: </span>`+ currentDare.points + `<br> <span>penalty shot(s): </span>`+ currentDare.shots;
 		dareArchive(currentDare);	
 }

//creates archive for all players of current game
function dareArchive(currentDare) {
	previousDares.push(currentDare);
}
