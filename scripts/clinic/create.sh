#!/bin/bash

# sh ./scripts/clinic/create.sh

API="http://localhost:4741"
URL_PATH="/clinics"
ABBREVIATION="BOC"
NAME="Breast Oncology"
PHONE="617-123-4567"
TOKEN="79f94741526391859db7a006dbad50be"


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