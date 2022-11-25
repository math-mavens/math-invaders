class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :home ]

  def home
  end

  def dashboard
    @levels = Level.all
    @user_levels = []

    @levels.each do |level|
      @level_attempts = Attempt.where(user: current_user, level: level)
      @user_level = UserLevel.new(level, @level_attempts)
      @user_levels << @user_level
    end

    @attempts = Attempt.where(user: current_user)
    @all_time = @attempts.map(&:total_time).compact
    @total_problems = @attempts.map(&:problems_solved).compact
  end
end
