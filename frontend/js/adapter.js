const URL = "http://localhost:3000"

const adapter = {

  getPlayers: () => {
    return fetch(`${URL}/games/1/players`)
    .then(res=>res.json())
  },

  createPlayer: (name) => {
    return fetch(`${URL}/games/1/players`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(name)
    })
    .then(resp => resp.json()) 
  },

  createTurn: (player) => {
    return fetch(`${URL}/turns`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(name)
    })
    .then(resp => resp.json()) 
  },

  getDares: () => {
  	return fetch(`${URL}/dares`)
  	.then(resp => resp.json()) 
  }
}