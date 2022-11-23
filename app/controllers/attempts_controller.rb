class AttemptsController < ApplicationController
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
