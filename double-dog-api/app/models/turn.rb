class Turn < ApplicationRecord
	has_many :player_turns
	has_many :players, through: :player_turns
end
