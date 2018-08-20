#!/bin/bash

# sh ./scripts/auth/sign-in.sh

EMAIL='user1@user.com'
PASSWORD='123'
# "token":"be0d3c76d276cb65075765b6133c0bc9",
# "_id":"5b7ad88938868c161a2c4543"

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
