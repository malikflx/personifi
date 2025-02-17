class CreatePosts < ActiveRecord::Migration[8.0]
  def change
    create_table :posts do |t|
      t.text :content
      t.string :platform
      t.string :post_url
      t.integer :likes_count
      t.integer :comments_count
      t.integer :shares_count

      t.timestamps
    end
  end
end
