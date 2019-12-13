class PlayerTurnsController < ApplicationController
  def index
    player_turn = PlayerTurn.all
    render json: player_turn
  end

  def create
    player_turn = PlayerTurn.create(player_id: player_turn_params[:player_id], dare_id: player_turn_params[:dare_id])
    render json: player_turn
  end


  private
  def player_turn_params
    params.require(:player_turn).permit(:player_id, :dare_id)
  end
end