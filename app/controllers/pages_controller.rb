class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :home ]

  def home
  end

  def dashboard
    @levels = Level.all
    @attempts = Attempt.where(user: current_user)
    @all_time = @attempts.map(&:total_time).compact
    @total_problems = @attempts.map(&:problems_solved).compact
  end
end
