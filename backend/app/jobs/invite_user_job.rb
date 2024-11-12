class InviteUserJob < ApplicationJob
  def perform(invite)
    return unless invite

    return unless invite.sent_count == 0
    # return if invite.user.nil?
    # return if invite.invited_by.nil?
    # return if invite.user.email.nil?
    # return if invite.user.verified

    debugger

    InviteMailer.invite(invite.user.email, invite.invited_by.username).deliver_now
    invite.update(sent_count: 1)

    # Send an email to the user
  end
end
