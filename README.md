# Basic-CRUD-App-with-Authentication-Authorization-Full-
📘 Overview
In this Project, you will build a basic RESTful API using Node.js, Express.js, MongoDB, JWT, and bcrypt.
Your application should include user authentication, authorization, and CRUD operations for a chosen resource (e.g., Posts, Tasks, Products, or Notes).

The goal of this project is to help you understand how backend systems handle secure user management and data operations using Express.js and MongoDB.

🧠 Learning Objectives
By completing this project, you should be able to:

Implement authentication using bcrypt and JWT
Protect routes and manage access with middleware
Perform CRUD operations on a MongoDB collection
Document RESTful APIs using Postman
Structure and deploy an Express.js backend app
⚙️ Functional Requirements
1. User Authentication
Implement a POST /api/auth/register endpoint that:
Accepts name, email, and password
Hashes the password using bcrypt
Saves the user in MongoDB
Implement a POST /api/auth/login endpoint that:
Authenticates user credentials
Returns a JWT token on successful login
2. Authorization
Protect all CRUD routes using JWT verification middleware
Only logged-in users can access protected routes
(Optional bonus):
Implement role-based access control:
Admin can delete any record
User can modify or delete only their own records
3. CRUD Operations
Implement CRUD for one resource (choose one: posts, tasks, notes, or products):

| HTTP Method | Endpoint | Description | |--------------|-----------|-------------| | POST | /api/<resource> | Create a new item (authenticated users only) | | GET | /api/<resource> | Retrieve all items | | GET | /api/<resource>/:id | Retrieve one item by ID | | PUT | /api/<resource>/:id | Update item (only owner or admin) | | DELETE | /api/<resource>/:id | Delete item (only owner or admin) |

Each resource must include at least:

title (String)
content or description (String)
user (ObjectId, reference to User)
🗄️ Database
Use MongoDB (local or Atlas)
Use Mongoose for schema modeling and validation
Example:
{
  name: "John Doe",
  email: "john@example.com",
  password: "hashed_password",
  role: "user"
}
