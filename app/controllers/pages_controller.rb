class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :home ]

  def home
    @users = User.all
  end

  def dashboard
    @levels = Level.all
    @user_levels = []

    @levels.each do |level|
      @level_attempts = Attempt.where(user: current_user, level: level).and(Attempt.where.not(total_time: nil))
      @user_level = UserLevel.new(level, @level_attempts)
      @user_levels << @user_level
    end

    # @attempts = Attempt.where(user: current_user).and(Attempt.where.not(total_time: nil)).order(id: :desc)
    # @all_time = @attempts.map(&:total_time).compact
    # @total_problems = @attempts.map(&:problems_solved).compact
  end
end
