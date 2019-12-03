class Game < ApplicationRecord
	has_many :players
	has_many :player_turns, through: :players
end
