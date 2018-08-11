BUILD_DIR=notifier/build
BUCKET=hellosam
STACK_NAME=Notifier

all: package deploy

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
      --parameter-overrides RecaptchaSecret=$(RECAPTCHA_SECRET) CORSUri=http://example-landing-page.s3-website-us-west-2.amazonaws.com \
      --force-upload

