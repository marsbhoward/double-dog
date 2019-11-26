class PlayerTurn < ApplicationRecord
  belongs_to :turn
  belongs_to :player
end
