class OtpMailer < ApplicationMailer
  def send_otp(email, otp)
    @otp = otp
    mail(to: email, subject: 'OTP from Routineup')
  end
end
