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
const sortButton = document.getElementById("sort");

const turnPlayer = document.getElementById("turn-player");
const showDare = document.getElementById("dares");
const playerScore = document.getElementById("game-score");
const playerShots = document.getElementById("shots-count");

var winScore = 10;

var listOfDares = [];
var listOfGames = [];
var previousDares = [];
var getScore = [];
var gameId =0;


var currentDare = {};
var currentId = -1;

var currentPlayers = {};
var listOfPlayerTurns = {};
var listOfPlayersTurns = {};
var listOfGameTurns = {};
var randomPlayer = {};
var selectedPlayer = {};

var currentPlayer = currentPlayers[currentId];

addPlayer.focus()


//class construstion
class Player{
	constructor(id, name, score, shots){
		this.id = id;
        this.name = name;
        this.score = score;
        this.shots = shots;
	}

	//additional class methods
	addScore() {
		this.score += currentDare.points
	}
	subtractScore(){
		this.score -= currentDare.points
	}
	addShot(){
		this.shots += currentDare.shots
	}
}
//to be called on load
document.addEventListener('DOMContentLoaded', function(){
 	fetchDares();
 	startGame();

 })


function sortFunction(){
	var sortlist = []
	var sList = []
    return fetch(`http://localhost:3000/games/${gameId}/players`,{
      headers: { "Content-Type": "application/json" },
    })
    .then(resp => resp.json())
    .then(players => {
    	
		for(let i = 0; i < players.length; i++){
			sortlist.push (players[i].name)
		}

		sortlist = sortlist.sort()

		for (let i = 0; i < sortlist.length; i++){

			sList += `<span> ${sortlist[i]} <br> </span>`
		}
	
	infoSpace.innerHTML= `<br><br><div class="ui raised segment" id="sortednames">
 	<a class="ui red ribbon label">sorted names</a>
 	<br><br>`+ sList +`</div>`;
	})
	};

function fetchGame(){
	adapter.getGame()
	.then(games => retrieveGame(games))
}



//click event(s) for play button
gameTurns(playButton,doneDare);


//funcion to see if game is finished
function gameWon(){
	winScore = listOfGames.find(g => g.id ==gameId).winScore;
	if (currentPlayer.score >= winScore){
		alert("Game OVER\n" + currentPlayer.name +" has won the game!!\n refresh the page to start a new game")
		playButton.disabled = true
		shotButton.disabled = true
		passButton.disabled = true
	}
}

//click event(s) for shot button
gameTurns(shotButton,shotDare);


//click event(s) for pass button
	passButton.addEventListener("click", passDare,false);
	passButton.addEventListener("click", getScoreboard,false);
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

//creates a game, triggered on page load
function startGame(){
	alert("participation on this WebSite is restricted to those individuals who are over 21 years of age, depending on the state you live in , and are fully able and competent to enter into the terms, conditions, obligations, affirmations, representations and warranties herein. By registering or participating in services or functions on this Site, you hereby represent that you are over 21 years of age and have the authority to enter into the terms herein. In any case, you affirm that you are over the age of 21 in all states as the Site is not intended for persons under 21. If you are under 21 years of age, [please exit and do not use the Site] ")
	adapter.createGame().then(res=> {
		fetchGame();
	})
 }


//capitalize first letter in player names
function capitalizeWord(string){
	const s = string.toLowerCase()
	return s.charAt(0).toUpperCase() + s.slice(1)
}


//fuctions to create and retrieve turns
function gameTurns(button,buttonFunction){
	button.addEventListener("click", buttonFunction,false);
	button.addEventListener("click", getScoreboard,false);
	button.addEventListener("click", function(){generateDare(listOfDares)},false);
	button.addEventListener("click", function(){createTurn()},false);
}

