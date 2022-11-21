class Category < ApplicationRecord
  has_many :levels

  validates :name, presence: true
  validates :name, length: { minimum: 3, maximum: 50 }
end
