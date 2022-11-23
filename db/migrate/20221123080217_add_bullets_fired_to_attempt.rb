class AddBulletsFiredToAttempt < ActiveRecord::Migration[7.0]
  def change
    add_column :attempts, :bullets_fired, :integer
  end
end
