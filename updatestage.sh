aws s3 sync build/ s3://bookmyslot --delete --profile default
aws cloudfront create-invalidation --distribution-id E3EEBONHWRVRVL --paths "/*"