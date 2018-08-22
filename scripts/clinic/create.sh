#!/bin/bash

# sh ./scripts/clinic/create.sh

API="http://localhost:4741"
URL_PATH="/clinics"
ABBREVIATION="NEO"
NAME="Neuro Oncology"
DESCRIPTION=" brain tumors, spinal cord tumors, and neurologic complications from cancer. Subspecialists include neurosurgeons, radiation oncologists and medical oncologists. Through our multidisciplinary clinic, patients have the benefit of meeting with our team of surgical, medical, and radiation oncologists. Treat both common and rare brain tumors, including glioma, glioblastoma, oligodendroglioma, astrocytoma, meningioma, lymphoma, brain metastases, and medulloblastoma."
PHONE="617-123-4567"
TOKEN="79f94741526391859db7a006dbad50be"


curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "clinic": {
      "abbreviation": "'"${ABBREVIATION}"'",
      "name": "'"${NAME}"'",
      "phone": "'"${PHONE}"'",
      "description": "'"${DESCRIPTION}"'",
      "owner": "'"${TOKEN}"'"
    }
  }'

echo