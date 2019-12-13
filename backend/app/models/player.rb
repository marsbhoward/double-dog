class Player < ApplicationRecord
	belongs_to :game
	has_many :player_turns


	validates :name, presence: true
end