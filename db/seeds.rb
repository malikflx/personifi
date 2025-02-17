# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

Post.create(
  [
    {
      content: "This is a test post",
      platform: "LinkedIn",
      post_url: "https://www.linkedin.com",
      likes_count: 10,
      comments_count: 5,
      shares_count: 2
    },
    {
      content: "This is another test post",
      platform: "Facebook",
      post_url: "https://www.facebook.com",
      likes_count: 20,
      comments_count: 10,
      shares_count: 5},
    {
      content: "This is a third test post",
      platform: "Twitter",
      post_url: "https://www.twitter.com",
      likes_count: 30,
      comments_count: 15,
      shares_count: 7
    }
  ]
)
