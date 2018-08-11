BUCKET_NAME="example-landing-page"

echo:
	echo $(SITE_BUCKET)

create: 
	aws cloudformation create-stack \
	  --stack-name SiteWithForm \
	  --template-body file://template.yaml \
	  --parameters ParameterKey=SiteBucketName,ParameterValue=$(BUCKET_NAME)

deploy: build-prod
	aws s3 cp _site/ s3://$(BUCKET_NAME) --recursive

empty-bucket:
	aws s3 rm s3://$(BUCKET_NAME) --recursive

destroy: empty_bucket
	aws cloudformation delete-stack --stack-name testSite3

build:
	jekyll build

build-prod:
	JEKYLL_ENV=production
	make build

serve: 
	bundle exec jekyll serve --livereload
