class GameTurnsController < ApplicationController
  def index
    game_turns = Game.find(game_params[:game_id]).game_turns.all
    render json: game_turns
  end

  def create
    game_turn = Game.find(game_params[:game_id]).game_turns.create(game_id: game_turn_params[:game_id], player_turn_id: game_turn_params[:player_turn_id])
    render json: game_turn
  end


  private
  def game_turn_params
    params.require(:game_turn).permit(:game_id, :player_turn_id)
  end

  def game_params
    params.permit(:game_id)
  end
end
