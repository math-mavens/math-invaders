class AddNameToLevel < ActiveRecord::Migration[7.0]
  def change
    add_column :levels, :name, :string
  end
end
