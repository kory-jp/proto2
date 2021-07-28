table_names = %w(users posts comments tags post_tag_relations favorites relationships rooms)

table_names.each do |table_name|
  path = Rails.root.join("db", "seeds", Rails.env, "#{table_name}.rb")
  if File.exist?(path)
    puts "Createing #{table_name}...."
    require(path)
  end
end