const URL = "http://localhost:3000"

const adapter = {
//game
createGame: () => {
  return fetch(`${URL}/games`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
    })
    .then(resp => resp.json()) 
  },

  getGame: () => {
    return fetch(`${URL}/games`)
    .then(res=>res.json())
  },

//players
  getPlayers: (game_id) => {
    return fetch(`${URL}/games/${game_id}/players`)
    .then(res=>res.json())
  },

  createPlayer: (name, game_id) => {
    return fetch(`${URL}/games/${game_id}/players`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(name, game_id)
    })
    .then(resp => resp.json()) 
  },


//player turns
  getPlayerTurns: (game_id) => {
    return fetch(`${URL}/games/${game_id}/player_turns`)
    .then(res=>res.json())
  },

  createPlayerTurn: (player_id, dare_id, game_id) => {
    return fetch(`${URL}/games/${game_id}/player_turns`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({player_id, dare_id,game_id})
    })
    .then(resp => resp.json()) 
  },

//dares
  getDares: () => {
  	return fetch(`${URL}/dares`)
  	.then(resp => resp.json()) 
  }
}