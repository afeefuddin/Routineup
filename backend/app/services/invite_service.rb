class InviteService
  def initialize(emails, invited_by)
    @emails = emails
    @invited_by = invited_by
  end

  def send_mails
    @emails.each do |email|
      # InviteMailer.invite(email).deliver_later
      InviteUserJob.invite(email, @invited_by).deliver_later
    end
  end
end
