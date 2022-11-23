class AttemptsController < ApplicationController
  skip_before_action :authenticate_user!, except: %i[show]

  def get
  end

  def new
  end

  def show
    @attempt = Attempt.find(params[:id])
    render json: @attempt.to_json(include: %i[user level])
  end

  def create
    @attempt = Attempt.new
  end
end
