import json
import os
import boto3
import requests
from emailer import conversion_email
import ast

VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify"

RECAPTCHA_FAILED_RES = {
        "statusCode": 400,
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": json.dumps({
            'message': 'Invalid Captcha.'
        })}

BAD_REQ_RES = {
        "statusCode": 400,
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": json.dumps({
            'message': 'Invalid Request.'
        })}

SUCCESS_RES = {
        "statusCode": 200,
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": json.dumps({
            'message': 'hello world'
        })}

def lambda_handler(event, context):
    conversion_email(ast.literal_eval(event['body']))

    if is_prod() and not request_validation_success(event):
        return BAD_REQ_RES

    if is_prod() and not recaptcha_success(event):
        return RECAPTCHA_FAILED_RES

    return SUCCESS_RES

def request_validation_success(event):
    if not event or not event['body']:
        return False

    return True

def is_prod():
    return os.environ['Stage'] == 'prod'

def recaptcha_success(event):
    form_data = json.loads(event['body'])

    if not 'g-recaptcha-response' in form_data:
        return False

    recaptcha_response = form_data['g-recaptcha-response']

    recaptcha_secret = os.environ['RecaptchaSecret']
    google_response = requests.post(VERIFY_URL, data={
        'secret': recaptcha_secret,
        'response': recaptcha_response})

    print "Google Recaptcha response: " + str(google_response.content)

    return json.loads(google_response.content)['success']== True

