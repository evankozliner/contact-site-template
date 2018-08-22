BUILD_DIR=notifier/build
BUCKET=hellosam
STACK_NAME=Notifier

download-reqs:
	pip install -r requirements.txt -t notifier/build/

deploy-api:
	aws apigateway create-deployment --rest-api-id a29fi61158 --region us-west-2 --stage-name Prod

start-api:
	RecaptchaSecret=$(RECAPTCHA_SECRET) sam local start-api

livereload:
	# http://www.entrproject.org/
	ls notifier/*.py | entr -s 'make update'

update:
	rm $(BUILD_DIR)/*.py
	cp notifier/*.py $(BUILD_DIR)

package:
	rm -rf $(BUILD_DIR)
	mkdir $(BUILD_DIR)
	cp notifier/*.py $(BUILD_DIR)
	pip install -r requirements.txt -t $(BUILD_DIR)
	sam package \
	   --template-file template.yaml \
	   --output-template-file serverless-output.yaml \
	   --s3-bucket $(BUCKET)
	
deploy:
	aws cloudformation deploy \
      --template-file serverless-output.yaml \
      --stack-name $(STACK_NAME)\
      --capabilities CAPABILITY_IAM \
      --parameter-overrides \
			Stage=prod \
			RecaptchaSecret=$(RECAPTCHA_SECRET) \
			CORSUri=http://example-landing-page.s3-website-us-west-2.amazonaws.com \
      --force-upload

release: package deploy

test:
	curl -X POST localhost:3000 -d @sample.json \
--header "Content-Type: application/json"
