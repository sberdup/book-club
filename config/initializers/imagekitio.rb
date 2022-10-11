ImageKitIo.configure do |config|
    if Rails.env.development?
      config.public_key = ENV['IMAGE_KIT_PUBLIC_API_KEY']
      config.private_key = ENV['IMAGE_KIT_PRIVATE_API_KEY']
      config.url_endpoint = ENV['IMAGE_KIT_ENDPOINT'] # https://ik.imagekit.io/your_imagekit_id
    end
    config.service = :active_storage
    # config.constants.MISSING_PRIVATE_KEY = 'custom error message'
  end