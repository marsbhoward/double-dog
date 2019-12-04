class PlayerTurn < ApplicationRecord
  belongs_to :player
  belongs_to :dare
end