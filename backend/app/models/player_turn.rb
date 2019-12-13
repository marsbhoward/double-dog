class PlayerTurn < ApplicationRecord
  belongs_to :player
  belongs_to :dare
  has_one :game_turn
end