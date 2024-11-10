class Api::GroupController < ApiController
  def index
    groups = Group.where(admin: current_user).all
    render json: {
      results: GroupBlueprint.render_as_hash(groups)
    }
  end

  def create
    return unless group_params[:emails]

    @non_verified_emails = []

    ActiveRecord::Base.transaction do
      @group = Group.new(group_name: group_params[:group_name], admin: current_user)
      email_list = group_params[:emails].split(',').map(&:strip).uniq

      existing_users = User.where(email: email_list).where.not(email: current_user.email)
      existing_emails = existing_users.pluck(:email)
      new_emails = email_list - existing_emails

      @non_verified_emails = existing_users.where(verified: false).pluck(:email) + new_emails
      @new_users = User.insert_all!(
        new_emails.map do |email|
          { email: email }
        end
      )

      GroupInvite.insert_all!(
        (@new_users + existing_users).map do |user|
          { group: @group, user: user, invited_by: current_user }
        end
      )

      @group.save!
    end
    InviteService.new(@non_verified_emails, current_user).send_mails
    render json: {
      result: GroupBlueprint.render_as_hash(@group)
    }
  end

  private

  def group_params
    params.permit(:group_name, :emails)
  end
end
