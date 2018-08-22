#!/bin/bash
# sh ./scripts/doctor/update.sh


API="http://localhost:4741"
URL_PATH="/doctors"
ID="5b7cd718348b2c7db2f1b1bf"
TOKEN="aa181b5c33f52aebb1450a517b81e2be"
FIRSTNAME="Sonia"
CLINIC="5b7cd4c2f60b607bd249fd15"
DISEASE="5b7cd620be39d37d759019aa"
DISEASE="5b7cd620be39d37d759019aa"
DISEASE="5b7cd620be39d37d759019aa"
OWNER="5b7c75a018425e69a8b86c19"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
--header "Authorization: Bearer ${TOKEN}" \
--data '{
    "doctor": {
      "first_name": "'"${FIRSTNAME}"'",
      "last_name": "'"${LASTNAME}"'",
      "title": "'"${TITLE}"'",
      "clinic": "'"${CLINIC}"'",
      "phone": "'"${PHONE}"'",
      "disease": "'"${DISEASE}"'",
      "owner": "'"${OWNER}"'"
      }
    }'

echo
