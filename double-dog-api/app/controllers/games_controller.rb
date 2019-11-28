class GamesController < ApplicationController
  def index
  	games = Game.all
  	render json: games
  end

  def show
    game = Game.find(user_params[:id])
    render json: game
  end

 private

  def user_params
    params.permit(:id)
  end
end