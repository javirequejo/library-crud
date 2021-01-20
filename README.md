# Library CRUD 
Library CRUD app using Node.js, Express and MySQL to create an API with titles, authors and formats.

## Installation
1. Clone the project
2. Install the dependencies using the command:
        npm install
3. Create the database and dump the schema using the next command (you will have to introduce your mysql password twice):
        npm run update-db
4. Run the project in development mode using the next command:
        npm run nodemon
> You can create the database manually in your mysql with a name 'library_crud' and dumping the schema.sql file into the db folder

## Docs
You can check the **API documentation in Postman** where you have all the available endpoints:
https://documenter.getpostman.com/view/6461272/TVzYgudK

For the rest of project, you can follow the next flow for each entity (title, author or format) from the API to the database interaction:
**Route -> Controller -> Service -> Repository**