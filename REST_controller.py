from flask import Flask, request, render_template, redirect, make_response, jsonify
from Auth_Processor import User

# This is my rest controller
# @app.route('/process_string', methods=['POST'])


def process_string():
    data = request.get_json()
    user_input = data.get('stringData')

    # If user input is empty
    if user_input is not None:
        result = 'Okay, Here is your answer'  # command_processor(user_input)
        response = make_response(jsonify({'result': result}))
        return response
    else:
        return jsonify({'error': 'Command is missing.'}), 500


if __name__ == '__main__':
    app.run(debug=True)