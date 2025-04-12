# Task Management API

A simple RESTful API for managing tasks.

## Base URL

All API endpoints are relative to the base URL. If running locally on port 5000, the base URL would be:


## Data Format

The API uses JSON for both request bodies and responses. Ensure your requests include the `Content-Type: application/json` header when sending data in the body.

## Authentication

Currently, there is no authentication implemented for these endpoints.

## Available Endpoints

### 1. Create a Task

*   **Method:** `POST`
*   **Path:** `/`
*   **Description:** Creates a new task.
*   **Request Body:**
    ```json
    {
        "title": "string (required)",
        "description": "string (required)",
        "status": "string (optional, one of: 'pending', 'in-progress', 'completed', defaults to 'pending')"
    }
    ```
*   **Success Response (201 Created):**
    ```json
    {
        "success": true,
        "data": {
            "_id": "60d5f9f9a1b2c3d4e5f6a7b8",
            "title": "Study Node.js",
            "description": "Finish the Express tutorial",
            "status": "pending",
            "createdAt": "2023-10-27T10:00:00.000Z",
            "__v": 0
        }
    }
    ```
*   **Error Responses:**
    *   `400 Bad Request`: If validation fails (e.g., missing required fields, invalid status).
    *   `500 Internal Server Error`: If there's a server-side issue.

### 2. Get All Tasks

*   **Method:** `GET`
*   **Path:** `/`
*   **Description:** Retrieves a list of tasks with filtering, sorting, and pagination.
*   **Query Parameters:**
    *   `page` (number, optional): Page number for pagination (default: 1).
    *   `limit` (number, optional): Number of tasks per page (default: 10).
    *   `status` (string, optional): Filter tasks by status ('pending', 'in-progress', 'completed').
    *   `search` (string, optional): Search term to match against task titles or descriptions (case-insensitive).
    *   `sortBy` (string, optional): Field to sort by (e.g., 'createdAt', 'title', 'status'). Defaults to 'createdAt'.
    *   `sortOrder` (string, optional): Sort order ('asc' or 'desc'). Defaults to 'desc' if `sortBy` is 'createdAt', otherwise 'asc'.
*   **Example Request:** `GET /api/tasks?status=pending&limit=5&page=1&sortBy=title&sortOrder=asc`
*   **Success Response (200 OK):**
    ```json
    {
        "success": true,
        "count": 5,
        "pagination": {
            "total": 25,
            "page": 1,
            "limit": 5,
            "pages": 5
        },
        "data": [
            {
                "_id": "...",
                "title": "...",
                "description": "...",
                "status": "pending",
                "createdAt": "..."
            },
            // ... other tasks
        ]
    }
    ```
*   **Error Responses:**
    *   `500 Internal Server Error`: If there's a server-side issue.

### 3. Get a Single Task by ID

*   **Method:** `GET`
*   **Path:** `/:id`
*   **Description:** Retrieves a specific task by its unique ID.
*   **URL Parameters:**
    *   `id` (string, required): The MongoDB ObjectId of the task.
*   **Example Request:** `GET /api/tasks/60d5f9f9a1b2c3d4e5f6a7b8`
*   **Success Response (200 OK):**
    ```json
    {
        "success": true,
        "data": {
            "_id": "60d5f9f9a1b2c3d4e5f6a7b8",
            "title": "Study Node.js",
            "description": "Finish the Express tutorial",
            "status": "pending",
            "createdAt": "2023-10-27T10:00:00.000Z",
            "__v": 0
        }
    }
    ```
*   **Error Responses:**
    *   `404 Not Found`: If the task ID does not exist or is not a valid ObjectId format.
    *   `500 Internal Server Error`: If there's a server-side issue.

### 4. Update a Task

*   **Method:** `PUT`
*   **Path:** `/:id`
*   **Description:** Updates an existing task. Requires `title` and `description` in the body.
*   **URL Parameters:**
    *   `id` (string, required): The MongoDB ObjectId of the task to update.
*   **Request Body:**
    ```json
    {
        "title": "string (required)",
        "description": "string (required)",
        "status": "string (optional, one of: 'pending', 'in-progress', 'completed')"
    }
    ```
*   **Example Request:** `PUT /api/tasks/60d5f9f9a1b2c3d4e5f6a7b8` with the body above.
*   **Success Response (200 OK):**
    ```json
    {
        "success": true,
        "data": {
            "_id": "60d5f9f9a1b2c3d4e5f6a7b8",
            "title": "Updated Title",
            "description": "Updated Description",
            "status": "in-progress",
            "createdAt": "2023-10-27T10:00:00.000Z",
            "__v": 0
        }
    }
    ```
*   **Error Responses:**
    *   `400 Bad Request`: If validation fails (e.g., missing required fields, invalid status).
    *   `404 Not Found`: If the task ID does not exist or is not a valid ObjectId format.
    *   `500 Internal Server Error`: If there's a server-side issue.

### 5. Update Task Status Only

*   **Method:** `PATCH`
*   **Path:** `/:id/status`
*   **Description:** Updates only the status of an existing task.
*   **URL Parameters:**
    *   `id` (string, required): The MongoDB ObjectId of the task to update.
*   **Request Body:**
    ```json
    {
        "status": "string (required, one of: 'pending', 'in-progress', 'completed')"
    }
    ```
*   **Example Request:** `PATCH /api/tasks/60d5f9f9a1b2c3d4e5f6a7b8/status` with the body above.
*   **Success Response (200 OK):**
    ```json
    {
        "success": true,
        "data": {
            "_id": "60d5f9f9a1b2c3d4e5f6a7b8",
            "title": "Existing Title",
            "description": "Existing Description",
            "status": "completed", // <-- Updated status
            "createdAt": "2023-10-27T10:00:00.000Z",
            "__v": 0
        }
    }
    ```
*   **Error Responses:**
    *   `400 Bad Request`: If validation fails (e.g., missing status or invalid value).
    *   `404 Not Found`: If the task ID does not exist or is not a valid ObjectId format.
    *   `500 Internal Server Error`: If there's a server-side issue.

### 6. Delete a Task

*   **Method:** `DELETE`
*   **Path:** `/:id`
*   **Description:** Deletes a specific task by its unique ID.
*   **URL Parameters:**
    *   `id` (string, required): The MongoDB ObjectId of the task to delete.
*   **Example Request:** `DELETE /api/tasks/60d5f9f9a1b2c3d4e5f6a7b8`
*   **Success Response (200 OK):**
    ```json
    {
        "success": true,
        "data": {}
    }
    ```
*   **Error Responses:**
    *   `404 Not Found`: If the task ID does not exist or is not a valid ObjectId format.
    *   `500 Internal Server Error`: If there's a server-side issue.

## Status Codes

The API uses standard HTTP status codes:

*   `200 OK`: Request successful.
*   `201 Created`: Resource successfully created (e.g., after POST).
*   `400 Bad Request`: Invalid request syntax or validation error.
*   `404 Not Found`: The requested resource could not be found.
*   `500 Internal Server Error`: An unexpected error occurred on the server.

