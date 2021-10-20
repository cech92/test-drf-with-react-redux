# Django Rest Framework + React


## Description
This project consists in creating some RESTful APIs using Python/Django and in designing a simple Single Page
Application using Typescript/React that interfaces to the REST services created.

The project was developed using the following setup:
1. OS: Ubuntu 20.04
2. Back-end: Python 3.8.10 + Django 3.2.8 + DRF 3.12.4
3. Front-end: React 17.0.2 + Redux 4.1.1

The following libraries were used for the development of the backend:
1. SimpleJWT for the token-based authentication;
2. Yet another Swagger generator for the automatic generation of API specification;
3. pyinstrument as a Python profiler.

Note: SQlite was used as a database so no additional drivers or libraries 
need to be installed.

Regarding the front-end I used axios to make the HTTP calls. No templates have 
been installed.

It takes me around 6 hours to make this project, of these 6 
only 2 for the back-end part. I had some challenges with the front-end because
besides the fact that I am not as experienced as for the back-end part I've 
always used it with javascript and not with typescript.

## API Description
| Methods | Urls             | Actions                              |
| :------ | :--------------- | :------------------------------------|
| POST    | /v1/login        | authentication with JWT              |
| POST    | /v1/refresh-token| refresh the token                    |
| GET     | /v1/usage-types  | retrieve all the usage types         |
| GET     | /v1/usages       | retrieve all the usages inserted     |
| POST    | /v1/usages       | create an new usage                  |
| GET     | /v1/usages/:id   | retrieve an usage by id              |
| PUT     | /v1/usages/:id   | update an usage by id                |
| DELETE  | /v1/usages/:id   | delete an usage by id                |

With `/redoc` or `/docs` is possible to view the swagger documentation.

## Installation
### Using Ubuntu/Debian environment
### Back-end
1. Create a virtual environment with `virtualenv -p python3 venv`;
2. Activate the virtual environment with `source venv/bin/activate`;
3. Install the dependencies running `pip install -r requirements.txt`;
4. Create a file `local_settings.ini` inside `backend/planetly_test/` folder and add a `SECRET KEY`;
5. Run the server with: `python manage.py runserver 0.0.0.0:8000`.

### Front-end
1. Install the dependencies running `npm install`;
2. Run the app with `npm start`.

### Using Docker
1. Install docker and docker-compose;
2. Build the containers running `docker-compose build`;
3. Run the app with `docker-compose up`.

## Testing
Run `python3 manage.py test` for execute the tests of the back-end.
