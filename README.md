Task Manager API - Backend

This project features a **robust and secure REST API for a task manager**, built with **Node.js, Express.js, and MongoDB (Mongoose)**. It goes beyond basic CRUD by incorporating essential features for a production-ready application.

## Key Features

* **User Authentication & Authorization:** Secure user registration, login, and protected routes using **JSON Web Tokens (JWT)**.
* **Persistent Data Storage:** Tasks and users are stored in **MongoDB** via Mongoose.
* **User-Specific Tasks:** Each user can only manage their own tasks, ensuring data privacy.
* **Enhanced Task Management:** Tasks include fields like `description`, `dueDate`, and `priority`.
* **Data Validation:** Robust input validation using Joi for all incoming requests.
* **Environment Variables:** Secure management of sensitive configurations (`.env`).
* **Password Hashing:** User passwords are securely stored using `bcryptjs`.
* **Development Utilities:** Dedicated scripts and endpoints for easy database seeding and destruction in development.

## Technologies Used

* **Node.js**: JavaScript runtime.
* **Express.js**: Web application framework.
* **MongoDB & Mongoose**: NoSQL database and ODM.
* **bcryptjs**: For password hashing.
* **jsonwebtoken**: For JWT authentication.
* **Joi**: For data validation.
* **dotenv**: For environment variable management.

## Getting Started

Follow these steps to set up and run the API on your local machine.

### Prerequisites

* **Node.js** (LTS version recommended)
* **npm** (comes with Node.js)
* **MongoDB**: Ensure you have a MongoDB instance running locally, or a connection string from a cloud provider like MongoDB Atlas.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-github-repo-link>
    cd <your-github-repo-link>/backend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Create your `.env` file:**
    In the root of the `backend` directory, create a file named `.env` and add the following, **replacing placeholders with your actual values**:

    ```env
    MONGO_URI=mongodb://localhost:27017/advanced_taskmanager_db # Or your MongoDB Atlas URI
    JWT_SECRET=YOUR_SUPER_STRONG_AND_RANDOM_SECRET_KEY_HERE # IMPORTANT: CHANGE THIS!
    JWT_EXPIRES_IN=1h # E.g., '1h', '7d', '24h'
    PORT=5000
    NODE_ENV=development # Set to 'production' for deployment
    ```

### Running the API

1.  **Start the API server:**
    ```bash
    npm run dev
    ```
    The API will be accessible at `http://localhost:5000`. This command uses `nodemon` for automatic restarts during development. If you don't have `nodemon` installed globally, run `npm install -g nodemon` first.

2.  **Database Seeding (Optional, for development):**
    To quickly populate your database with sample users and tasks, or to clear it:
    * **Seed data:** `npm run db:seed`
    * **Destroy all data:** `npm run db:destroy`

## API Endpoints

All endpoints are prefixed with `/api`. Remember to include an `Authorization: Bearer <YOUR_JWT_TOKEN>` header for all protected routes (`/api/tasks`).

### Authentication (`/api/auth`)

* **`POST /api/auth/register`**
    * **Description:** Register a new user.
    * **Body:** `{ "username": "string", "email": "string", "password": "string" }`
    * **Response:** `201 Created` with user details and JWT.
* **`POST /api/auth/login`**
    * **Description:** Authenticate user and get a JWT.
    * **Body:** `{ "email": "string", "password": "string" }`
    * **Response:** `200 OK` with user details and JWT.

### Task Management (`/api/tasks`) - **Protected Routes**

* **`GET /api/tasks`**
    * **Description:** Get all tasks for the authenticated user.
    * **Query Params:** `?completed=true` or `?completed=false` for filtering.
    * **Response:** `200 OK` with an array of tasks.
* **`GET /api/tasks/:id`**
    * **Description:** Get a single task by ID for the authenticated user.
    * **Response:** `200 OK` with the task object. `404 Not Found` if not found or not owned.
* **`POST /api/tasks`**
    * **Description:** Create a new task for the authenticated user.
    * **Body:** `{ "title": "string", "description": "string (optional)", "dueDate": "YYYY-MM-DD (optional)", "priority": "Low|Medium|High (optional)" }`
    * **Response:** `201 Created` with the new task.
* **`PUT /api/tasks/:id`**
    * **Description:** Update a task for the authenticated user.
    * **Body:** `{ "title": "string (optional)", "description": "string (optional)", "completed": "boolean (optional)", "dueDate": "YYYY-MM-DD (optional)", "priority": "Low|Medium|High (optional)" }`
    * **Response:** `200 OK` with the updated task. `404 Not Found` if not found or not owned.
* **`DELETE /api/tasks/:id`**
    * **Description:** Delete a task for the authenticated user.
    * **Response:** `204 No Content`. `404 Not Found` if not found or not owned.

### Development Utilities (`/api/dev`) - **Development Only**

* **`POST /api/dev/seed-db`**
    * **Description:** Seeds the database with sample user and task data.
    * **Access:** Only available when `NODE_ENV=development`.
* **`POST /api/dev/destroy-db`**
    * **Description:** Deletes all data from the database. **Use with extreme caution!**
    * **Access:** Only available when `NODE_ENV=development`.

---