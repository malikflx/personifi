class CreateTweets < ActiveRecord::Migration[8.0]
  def change
    create_table :tweets do |t|
      t.string :tweet_id
      t.text :text
      t.datetime :posted_at
      t.integer :likes
      t.integer :retweet
      t.integer :replies

      t.timestamps
    end
  end
end
