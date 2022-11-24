class LevelleaderboardsController < ApplicationController
  def index
    @users = User.all
  end
end
