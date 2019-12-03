class PlayerTurnsController < ApplicationController
  def index
  	player_turn = Game.find(game_params[:game_id]).player_turns
  	render json: player_turn
  end

  def create
    player_turn = Game.find(game_params[:game_id]).player_turns.create(player_id: player_params[:player_id], dare_id: dare_params[:dare_id])
    render json: player_turn
  end


  private
  def player_params
  	params.permit(:player_id)
  end

  def game_params
    params.permit(:game_id)
  end

  def dare_params
    params.permit(:dare_id)
  end

end
