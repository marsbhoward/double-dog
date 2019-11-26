class DaresController < ApplicationController
  def index
  	dares = Dare.all
  	render json: dares
  end
end
