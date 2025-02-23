# AgriCore ERP - Agriculture Equipment Supplier

AgriCore ERP is a robust and scalable Enterprise Resource Planning (ERP) system tailored for Agriculture Equipment Suppliers. This solution streamlines operations, improves inventory management, and enhances customer relationships, enabling businesses to operate efficiently and effectively.

## Installation
Clone the repository and cd into the project directory  
Run `npm install` or `yarn install` to install all project dependencies  
Create .env file and add your database details - Check `.env.example` file  
Run `npm run develop` or `yarn develop` to start local server which will run on localhost:1337  

## Usage
### API Endpoints

### Auth
Operations that authenticates and authorizes of users 
- POST `/api/auth/login` to login into your account with access token and create your session 
- POST `/api/auth/forgot-password` to request link to change password
- PUT `/api/auth/reset-password` to update account password 
- GET `/api/auth/logout` to logout of your account and destroy your session
- GET `/api/auth/refresh-token` to refresh an expired token if session is still active 

### Employees
Operations on employees
- POST `/api/employees` to create an employee's account
- GET `/api/employees` to get all employees
- GET `/api/employees/:id` to get an employee's data by id
- PUT `/api/employees/:id` to update an employee's data by id
- DELETE `/api/employees/:id` to delete employee's data by id

### Jobs
Operations on jobs
- POST `/api/jobs` to create a job record
- GET `/api/jobs` to get all job records
- GET `/api/jobs/:id` to get a job record by id
- PUT `/api/jobs/:id` to update a job record by id
- DELETE `/api/jobs/:id` to delete job record by id

### Clients
Operations on clients
- POST `/api/clients` to create a client's account
- GET `/api/clients` to get all clients
- GET `/api/clients/:id` to get a client's data by id
- PUT `/api/clients/:id` to update a client's data by id
- DELETE `/api/clients/:id` to delete client's data by id

### Finance
Operations on finance
- POST `/api/finance` to create a finance record
- GET `/api/finance` to get all finance records
- GET `/api/finance/:id` to get a finance record by id
- PUT `/api/finance/:id` to update a finance record by id
- DELETE `/api/finance/:id` to delete finance record by id

## Built With
Node/Express - The web framework used  
MongoDB - DataBase Management System    

## Contributing: 
To contribute, raise an issue and it will be reviewed

## Author
[Amarachi Goodness](https://amarachigoodness74.vercel.app)

## License
This project is licensed under the MIT License - see the [MIT License](https://opensource.org/licenses/MIT) file for details
