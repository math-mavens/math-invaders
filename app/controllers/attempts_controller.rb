class AttemptsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  before_action :set_attempt, only: %i[show update ]

  def index
    @level = Level.find_by_id(params[:level])
    if @level
      @attempts = Attempt.where(user: current_user)
                         .and(Attempt.where.not(total_time: nil))
                         .filter_by_level(@level)
                         .order(id: :desc)
    else
      @attempts = Attempt.where(user: current_user)
                         .and(Attempt.where.not(total_time: nil))
                         .order(id: :desc)
    end
    @all_time = @attempts.map(&:total_time).compact
    @total_problems = @attempts.map(&:problems_solved).compact
    @all_scores = @attempts.map(&:score).compact
    @all_bullets = @attempts.map(&:bullets_fired).compact

    @levels = Level.all
  end

  def new
    level = Level.find_by_id(params[:level_id])
    level = Level.last if level.nil?

    attempt = Attempt.create(level: level, user: current_user)

    redirect_to "/game/index.html?a=#{attempt.id}", status: 302
  end

  def show
    @attempt = Attempt.find(params[:id])
    render json: @attempt.to_json(include: %i[user level])
  end

  def create; end

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
