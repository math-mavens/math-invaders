class UserLevel
  def initialize(level, attempts)
    @attempts = attempts
    @level = level
  end

  def level_name
    @level.name
  end

  def category_name
    @level.category.name
  end

  def level_id
    @level.id
  end

  def best_time
    return "NA" if @attempts.nil?

    @all_time = @attempts.map(&:total_time).compact
    return "NA" if @all_time.count.zero?

    "#{@all_time.min / 1000.0} secs"
  end

  def attempts_count
    @attempts.count
  end
end
