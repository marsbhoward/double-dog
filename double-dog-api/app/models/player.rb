class Player < ApplicationRecord
	belongs_to :game
	has_many :player_turns
	has_many :turns, through: :player_turns

	validates :name, presence: true
end
