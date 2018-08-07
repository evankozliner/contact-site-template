aws cloudformation deploy \
  --template-file serverless-output.yaml \
  --stack-name Notifier \
  --capabilities CAPABILITY_IAM \
  --parameter-overrides RecaptchaSecret=6LfaXGIUAAAAAJVeB5-HEaeMz_hiJqT01MbRj5Gi CORSUri=http://example-landing-page.s3-website-us-west-2.amazonaws.com \
  --force-upload


