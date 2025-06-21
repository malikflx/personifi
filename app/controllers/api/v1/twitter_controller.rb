class Api::V1::TwitterController < ApplicationController
  def recent
    service = TwitterService.new("_malikfelix")
    tweets = service.get_tweets
    render json: tweets
  end
end
