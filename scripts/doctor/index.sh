#!/bin/sh

# sh ./scripts/doctor/index.sh

TOKEN="5fc8e445fee210ba2c7fdcbcc6685a50"

API="http://localhost:4741"
URL_PATH="/doctors"

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}"

echo