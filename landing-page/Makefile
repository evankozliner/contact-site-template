# This bucket name must be the same as the name for your website!
BUCKET_NAME="your-bucket-name-here"
STACK_NAME="your-stack-name-here"

all:
	make create
	echo Sleeping so our bucket exists to upload to...
	sleep 10
	make deploy

create: 
	aws cloudformation create-stack \
	  --stack-name $(STACK_NAME) \
	  --template-body file://template.yaml \
	  --parameters ParameterKey=SiteBucketName,ParameterValue=$(BUCKET_NAME)

deploy: build-prod
	aws s3 cp _site/ s3://$(BUCKET_NAME) --recursive

empty-bucket:
	aws s3 rm s3://$(BUCKET_NAME) --recursive

destroy: empty-bucket
	aws cloudformation delete-stack --stack-name $(STACK_NAME)

build:
	jekyll build

build-prod:
	JEKYLL_ENV=production jekyll build

serve: 
	jekyll build
	jekyll serve --livereload
