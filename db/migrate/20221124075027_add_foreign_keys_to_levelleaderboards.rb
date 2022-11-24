class AddForeignKeysToLevelleaderboards < ActiveRecord::Migration[7.0]
  def change
    add_reference :levelleaderboards, :user, foreign_key: true
    add_reference :levelleaderboards, :level, foreign_key: true
  end
end
