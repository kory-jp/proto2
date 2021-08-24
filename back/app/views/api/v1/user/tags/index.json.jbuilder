json.tags do
  json.array! @tags do |tag| 
    json.id(tag.id)
    json.value(tag.value)
    json.label(tag.label)
  end
end