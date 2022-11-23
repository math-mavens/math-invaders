# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
if Category.all.count.zero?
  puts "Creating the first 4 categories - Addition, Subtraction, Multiplication and Division..."
  Category.create!(name: 'Addition')
  Category.create!(name: 'Subtraction')
  Category.create!(name: 'Multiplication')
  Category.create!(name: 'Division')
  puts "Created..."
end

puts "Starting to create Levels..."
Attempt.destroy_all
Level.destroy_all
puts "Destroyed existing Attempts and Levels..."

Level.create(category: Category.first, name: "level1", total_problems: 3)
Level.create(category: Category.second, name: "level2", total_problems: 3)
Level.create(category: Category.third, name: "level3", total_problems: 3)
Level.create(category: Category.first, name: "level4", total_problems: 3)
Level.create(category: Category.fourth, name: "level5", total_problems: 3)

puts "Created first 5 levels..."
