class SendOtpJob < ApplicationJob
  queue_as :default

  def perform(user, otp)
    # Do something later
    # puts "Sending OTP to #{user.email}"
    return unless user
    return unless otp

    OtpMailer.send_otp(user.email, otp).deliver_now
  end
end
