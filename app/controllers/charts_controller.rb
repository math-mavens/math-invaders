class ChartsController < ApplicationController
  def completed_tasks
    render json: Attempt.group(:score).group_by_day(:created_at).count.chart_json
  end
end
