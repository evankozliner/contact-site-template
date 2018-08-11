import json
import boto3
import requests

def lambda_handler(event, context):
    print "REACHED"
    print event
    print 'test 2'

    ip = requests.get('http://checkip.amazonaws.com/')

    return {
        "statusCode": 200,
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": json.dumps({
            'message': 'hello world',
            'location': ip.text.replace('\n', ''),
        })
    }
