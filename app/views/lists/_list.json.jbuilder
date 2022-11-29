json.extract! list, :id, :name, :user_id, :position, :created_at, :events
json.url list_url(list, format: :json)
