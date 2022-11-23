class AttemptsController < ApplicationController
  skip_before_action :authenticate_user!, except: %i[show]
  def get
  end

  def new
  end

  def show
    @attempt = Attempt.find(params[:id])
    render json: @attempt
  end

  def create
    @attempt = Attempt.new
  end
end
