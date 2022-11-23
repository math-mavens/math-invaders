class AttemptsController < ApplicationController

  def new
  end

  def create
    @attempt = Attempt.new
  end
end
