curl.exe --output open-api.json --url http://localhost:3000/api-json
openapi-generator-cli generate -g typescript-angular -i ./open-api.json -o ../banca-fe/local-packages/banca-api  --additional-properties npmName=banca-api && del open-api.json
