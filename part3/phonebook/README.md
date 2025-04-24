# 📞 Phonebook API

This is a simple RESTful API for managing a phonebook. It allows you to create, read, update, and delete contact entries. Built with Express.js and MongoDB.

---

## 🌐 Base URL

```
http://13.233.86.68:3000/
```

---

## 📋 API Endpoints

### 🔍 Get all persons

- **Method:** `GET`
- **Endpoint:** `/api/persons`
- **Full URL:** [http://13.233.86.68:3000/api/persons]
- **Description:** Retrieves all contacts from the phonebook.

---

### 🔎 Get a person by ID

- **Method:** `GET`
- **Endpoint:** `/api/persons/:id`
- **Full URL:** `http://13.233.86.68:3000/api/persons/<id>`
- **Description:** Fetch a specific contact using its unique ID.

---

### ➕ Add a new person

- **Method:** `POST`
- **Endpoint:** `/api/persons`
- **Full URL:** [http://13.233.86.68:3000/api/persons](http://13.201.42.163:3000/api/persons)
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "number": "123-4567890"
  }
  ```
- **Description:** Adds a new contact to the phonebook.

---

### 🔄 Update an existing person (by name)

- **Method:** `PUT`
- **Endpoint:** `/api/persons`
- **Full URL:** [http://13.233.86.68:3000//api/persons](http://13.201.42.163:3000/api/persons)
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "number": "098-7654321"
  }
  ```
- **Description:** Updates the phone number of an existing contact by name.

---

### ❌ Delete a person by ID

- **Method:** `DELETE`
- **Endpoint:** `/api/persons/:id`
- **Full URL:** `http://13.233.86.68:3000/api/persons/<id>`
- **Description:** Deletes the contact with the specified ID.

---

### ℹ️ Phonebook Info

- **Method:** `GET`
- **Endpoint:** `/info`
- **Full URL:** [http://13.233.86.68:3000/info](http://13.201.42.163:3000/info)
- **Description:** Returns the total number of entries and the current server time.


## 🧱 Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- Morgan (logging)
- CORS
- dotenv

---

## 🛠️ Author

Waqas — 
