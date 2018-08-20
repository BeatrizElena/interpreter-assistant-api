#!/bin/bash

# sh ./scripts/clinic/create.sh

API="http://localhost:4741"
URL_PATH="/clinics"
ABBREVIATION="JF"
NAME="Jimmy Fund/Pediatrics"
PHONE="617-123-4567"
TOKEN="5ec7d683f7d130858b5cca82fa014fb6"


curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "clinic": {
      "abbreviation": "'"${ABBREVIATION}"'",
      "name": "'"${NAME}"'",
      "phone": "'"${PHONE}"'",
      "description": "'"${DESCRIPTION}"'",
      "owner": "'"${TOKEN}"'"
    }
  }'

echo