//reveal past dares in info space
function showGameDares(){	
	var pastDares = [];
	let currentName = ""
	let currentText = ""
	for(let i = 0; i < listOfGameTurns.length; i++)
	{	

		currentName = Object.values(currentPlayers).find(x => x.id == listOfPlayerTurns[listOfGameTurns[i].player_turn_id-1].player_id).name
		currentText = listOfDares.find(x => x.id == listOfPlayerTurns.find(t => t.id ==[listOfGameTurns[i].player_turn_id]).dare_id).text

		 pastDares += `
 		<span> 
 			turn: ${(i+1)}<br>
 			player: ${currentName}<br>
				
 			dare: ${currentText}<br>
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
	for(let i = 0; i < listOfPlayersTurns.length; i++)
	{	
		 playerDares += `
 		<span> 
 			turn: ${(i+1)}<br><br>
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
 		<br><br>Welcome to Double Dog Dare <br><br> the rules are simple first one to 10 points wins! The turns go in order from the first person added to the last. 
 		When it is your turn you have the choice of: <br><br>  1. Doing the dare and gaining the points (if your dare involves another perosn they must also agree). <br><br> 2. Taking the penalty shot(s)
 		allowing you to pass the dare without losing any points. <br><br> 3. Passing the dare avoiding the penalty shot(s) but also losing the losing the 
 		same amount of points you would have gained(only if you have enough points to do so).  
 		</div>`;
}

function createTurn(){
	adapter.createPlayerTurn(currentPlayer.id, currentDare.id).then(res => {
		fetchPlayerTurns();
		fetchPlayersTurns();
	})
}

function createGameTurn(){
	adapter.createGameTurn(gameId,listOfPlayerTurns[listOfPlayerTurns.length-1].id).then (res => {
	fetchGameTurns();
	})
}



function getScoreboard(){	
	var theScore = [];
	for(let i = 0; i < Object.keys(currentPlayers).length; i++)
	{	
		 theScore += `
 		<span> 
 			${currentPlayers[i].name}<br>
 			score: ${currentPlayers[i].score}<br>
			shots: ${currentPlayers[i].shots}<br>
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
		if ((currentPlayer.score + currentDare.points)<0) {
			alert("you dont have enough points!\n You will be given a new dare!!")
		}
		else if (currentPlayer.score + currentDare.points > 10) {
			currentPlayer.addScore();
		 	gameWon()	
		}
		else {
			currentPlayer.addScore();
			TurnPlayer();
		}
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
		sortButton.addEventListener("click", sortFunction, false);
		TurnPlayer();
	}
		
}

function shotDare(){
	currentPlayer.addShot()
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
	else if (currentDare.points < 0) {
		currentPlayer.addScore();
		playerScore.innerHTML = currentPlayer.score;
	 
	 	getScoreboard();
	 	TurnPlayer();
	 	generateDare(listOfDares)
		createTurn()
	}
	else{
	 	currentPlayer.subtractScore()
	 	playerScore.innerHTML = currentPlayer.score;
	 	
	 	getScoreboard();
	 	TurnPlayer();
	 	generateDare(listOfDares)
		createTurn()
	}
}

//cycles through the list of players
function TurnPlayer(){
	if (currentId >= Object.keys(currentPlayers).length-1) {
		currentId = -1;

	}
	currentId ++
	currentPlayer = currentPlayers[currentId];

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
	adapter.getPlayerTurns()
		.then(playerTurns => retrievePlayerTurns(playerTurns))
}

//collects certain player turns
function fetchPlayersTurns(){
	adapter.getPlayerTurns()
		.then(playerTurns => retrievePlayersTurns(playerTurns))
}

//collects game turns from backend.
function fetchGameTurns(){
	adapter.getGameTurns(gameId)
		.then(gameTurns => retrieveGameTurns(gameTurns))
}

function  retrieveGame(games){
	listOfGames = [];
	games.forEach(game=> {		
		listOfGames.push(game);	
	});


	gameId = listOfGames[(listOfGames.length-1)].id;
	


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
	let i = 0
	players.forEach(player=> {		
		currentPlayers[i] = new Player(player.id, player.name, player.score, player.shots)
		i++	
	});
}

//load player turns
function retrievePlayerTurns(playerTurns){
	let playerTurnList = [];
	playerTurns.forEach(turn=>{
		playerTurnList.push(turn)
	});
	listOfPlayerTurns = playerTurnList;
	createGameTurn();
}

//load game turns 
function retrieveGameTurns(gameTurns){
	let gameTurnsList = [];
	gameTurns.forEach(gameTurn=>{
		gameTurnsList.push(gameTurn)
	});
	listOfGameTurns = gameTurnsList;
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
	return Math.floor(Math.random() * (Object.keys(currentPlayers).length));
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
 			selectedPlayer = currentPlayers[randomPlayer];
 			//stops current player from being the random player
 			if (selectedPlayer.id == currentPlayer.id){
 				while (selectedPlayer.id == currentPlayer.id){
 					randomPlayer=  generatePlayer();
 					selectedPlayer = currentPlayers[randomPlayer];
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