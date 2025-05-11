class Investor < ApplicationRecord
  has_many :documents, dependent: :destroy
  validates :first_name, :last_name, :date_of_birth,
            :phone_number, :street_address,
            :state, :zip_code, presence: true
end

