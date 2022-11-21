class Level < ApplicationRecord
  belongs_to :category
  has_many :attempts

  validates :total_problems, presence: true
  validates :total_problems, numericality: { only_integer: true, greater_than: 0 }
end
