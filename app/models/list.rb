class List < ApplicationRecord
  acts_as_list scope: :user
  belongs_to :user

  has_many :events, -> { order(position: :desc) }, dependent: :destroy
  validates :name, presence: true
end
