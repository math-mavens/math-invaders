class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :home ]

  def home
    @users = User.all
  end

  def dashboard
    @levels = Level.all
    @attempts = Attempt.where(user: current_user)
  end
end
