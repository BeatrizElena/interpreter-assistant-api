#!/bin/bash

# sh ./scripts/auth/change-password.sh

TOKEN="be0d3c76d276cb65075765b6133c0bc9"
OLDPW='123'
NEWPW='123'

API="http://localhost:4741"
URL_PATH="/change-password"

curl "${API}${URL_PATH}/" \
  --include \
  --request PATCH \
  --header "Authorization: Token token=${TOKEN}" \
  --header "Content-Type: application/json" \
  --data '{
    "passwords": {
      "old": "'"${OLDPW}"'",
      "new": "'"${NEWPW}"'"
    }
  }'

echo
