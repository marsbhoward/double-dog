class PlayersController < ApplicationController
  def index
  	players = Player.all
  	render json: players
  end

  def show
    @player = Player.find(user_params[:id])
    render json: @player
  end

  def create
    @player = Player.find_or_create_by(name: user_params[:name])
    render json: @user

  end

  private

  def user_params
    params.require(:player).permit(:id, :name, :score ,:shots)
  end

end
