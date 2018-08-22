#!/bin/bash

# sh ./scripts/auth/sign-in.sh

EMAIL='bea1@bea1.com'
PASSWORD='123'
# "token":"73339ffeb2d8d13bd4f3cf9d03a52dd5",

API="http://localhost:4741"
URL_PATH="/sign-in"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "'"${EMAIL}"'",
      "password": "'"${PASSWORD}"'"
    }
  }'

echo
