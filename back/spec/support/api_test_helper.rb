module APITestHelper
  def login(user)
    current_user_session_params = {
      user: {
        email: user.email,
        password: user.password
      }
    }
    post "/api/v1/user/login", params: current_user_session_params
  end
end

RSpec.configure do |config|
  config.include APITestHelper
end