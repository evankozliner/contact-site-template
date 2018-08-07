aws cloudformation create-stack \
  --stack-name SiteWithForm \
  --template-body file://template.yaml \
  --parameters ParameterKey=SiteBucketName,ParameterValue=example-landing-page
