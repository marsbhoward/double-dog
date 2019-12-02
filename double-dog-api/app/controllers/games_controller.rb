class GamesController < ApplicationController
  def index
  	games = Game.all
  	render json: games
  end

  def show
    game = Game.find(game_params[:id])
    render json: game
  end

  def create
    game = Game.create()
    render json: game
  end

 private

  def game_params
    params.permit(:id,:winscore)
  end
end