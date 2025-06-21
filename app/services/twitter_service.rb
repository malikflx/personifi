# frozen_string_literal: true

require "rest-client"
require "json"

class TwitterService
  BASE_URL = "https://api.twitter.com/2"

  def initialize(username)
    @username = username
    @token = Rails.application.credentials.dig(:twitter, :bearer_token)
  end

def get_user_id
  url = "#{BASE_URL}/users/by/username/#{@username}"
  response = get(url)

  if response["status"] == 429
    raise "Rate limit exceeded. Please try again later."
  end

  if response["data"] && response["data"]["id"]
    response["data"]["id"]
  else
    raise "Twitter user ID not found for username: #{@username}"
  end
end

  def get_tweets
    user_id = get_user_id
    url = "#{BASE_URL}/users/#{user_id}/tweets?max_results=5&tweet.fields=created_at,public_metrics"
    response = get(url)

    response["data"] || []
  end

  private

  def get(url)
    response = RestClient.get(url, headers)
    JSON.parse(response.body)
  rescue RestClient::ExceptionWithResponse => e
    Rails.logger.error("Twitter API request failed: #{e.response}")
    begin
      JSON.parse(e.response.body)
    rescue
      {}
    end
  rescue => e
    Rails.logger.error("Unexpected Twitter API error: #{e.message}")
    {}
  end

  def headers
    { Authorization: "Bearer #{@token}" }
  end
end
