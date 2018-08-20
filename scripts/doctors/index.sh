#!/bin/sh

# sh ./scripts/doctors/index.sh

TOKEN="be0d3c76d276cb65075765b6133c0bc9"

API="http://localhost:4741"
URL_PATH="/doctors"

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}"

echo