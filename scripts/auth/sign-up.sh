#!/bin/bash
# sh ./scripts/auth/sign-up.sh

FIRSTNAME='user4'
LASTNAME='user'
PHONE='401-123-4567'
EMAIL='user4@user.com'
PASSWORD='123'

API="http://localhost:4741"
URL_PATH="/sign-up"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "first_name": "'"${FIRSTNAME}"'",
      "last_name": "'"${LASTNAME}"'",
      "email": "'"${EMAIL}"'",
      "phone": "'"${PHONE}"'",
      "password": "'"${PASSWORD}"'",
      "password_confirmation": "'"${PASSWORD}"'"
    }
  }'

echo
