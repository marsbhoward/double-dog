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
var listOfGames = [];
var previousDares = [];
var getScore = [];
var gameId =0;


var currentDare = {};
var currentId = -1;
var listOfPlayers = {};
var listOfPlayerTurns = {};
var listOfPlayersTurns = {};
var randomPlayer = {};
var selectedPlayer = {};

var currentPlayer = listOfPlayers[currentId];

addPlayer.focus()


//to be called on load
document.addEventListener('DOMContentLoaded', function(){
 	fetchDares();
 	startGame();
 	
 })

//click event(s) for play button
playButton.addEventListener("click", doneDare,false);
playButton.addEventListener("click", getScoreboard,false);
playButton.addEventListener("click", function(){generateDare(listOfDares)},false);
playButton.addEventListener("click", function(){createTurn(currentPlayer.id,currentDare.id)},false);

//click event(s) for shot button
shotButton.addEventListener("click", shotDare,false);
shotButton.addEventListener("click", function(){generateDare(listOfDares)},false);
shotButton.addEventListener("click", function(){createTurn(currentPlayer.id,currentDare.id)},false);


//click event(s) for pass button
passButton.addEventListener("click", passDare,false);

//click event for add player button 
addPlayerForm.addEventListener('submit', e=> {
	e.preventDefault()

	let player = playerNameField.value
	player = capitalizeWord(player)

	let newPlayer = {name: player}

	if(player){
		adapter.createPlayer(newPlayer,gameId).then(res=> {
			//enable elements
		fetchPlayers();
		console.log(gameId);
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

//
function startGame(){
	adapter.createGame().then(res=> {
		fetchGame();
	})
 }


//capitalize first letter in player names
function capitalizeWord(string){
	const s = string.toLowerCase()
	return s.charAt(0).toUpperCase() + s.slice(1)
}


//reveal past dares in info space
function showGameDares(){	
	var pastDares = [];
//	fetchPlayerTurns();
	for(var i = 0; i < listOfPlayerTurns.length; i++)
	{	
		 pastDares += `
 		<span> 
 			turn: ${listOfPlayers[(i)].name}<br>
 			player: ${listOfPlayerTurns[i].name}<br>

 			dare: ${listOfDares[(listOfPlayerTurns[i].dare_id-1)].text}<br>
			<br>
 		</span>
 	`
	}
	infoSpace.innerHTML= `<br><br><div class="ui raised segment" id="past_dares">
 		<a class="ui red ribbon label">All Past Dares</a>
 		<br><br>`+pastDares +`</div>`;
}

function showPlayersDares(){
	var playerDares = [];
	for(var i = 0; i < listOfPlayersTurns.length; i++)
	{	
		 playerDares += `
 		<span> 
 			turn: ${listOfPlayersTurns[i].id}<br>
 			dare: ${listOfDares[(listOfPlayersTurns[i].dare_id-1)].text}<br>
			<br>
 		</span>

 	`
	}
	infoSpace.innerHTML= `<br><br><div class="ui raised segment" id="scores">
 		<a class="ui red ribbon label">Your Past Dares</a>
 		<br><br>`+playerDares +`</div>`
}

function showRules(){
	infoSpace.innerHTML= `<br><br><div class="ui raised segment" id="past_dares">
 		<a class="ui red ribbon label">Rules</a>
 		<br><br>Welcome to Double Dog Dare <br><br> the rules the simple the turns go in order from the first person added to the last. 
 		When it is your turn you have the choice of: <br><br>  1. Doing the dare and gaining the points. <br><br> 2. Taking the penalty shot(s)
 		allowing you to pass the dare without losing any points. <br><br> 3. Passing the dare avoiding the penalty shot(s) but also losing the losing the 
 		same amount of points you would have gained(only if you have enough points to do so).  
 		</div>`;
}

function createTurn(){
	adapter.createPlayerTurn(currentPlayer.id, currentDare.id, gameId).then(res => {
		console.log(gameId)
		fetchPlayerTurns()
		fetchPlayersTurns()
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
		playerDareButton.addEventListener("click", showPlayersDares,false);
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
	 	generateDare(listOfDares);
	 	createTurn(currentPlayer.id,currentDare.id);
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


//retieves game id
function fetchGame(){
	adapter.getGame()
	.then(games => retrieveGame(games))
}

//collects dares from backend.
function fetchDares() {
	adapter.getDares()
	.then(dares => retrieveDares(dares))	
}

//collects players from backend.
function fetchPlayers() {
	adapter.getPlayers(gameId)
	.then(players => retrievePlayers(players))	
}

//collects player turns from backend.
function fetchPlayerTurns(){
	adapter.getPlayerTurns(gameId)
		.then(playerTurns => retrievePlayerTurns(playerTurns))
}

//collects certain player turns
function fetchPlayersTurns(){
	adapter.getPlayerTurns(gameId)
		.then(playerTurns => retrievePlayersTurns(playerTurns))
}


function  retrieveGame(games){
	games.forEach(game=> {		
		listOfGames.push(game);	
	});

	console.log(listOfGames)

	gameId = listOfGames[(listOfGames.length-1)].id;
	listOfGames = [];


}

//all loaded Dares
function  retrieveDares(dares){
	let dareList = [];
	dares.forEach(dare=> {		
		dareList.push(dare);	
	});
	listOfDares = dareList;
}

//all loaded players
function  retrievePlayers(players){
	let playerList = [];
	players.forEach(player=> {		
		playerList.push(player);	
	});
	listOfPlayers = playerList;
}

//load player turns
function retrievePlayerTurns(playerTurns){
	let playerTurnList = [];
	playerTurns.forEach(turn=>{
		playerTurnList.push(turn)
	});
	listOfPlayerTurns = playerTurnList;
}

//load current players turns
function retrievePlayersTurns(playerTurns){
	let playersTurnList = [];
	playerTurns.forEach(turn=>{
		if (turn.player_id == currentPlayer.id)
		{
			playersTurnList.push(turn)
		}
		
	});
	listOfPlayersTurns = playersTurnList;
	}

//randomly selects a Player.
function generatePlayer(){
	return Math.floor(Math.random() * (listOfPlayers.length));
}

//randomly selects a dare.
function generateDare()   
 {		 
 	
 		let ranDare = Math.floor(Math.random() * (listOfDares.length));
 		currentDare = listOfDares[ranDare];	
 		let dareText = currentDare.text
 	

 		//checks to see if a random player needs to be inserted
 		if (dareText.includes("[RandomPlayer]")){
 			randomPlayer=  generatePlayer();
 			selectedPlayer = listOfPlayers[randomPlayer];
 			//stops current player from being the random player
 			if (selectedPlayer.id == currentPlayer.id){
 				while (selectedPlayer.id == currentPlayer.id){
 					randomPlayer=  generatePlayer();
 					selectedPlayer = listOfPlayers[randomPlayer];
 				}
 			}


			dareText = dareText.replace("[RandomPlayer]", selectedPlayer.name);
		}
 		
 	
 		showDare.innerHTML = dareText +
 		`<br><br><span>points: </span>`+ currentDare.points + `<br> <span>penalty shot(s): </span>`+ currentDare.shots;
 		dareArchive(currentDare);	
 }

//creates archive for all players of current game
function dareArchive(currentDare) {
	previousDares.push(currentDare);
}
