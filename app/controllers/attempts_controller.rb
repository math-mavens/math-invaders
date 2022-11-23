class AttemptsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  before_action :set_attempt, only: %i[show edit update destroy]

  def new
  end

  def show
    @attempt = Attempt.find(params[:id])
    render json: @attempt.to_json(include: %i[user level])
  end

  def create
    @attempt = Attempt.new
  end

  def update
    @attempt.update(attempt_params)
    render json: @attempt.to_json(include: %i[user level])
  end

  private

  def set_attempt
    @attempt = Attempt.find(params[:id])
  end

  def attempt_params
    params.require(:attempt).permit(:total_time, :score, :problems_solved, :bullets_fired)
  end
end
