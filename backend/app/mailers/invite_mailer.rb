class InviteMailer < ApplicationMailer
  def invite(email, invited_by)
    @inviter = invited_by
    @url = 'http://localhost:3001/signup'
    mail(to: email, subject: 'Invitation to join Routineup')
  end
end
