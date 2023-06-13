from flask import make_response, jsonify
import requests


class User:
    def __init__(self, username):
        self.username = username

    def auth_processor(self):
        # Generate JWT token for the user
        jwt_token = self.create_jwt_token()

        if jwt_token != "":
            response = make_response(jsonify({'message': 'Login successful.', 'username': self.username, 'jwtToken': jwt_token}))
            response.set_cookie('jwtToken', jwt_token)
            response.set_cookie('username', self.username)
            # data = response.get_data(as_text=True)
            # print(data)
            return response
        else:
            message = 'You have not registered on the site.\n Please Sign Up first.'
            return jsonify({'message': message}), 500

    def create_jwt_token(self):
        apiUrl = f"https://test-apps.blumesolutions.com/jwt/create/{self.username}"

        headers = {
            'Content-Type': 'application/json'
        }

        try:
            response = requests.get(apiUrl, headers=headers)
            if response.status_code == 200:
                result = response.json()
                jwt_token = result['token']
                return jwt_token
            else:
                print("Error:", response.status_code)
                return None
        except requests.exceptions.RequestException as e:
            print("Error:", e)
            return None

    def auth_processor_check(self, jwt_token, username):
        # Generate real JWT token for the user
        real_jwt_token = self.create_jwt_token()

        if jwt_token is not None and real_jwt_token is not None:
            if jwt_token == real_jwt_token:
                return jsonify({'valid': True})
            else:
                return jsonify({'valid': False}), 401
        else:
            # Cookies or tokens are invalid
            return jsonify({'valid': False}), 401

