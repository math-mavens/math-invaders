class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_many :attempts

  validates :first_name, :last_name, length: { minimum: 2, maximum: 50 }
  validates :nickname, length: { minimum: 3, maximum: 15 }
  validates :first_name, :last_name, :email, :dob, presence: true
end
