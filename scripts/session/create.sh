#!/bin/bash

# sh ./scripts/session/create.sh

# TOKEN is from the signed-in user

API="http://localhost:4741"
URL_PATH="/sessions"
TOKEN="9aff33303c5d819e3c3be2c10bf6113d"
DOCTOR="5b7cd718348b2c7db2f1b1bf"
NOTES="More sesson notes. Created with curl script"


curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "session": {
      "doctor": "'"${DOCTOR}"'",
      "notes": "'"${NOTES}"'"
    }
  }'

echo