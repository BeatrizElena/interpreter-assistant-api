#!/bin/bash

# sh ./scripts/session/create.sh

# TOKEN is from the signed-in user

API="http://localhost:4741"
URL_PATH="/sessions"
TOKEN="8a375c7b4112f23b4bac54449f6f9adb"
DOCTOR="5b7cd718348b2c7db2f1b1bf"
NOTES="This session was challenging because there were many providers and many family members present"


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