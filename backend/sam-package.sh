
# TODO clean this up

rm -rf notifier/buid

mkdir notifier/build

cp notifier/*.py notifier/build

pip install -r requirements.txt -t notifier/build/

sam package \
   --template-file template.yaml \
   --output-template-file serverless-output.yaml \
   --s3-bucket hellosam 
