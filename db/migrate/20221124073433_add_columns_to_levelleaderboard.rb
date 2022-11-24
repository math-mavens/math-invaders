class AddColumnsToLevelleaderboard < ActiveRecord::Migration[7.0]
  def change
    add_column :levelleaderboards, :timetaken, :float
    add_column :levelleaderboards, :total_problems, :integer
    add_column :levelleaderboards, :problems_solved, :integer
    add_column :levelleaderboards, :score, :integer
    add_column :levelleaderboards, :attempts, :integer
  end
end
