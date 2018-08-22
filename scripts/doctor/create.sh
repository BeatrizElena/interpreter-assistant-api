#!/bin/bash

# sh ./scripts/doctor/create.sh

# TOKEN is from the signed-in user
# OWNER is from the created clinic. Clinic is the owner of doctor.

API="http://localhost:4741"
URL_PATH="/doctors"
TOKEN="79f94741526391859db7a006dbad50be"
FIRSTNAME="Wanda"
LASTNAME="Ortiz"
TITLE="MD"
CLINIC="5b7cac710bad9e6a42fa4463"
PHONE="617-123-4567"
DISEASE="5b7cd620be39d37d759019aa"


curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "doctor": {
      "first_name": "'"${FIRSTNAME}"'",
      "last_name": "'"${LASTNAME}"'",
      "title": "'"${TITLE}"'",
      "clinic": "'"${CLINIC}"'",
      "phone": "'"${PHONE}"'",
      "disease": "'"${DISEASE}"'"
    }
  }'

echo