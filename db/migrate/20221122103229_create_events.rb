class CreateEvents < ActiveRecord::Migration[6.0]
  def change
    create_table :events do |t|
      t.string :name
      t.belongs_to :list, null: false, foreign_key: true
      t.integer :position
      t.datetime :happened
      t.datetime :deleted_at
      t.text :description

      t.timestamps
    end
    add_index :events, :deleted_at
  end
end
