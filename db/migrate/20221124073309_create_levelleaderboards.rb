class CreateLevelleaderboards < ActiveRecord::Migration[7.0]
  def change
    create_table :levelleaderboards do |t|

      t.timestamps
    end
  end
end
