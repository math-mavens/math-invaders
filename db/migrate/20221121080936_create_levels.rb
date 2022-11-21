class CreateLevels < ActiveRecord::Migration[7.0]
  def change
    create_table :levels do |t|
      t.references :category, null: false, foreign_key: true
      t.integer :total_problems

      t.timestamps
    end
  end
end
