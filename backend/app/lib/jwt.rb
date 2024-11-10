class Jwt
  SECRET_KEY = Rails.application.secrets.secret_key_base.to_s
  def self.encode(payload)
    payload[:exp] = 24.hours.from_now.to_i
    JWT.encode(payload, SECRET_KEY, 'HS256')
  end

  def self.decode(token)
    decoded = JWT.decode(token, SECRET_KEY, true, { algorithm: 'HS256' })[0]
    puts decoded
    HashWithIndifferentAccess.new decoded
  end
end
