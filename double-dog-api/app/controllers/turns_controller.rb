class TurnsController < ApplicationController
  def index
  	turns = Turn.all
  	render json: turns
  end
end
