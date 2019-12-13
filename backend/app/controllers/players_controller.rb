class PlayersController < ApplicationController
  def index()
  	players = Game.find(game_params[:game_id]).players.all
  	render json: players
  end

  def show()
    player = Game.find(game_params[:game_id]).players.find(player_params[:id])
    render json: player
  end

  def create()
    player = Game.find(game_params[:game_id]).players.create(name: player_params[:name])
    render json: player
  end

  private

  def player_params
    params.require(:player).permit(:id, :name, :score ,:shots)
  end

  def game_params
    params.permit(:game_id)
  end

end
