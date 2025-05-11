class CreateInvestors < ActiveRecord::Migration[8.0]
  def change
    create_table :investors do |t|
      t.string :first_name, null: false
      t.string :last_name,  null: false
      t.date   :date_of_birth, null: false
      t.string :phone_number,  null: false
      t.string :street_address, null: false
      t.string :state,         null: false
      t.string :zip_code,      null: false
      t.timestamps
    end
  end
end
