class Game < ApplicationRecord
	has_many :players
	has_many :game_turns
end
