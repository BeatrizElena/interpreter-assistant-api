#!/bin/sh
# sh ./scripts/clinic/index.sh

API="http://localhost:4741"
URL_PATH="/clinics"
TOKEN="30378ad41db571429f54138de57cac80"

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}"

echo