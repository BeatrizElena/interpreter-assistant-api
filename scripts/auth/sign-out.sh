#!/bin/bash

# sh ./scripts/auth/sign-out.sh

TOKEN="be0d3c76d276cb65075765b6133c0bc9"

API="http://localhost:4741"
URL_PATH="/sign-out"

curl "${API}${URL_PATH}/" \
  --include \
  --request DELETE \
  --header "Authorization: Token token=${TOKEN}"

echo
