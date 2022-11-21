class CreateAttempts < ActiveRecord::Migration[7.0]
  def change
    create_table :attempts do |t|
      t.references :user, null: false, foreign_key: true
      t.references :level, null: false, foreign_key: true
      t.integer :total_time
      t.integer :problems_solved
      t.decimal :score

      t.timestamps
    end
  end
end
