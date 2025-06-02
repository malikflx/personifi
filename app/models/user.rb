class User < ApplicationRecord
  has_secure_password
  validates :email, presence: true, uniqueness: { message: "already exists in our system. Please use a different email." }
  validates :password, presence: true, length: { minimum: 8 }
end
