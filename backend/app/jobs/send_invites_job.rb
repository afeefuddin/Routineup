class SendInvitesJob < ApplicationJob
  queue_as :default

  def perform(group)
    @invites = GroupInvite.where(group: group)
    @invites.each do |invite|
      if invite.sent_count == 0
        InviteUserJob.perform_later(invite)
      end
    end
  end
end
