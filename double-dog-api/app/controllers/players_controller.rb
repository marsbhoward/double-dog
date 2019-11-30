class PlayersController < ApplicationController
  def index
  	players = Player.all
  	render json: players
  end

  def show
    player = Player.find(player_params[:id])
    render json: player
  end

  def create
    player = Game.find_by(id:1).players.create(name: player_params[:name])
    render json: player

  end

  private

  def player_params
    params.require(:player).permit(:id, :name, :score ,:shots)
  end

end
