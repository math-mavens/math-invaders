class Attempt < ApplicationRecord
  belongs_to :user
  belongs_to :level

  # validates :total_time, :problems_solved, :score, presence: true
  # validates :total_time, numericality: { only_integer: true, greater_than: 0 }
  # validates :problems_solved, numericality: { only_integer: true,
                                              # greater_than_or_equal_to: 0 }
end
