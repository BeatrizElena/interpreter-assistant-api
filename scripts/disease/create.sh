#!/bin/bash

# sh ./scripts/disease/create.sh

# TOKEN is from the signed-in user


API="http://localhost:4741"
URL_PATH="/diseases"
TOKEN="d1e62eb0c549de71ef5608972ada7ed2"
NAME_ENGLISH="Uterine Cancer"
NAME_TRANSLATED="Cáncer de útero"
DESCRIPTION_ENGLISH="There are different types of uterine cancer. The most common type starts in the endometrium, the lining of the uterus. This type is also called endometrial cancer."
DESCRIPTION_TRANSLATED="Existen diferentes tipos de cáncer de útero. El más común comienza en el endometrio, la membrana que recubre el útero. A este cáncer también se le llama cáncer de endometrio."


curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "disease": {
      "posted_by": "'"${TOKEN}"'",
      "name_english": "'"${NAME_ENGLISH}"'",
      "name_translated": "'"${NAME_TRANSLATED}"'",
      "description_english": "'"${DESCRIPTION_ENGLISH}"'",
      "description_translated": "'"${DESCRIPTION_TRANSLATED}"'"
    }
  }'

echo