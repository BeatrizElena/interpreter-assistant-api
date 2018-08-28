#!/bin/sh
# sh ./scripts/disease/index.sh

API="http://localhost:4741"
URL_PATH="/diseases"
TOKEN="30378ad41db571429f54138de57cac80"

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}"

echo