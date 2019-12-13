class GameTurn < ApplicationRecord
  belongs_to :game
  belongs_to :player_turn
end
