class OtpService
  def initialize(public_id)
    @user = User.find_by(public_id: public_id)
  end

  def verify(otp)
    puts "Cache: #{Rails.cache.read(@user.public_id)} \n"
    return true if Rails.cache.read(@user.public_id) == otp.to_i

    false
  end

  def generate
    otp = rand(100_000..999_999)
    return unless Rails.cache.write(@user.public_id, otp, expires_in: 10.minutes)

    SendOtpJob.perform_later(@user, otp)
  end
end
