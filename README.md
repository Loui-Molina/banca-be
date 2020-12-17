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

# Database connections

userDB=mongodb://localhost:27017/users
bancaDB=mongodb://localhost:27017/banca