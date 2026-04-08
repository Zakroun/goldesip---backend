# 🟡 GOLDENSIP — Backend API

A Node.js/Express REST API backend for the GOLDENSIP application, featuring contact form handling, email notifications, and database integration. Deployed on **Vercel**.

---

## 📁 Project Structure

```
backend/
├── api/
│   ├── contact.js        # Contact form submission endpoint
│   ├── home.js           # Home / health check endpoint
│   ├── index.js          # API entry point & route registration
│   └── testDB.js         # Database connection test endpoint
├── config/
│   ├── cors.js           # CORS policy configuration
│   ├── db.js             # Database connection setup
│   └── mailer.js         # Nodemailer / email transport config
├── models/
│   └── Contact.js        # Contact data model / schema
├── utils/
│   └── emailTemplates.js # HTML email template builders
├── .env                  # Environment variables (not committed)
├── .env.example          # Example environment variables
├── .gitignore
├── package.json
├── package-lock.json
├── vercel.json           # Vercel deployment configuration
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher
- A MongoDB database (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- An SMTP email provider (Gmail, SendGrid, etc.)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/goldensip.git
cd goldensip/backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Copy the example env file and fill in your values:

```bash
cp .env.example .env
```

Then edit `.env`:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/goldensip

# Email (Nodemailer)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=your-email@gmail.com
MAIL_PASS=your-app-password
MAIL_FROM=no-reply@goldensip.com

# CORS
CLIENT_ORIGIN=http://localhost:3000
```

### 4. Run the Development Server

```bash
npm run dev
```

The API will be available at `http://localhost:5000`.

---

## 📡 API Endpoints

| Method | Endpoint        | Description                        |
|--------|-----------------|------------------------------------|
| GET    | `/api/`         | API health check / welcome message |
| GET    | `/api/home`     | Home endpoint                      |
| POST   | `/api/contact`  | Submit a contact form              |
| GET    | `/api/testDB`   | Test database connectivity         |

### POST `/api/contact`

Submit a contact form. Saves the entry to the database and sends an email notification.

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I'd like to get in touch!"
}
```

**Success Response `200`:**

```json
{
  "success": true,
  "message": "Your message has been sent successfully."
}
```

**Error Response `400/500`:**

```json
{
  "success": false,
  "message": "Error description here."
}
```

---

## ⚙️ Configuration Details

### `config/cors.js`
Defines allowed origins for Cross-Origin Resource Sharing. Update `CLIENT_ORIGIN` in `.env` to match your frontend URL.

### `config/db.js`
Handles MongoDB connection using Mongoose. Connects once on server startup and logs status.

### `config/mailer.js`
Configures the Nodemailer SMTP transport. Supports any SMTP provider via environment variables.

### `utils/emailTemplates.js`
Contains HTML email template functions used when sending contact form notifications.

---

## 🗃️ Models

### `Contact.js`

| Field     | Type   | Required | Description              |
|-----------|--------|----------|--------------------------|
| name      | String | ✅        | Sender's full name       |
| email     | String | ✅        | Sender's email address   |
| message   | String | ✅        | Message content          |
| createdAt | Date   | Auto     | Timestamp (auto-managed) |

---

## ☁️ Deployment (Vercel)

This backend is configured for serverless deployment on **Vercel**.

### Deploy via Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

### `vercel.json` Overview

```json
{
  "version": 2,
  "builds": [{ "src": "api/index.js", "use": "@vercel/node" }],
  "routes": [{ "src": "/(.*)", "dest": "api/index.js" }]
}
```

> ⚠️ Set all `.env` variables in the **Vercel Dashboard → Project → Settings → Environment Variables**.

---

## 🧪 Testing

### Test database connection:
```
GET /api/testDB
```

### Test contact endpoint with cURL:
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","message":"Hello!"}'
```

---

## 📦 Scripts

| Command         | Description                        |
|-----------------|------------------------------------|
| `npm start`     | Start the production server        |
| `npm run dev`   | Start with nodemon (auto-restart)  |

---

## 🛡️ Security Notes

- Never commit your `.env` file — it's listed in `.gitignore`
- Use app-specific passwords for Gmail SMTP
- Validate and sanitize all incoming request data
- Enable rate limiting in production to prevent abuse

---

## 📄 License

This project is private and proprietary. All rights reserved © GOLDENSIP.