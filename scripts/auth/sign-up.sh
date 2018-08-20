#!/bin/bash
# sh ./scripts/auth/sign-up.sh

EMAIL='user1@user.com'
PASSWORD='123'
# id: '5b7ad88938868c161a2c4543'

API="http://localhost:4741"
URL_PATH="/sign-up"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "'"${EMAIL}"'",
      "password": "'"${PASSWORD}"'",
      "password_confirmation": "'"${PASSWORD}"'"
    }
  }'

echo
