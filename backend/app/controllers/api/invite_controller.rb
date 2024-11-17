class Api::InviteController < ApiController
  def index
    return if educator

    invite = current_user.group_invites.includes(:group, :user).where(status: 'pending').all

    render json: {
      results: InviteBlueprint.render_as_hash(invite)
    }
  end

  def update
    return unauthorized if educator || params[:status].nil?

    invite = current_user.group_invites.find_by(public_id: params[:id])
    return not_found unless invite

    return unauthorized unless params[:status] == 'accepted' || params[:status] == 'declined'

    ActiveRecord::Base.transaction do
      invite.group.users << current_user if params[:status] == 'accepted' && !invite.group.users.include?(current_user)

      invite.update(status: params[:status])
    end
    render json: { result: InviteBlueprint.render_as_hash(invite) }
  end
end
