from flask import Flask, request, render_template, redirect, make_response, jsonify
from Auth_Processor import User

import REST_controller

app = Flask(__name__)


@app.route('/')
def login_page():
    return render_template('login.html')


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    # Create an object() and pass it to class User
    username = data.get('username')
    user1 = User(username)
    data = user1.auth_processor()
    return data


@app.route('/chat', methods=['GET'])
def chat():
    return render_template('chat.html')


@app.route('/check_cookies', methods=['GET'])
def check_cookies():

    # Taking data stored in the cookies
    jwt_token = request.cookies.get('jwtToken')
    username = request.cookies.get('username')
    # session_id = request.cookies.get('session_id')

    # Validation of the tokens. If they are correct
    if jwt_token != "" and username != "":
        user1 = User(username)
        data = user1.auth_processor_check(jwt_token, username)
        return data

    # Have to stop the chat and redirect the user to login page.
    else:
        render_template('login.html')
        return jsonify({'jwtToken': jwt_token, 'username': username})


# This is my rest controller
@app.route('/process_string', methods=['POST'])
def process_string():
    REST_controller.process_string()
    
    # data = request.get_json()
    # user_input = data.get('stringData')

    # # If user input is empty
    # if user_input is not None:
    #     result = 'Okay, Here is your answer'  # command_processor(user_input)
    #     response = make_response(jsonify({'result': result}))
    #     return response
    # else:
    #     return jsonify({'error': 'Command is missing.'}), 500


if __name__ == '__main__':
    app.run(debug=True)
