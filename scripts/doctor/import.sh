# sh scripts/doctor/import.sh
mongoimport --db=heroku_7f9l1c7n --collection=doctors --type=csv --headerline --file=data/doctors.csv