class TurnsController < ApplicationController
	def index
		turns = Turn.all
		render json: turns
	end

	def create
		turn = Game.find_by(id:1).turn.create(name: player_params[:name])
		render json: @player
	end


	private

	def player_params
	params.require(:player).permit(conunt)
	end

end

