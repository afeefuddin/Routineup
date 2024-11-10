Oj.default_options = {
  mode: :custom,
  bigdecimal_as_decimal: true,
  time_format: :ruby
}

Blueprinter.configure do |config|
  config.generator = Oj # default is JSON
  config.method = :dump
end
