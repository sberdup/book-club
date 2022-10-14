ImageKitIo.configure do |config|
    if Rails.env.development?
      config.public_key = ENV['IMAGE_KIT_PUBLIC_API_KEY']
      config.private_key = ENV['IMAGE_KIT_PRIVATE_API_KEY']
      config.url_endpoint = ENV['IMAGE_KIT_ENDPOINT'] # https://ik.imagekit.io/your_imagekit_id
    end
    if Rails.env.production?
      config.public_key = process.env.IMAGE_KIT_PUBLIC_API_KEY
      config.private_key = process.env.IMAGE_KIT_PRIVATE_API_KEY
      config.url_endpoint = process.env.IMAGE_KIT_ENDPOINT
    end
    config.service = :carrierwave
    # config.constants.MISSING_PRIVATE_KEY = 'custom error message'
  end