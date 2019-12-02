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
  getPlayers: () => {
    return fetch(`${URL}/games/:game_id/players`)
    .then(res=>res.json())
  },

  createPlayer: (name) => {
    return fetch(`${URL}/games/:game_id/players`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(name)
    })
    .then(resp => resp.json()) 
  },


//player turns
  getPlayerTurns: () => {
    return fetch(`${URL}/player_turns`)
    .then(res=>res.json())
  },

  createPlayerTurn: (player_id, dare_id) => {
    return fetch(`${URL}/player_turns`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({player_id, dare_id})
    })
    .then(resp => resp.json()) 
  },

//dares
  getDares: () => {
  	return fetch(`${URL}/dares`)
  	.then(resp => resp.json()) 
  }
}