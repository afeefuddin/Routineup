require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Backend
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.1

    # Please, add to the `ignore` list any other `lib` subdirectories that do
    # not contain `.rb` files, or that should not be reloaded or eager loaded.
    # Common ones are `templates`, `generators`, or `middleware`, for example.
    config.autoload_lib(ignore: %w[assets tasks])
    redis_url = ENV.fetch('REDIS_URL') do
      Rails.application.credentials.redis_url.presence || 'redis://localhost:6379/1'
    end
    config.x.redis_url = redis_url
    config.cache_store = :redis_cache_store, { url: redis_url }
    config.x.gmail_username = ENV.fetch('GMAIL_USERNAME') { Rails.application.credentials.gmail_username }
    config.x.gmail_password = ENV.fetch('GMAIL_PASSWORD') { Rails.application.credentials.gmail_password }

    config.action_mailer.delivery_method = :smtp
    config.action_mailer.perform_deliveries = true
    config.action_mailer.raise_delivery_errors = true
    host = if Rails.env.production?
             ENV.fetch('APP_HOST', 'routineup-api.afeefuddin.me')
           else
             'localhost:3000'
           end

    config.action_mailer.default_url_options = { host: host, protocol: Rails.env.production? ? 'https' : 'http' }

    config.action_mailer.smtp_settings = {
      address: 'smtp.gmail.com',
      post: 587,
      user_name: config.x.gmail_username,
      password: config.x.gmail_password,
      authentication: 'plain',
      enable_starttls_auto: true
    }
    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")
  end
end
