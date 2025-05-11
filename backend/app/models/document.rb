class Document < ApplicationRecord
  belongs_to :investor
  validates :file_name, :file_path, presence: true
end
