class InviteUserJob < ApplicationJob
  def perform(email, invited_by)
    return unless email && invited_by

    InviteMailer.invite(email, invited_by).deliver_now
    # Send an email to the user
  end
end
