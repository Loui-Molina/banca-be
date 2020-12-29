API BANCA BE

GET api/examples --get all

GET api/examples/:id --get by id

GET api/examples?title=[kw] --get filtered

POST api/examples --create or update

DELETE api/examples/:id --delete



CADA ENDPOINT TIENE
* controller
* service
* dtos


Configuracion del .env para que funcione la app :

# App Configuration

APP_SWAGGER_SETUP=api
APP_GLOBAL_PREFIX=api
APP_TITLE=Betting
APP_DESCRIPTION=Betting for Republic
APP_VERSION=1
APP_TAG=Bet

#Token

TOKEN_SECRET_KEY=topSecret51
TOKEN_EXPIRES=300s

# Database connections

userDB=mongodb://localhost:27017/users
bancaDB=mongodb://localhost:27017/banca