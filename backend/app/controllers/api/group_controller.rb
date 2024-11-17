class Api::GroupController < ApiController
  def index
    debugger
    groups = if educator
               Group.where(admin: current_user).all
             else
               current_user.groups
             end
    render json: {
      results: GroupBlueprint.render_as_hash(groups)
    }
  end

  def create
    return unless educator
    return unless group_params[:emails]

    @non_verified_emails = []
    ActiveRecord::Base.transaction do
      @group = Group.new(group_name: group_params[:group_name], admin: current_user)
      @group.save!
      email_list = group_params[:emails].map(&:strip).uniq
      existing_users = User.where(email: email_list).where.not(email: current_user.email)
      existing_emails = existing_users.pluck(:email)
      new_emails = email_list - existing_emails
      @non_verified_emails = existing_users.where(verified: false).pluck(:email) + new_emails

      if new_emails.any?
        User.insert_all!(
          new_emails.map do |email|
            { email: email }
          end
        )
      end

      all_users = User.where(email: email_list).where.not(email: current_user.email)

      GroupInvite.insert_all!(
        all_users.map do |user|
          {
            group_id: @group.id,
            user_id: user.id,
            invited_by_id: current_user.id
          }
        end
      )
    end
    SendInvitesJob.perform_later(@group)
    render json: {
      result: GroupBlueprint.render_as_hash(@group)
    }
  end

  private

  def group_params
    params.permit(:group_name, emails: [])
  end
end
