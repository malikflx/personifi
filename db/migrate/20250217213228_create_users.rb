class CreateUsers < ActiveRecord::Migration[8.0]
  def change
    unless table_exists?(:users)
      create_table :users do |t|
        t.string :email
        t.string :password_digest

        t.timestamps
      end
    end
  end
end
