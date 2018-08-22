#!/bin/bash
# sh ./scripts/session/update.sh


API="http://localhost:4741"
URL_PATH="/sessions"
ID="5b7d314a37c92b10cc0ea7b5"
TOKEN="aa181b5c33f52aebb1450a517b81e2be"
DOCTOR="5b7cd718348b2c7db2f1b1bf"
NOTES="Keywords to remember: gallbladder = vesícula biliar"


curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
--header "Authorization: Bearer ${TOKEN}" \
--data '{
    "session": {
      "doctor": "'"${DOCTOR}"'",
      "notes": "'"${NOTES}"'"
    }
  }'

echo
