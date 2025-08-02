
---

# Project: Gemini AI Content Generation API

## General Instructions:

* All endpoints must follow RESTful principles.
* Ensure every endpoint has proper error handling and consistent JSON responses.
* Use middleware efficiently to handle file uploads and validation.
* Follow the structure and naming conventions already established in the existing Express app.

## API Technology Stack:

* **Express.js** – HTTP server and routing
* **Multer** – File upload middleware
* **dotenv** – Environment variable loader
* All uploaded files must be stored automatically in the `uploads/` directory (Multer default config).
* Base64 handling is used for document and audio inputs.

## Environment Configuration (`.env`):

Example:

```
PORT=3000
GEMINI_API_KEY=your_api_key_here
GEMINI_MODEL="gemini-2.5-flash"
```

## Coding Style:

* Use 2 spaces for indentation.
* Follow consistent naming for routes and controllers.
* Use `async/await` with `try/catch` for all asynchronous operations.
* Group routes by functionality (e.g., `/generate-text`, `/generate-from-image`, etc.)
* Return all errors in the format:

  ```json
  { "error": "Error message here" }
  ```

## Endpoint Specifications

### `/generate-text`

* Method: `POST`
* Body: JSON

  ```json
  {
    "prompt": "Your input prompt here"
  }
  ```
* Response:

  ```json
  {
    "result": "Generated output"
  }
  ```

### `/generate-from-image`

* Method: `POST`
* Body: `multipart/form-data` with a field:

  * `image` (PNG, JPG, etc.)
* Response:

  ```json
  {
    "result": "Generated output from image"
  }
  ```

### `/generate-from-audio`

* Method: `POST`
* Body: `multipart/form-data` with a field:

  * `audio` (wav, mp3, etc.)
* Response:

  ```json
  {
    "result": "Generated output from image"
  }
  ```

### `/generate-from-audio`

* Method: `POST`
* Body: `multipart/form-data` with a field:

  ```json
  {
    "filename": "audio.wav",
    "data": "BASE64_ENCODED_STRING"
  }
  ```
* Response:

  ```json
  {
    "result": "Generated output from audio"
  }
  ```

## Regarding Dependencies:

* Do **not** introduce new dependencies unless necessary for critical functionality.
* If adding a dependency (e.g., for file parsing or audio decoding), document the reason and its impact.
* Avoid heavy frameworks or utility libraries that duplicate native Node.js or existing functionality.

## Running the Project:

```bash
npm install
node index.js
```

Ensure `.env` is properly configured before starting the server.


