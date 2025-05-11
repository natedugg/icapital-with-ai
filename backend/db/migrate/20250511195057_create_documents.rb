class CreateDocuments < ActiveRecord::Migration[8.0]
  def change
    create_table :documents do |t|
      t.references :investor, null: false, foreign_key: true
      t.string :file_name, null: false
      t.string :file_path, null: false
      t.timestamps
    end
  end
end
