#!/bin/sh
# sh ./scripts/session/show-by-id.sh

API="http://localhost:4741"
URL_PATH="/sessions"
ID=""
TOKEN="5fc8e445fee210ba2c7fdcbcc6685a50"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}"

echo
