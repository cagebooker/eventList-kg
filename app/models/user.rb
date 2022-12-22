class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :omniauthable, omniauth_providers: [:google_oauth2]
  has_one_attached :avatar
  validates :username, uniqueness: true
  has_many :lists, -> { order(position: :asc) }

  # def self.from_omniauth(auth)
  #   find_or_create_by(provider: auth.provider, uid: auth.uid) do |user|
  #     user.email = auth.info.email
  #     user.password = Devise.friendly_token[0, 20]
  #     user.username = 'undecided'
  #     # user.name = auth.info.name   # assuming the user model has a name
  #     # user.image = auth.info.image # assuming the user model has an image
  #   # If you are using confirmable and the provider(s) you use validate emails,
  #   # uncomment the line below to skip the confirmation emails.
  #   # user.skip_confirmation!
  #   end
  # end
  def self.from_omniauth(access_token)
    data = access_token.info
    user = User.where(email: data['email']).first
    # 下面處理是當資料庫內部沒有對應的帳號密碼時，建立給我們專案資料庫去對應每次授權的 token。
    unless user
      user = User.create(name: data['name'],
         email: data['email'],
         password: Devise.friendly_token[0,20]
      )
    end
    user
  end
end
