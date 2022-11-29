class Level < ApplicationRecord
  belongs_to :category
  has_many :attempts

  validates :name, :total_problems, presence: true
  validates :name, length: { minimum: 3, maximum: 36 } # e.g. a guid is 36 characters long
  validates :total_problems, numericality: { only_integer: true, greater_than: 0 }
end
