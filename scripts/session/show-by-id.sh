#!/bin/sh
# sh ./scripts/session/show-by-id.sh
# ID is Session ID

API="http://localhost:4741"
URL_PATH="/sessions"
ID="5b843345544e261b4c8d79fb"
TOKEN="42082df7ce95cb955694e40eb732f4a2"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}"

echo
