#!/bin/sh
# sh ./scripts/doctor/show-by-id.sh

API="http://localhost:4741"
URL_PATH="/doctors"
ID="5b7cd718348b2c7db2f1b1bf"
TOKEN="5fc8e445fee210ba2c7fdcbcc6685a50"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}"

echo
