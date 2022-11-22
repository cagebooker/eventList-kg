json.extract! event, :id, :name, :list_id, :position, :happened, :deleted_at, :description, :created_at, :updated_at
json.url event_url(event, format: :json)
