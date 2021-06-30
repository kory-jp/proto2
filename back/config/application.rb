require_relative 'boot'

require "rails"
# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "active_storage/engine"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_mailbox/engine"
require "action_text/engine"
require "action_view/railtie"
require "action_cable/engine"
# require "sprockets/railtie"
require "rails/test_unit/railtie"

Bundler.require(*Rails.groups)

module Proto2
  class Application < Rails::Application
    config.load_defaults 6.0
    config.api_only = true
    config.time_zone = "Tokyo"
    config.i18n.load_path +=
      Dir[Rails.root.join("config", "locales", "**", "*.{rb,yml}").to_s]
    config.i18n.default_locale = :ja

    config.generators do |g|
      g.skip_routes true
      g.helper false
      g.assets false
      g.test_framework :rspec
      g.controller_specs false
      g.view_specs false
    end

    config.session_store :cookie_store, key: '_interslice_session'
    config.middleware.use ActionDispatch::Cookies
    # config.middleware.use ActionDispatch::Session::CookieStore, config.session_options
    config.middleware.use ActionDispatch::Session::CookieStore
    config.middleware.use ActionDispatch::ContentSecurityPolicy::Middleware
    config.middleware.use ActionDispatch::Flash
    # config.middleware.insert_before 0, Rack::Cors do
    #   allow do
    #     origins '*'
    #     resource '*',
    #              :headers => :any,
    #              :expose => ['access-token', 'expiry', 'token-type', 'uid', 'client'],
    #              :methods => [:get, :post, :options, :delete, :put]
    #   end
    # end
  end
end
