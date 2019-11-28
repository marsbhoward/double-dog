const URL = "http://localhost:3000"

const adapter = {

  getPlayer: () => {
    return fetch(`${URL}/games/${id}/players`)
    .then(res=>res.json())
  },

  createPlayer: (name) => {
    return fetch(`${URL}/games/${id}/players`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(name)
    })
    .then(res => res.json())
  },

  getDares: () => {
  	return fetch(`${URL}/dares`)
  	.then then(res=>res.json())
  }

  createGame: (body) => {
    return fetch(`${URL}/games`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })
  },
