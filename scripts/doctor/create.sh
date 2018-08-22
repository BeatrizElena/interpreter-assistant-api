#!/bin/bash

# sh ./scripts/doctor/create.sh

# TOKEN is from the signed-in user
# OWNER is from the created clinic. Clinic is the owner of doctor.

API="http://localhost:4741"
URL_PATH="/doctors"
TOKEN="d1e62eb0c549de71ef5608972ada7ed2"
FIRSTNAME="Thomas"
LASTNAME="Gomez"
TITLE="MD"
CLINIC="5b7cac710bad9e6a42fa4463"
PHONE="617-123-4567"
DISEASE=""


curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "doctor": {
      "posted_by": "'"${TOKEN}"'",
      "first_name": "'"${FIRSTNAME}"'",
      "last_name": "'"${LASTNAME}"'",
      "title": "'"${TITLE}"'",
      "clinic": "'"${CLINIC}"'",
      "phone": "'"${PHONE}"'",
      "disease": "'"${DISEASE}"'"
    }
  }'

echo