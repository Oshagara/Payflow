## 📄 PayFlow – Fintech Digital Wallet Backend

PayFlow is a secure backend API for a digital wallet system built with **Node.js**, **Express**, and **MongoDB**. It includes user authentication, wallet creation, peer-to-peer transfers, transaction logs, and funding via **Paystack**.

---

## 🚀 Features

* ✅ User registration and login (JWT-based)
* 💰 Automatic wallet creation on registration
* 🔄 Transfer funds between users
* 🧾 View wallet balance and transaction history
* 🏦 Fund wallet using real bank/card payments via **Paystack**
* 🔐 Protected routes using JWT middleware

---

## 📁 Folder Structure

```
payflow-backend/
├── controllers/
├── routes/
├── models/
├── middlewares/
├── config/
├── .env
├── app.js
└── server.js
```

---

## 🔧 Technologies

* Node.js
* Express.js
* MongoDB & Mongoose
* JSON Web Tokens (JWT)
* bcryptjs
* Paystack API (for real wallet funding)
* CORS

---

## 📦 Installation

1. **Clone the repo**

```bash
git clone https://github.com/oshagara/payflow-backend.git
cd payflow-backend
```

2. **Install dependencies**

```bash
npm install
```

3. **Create a `.env` file**

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/payflow
JWT_SECRET=xxxxxx-xxxxx-xxxx
PAYSTACK_SECRET_KEY=sk_xxxxx_xxxxx
```

4. **Run the server**

```bash
# Development
npx nodemon server.js

# Production
node server.js
```

---

## 🔐 Authentication

Use `/auth/register` and `/auth/login` to get a JWT.
Send it as a header:

```
Authorization: Bearer <your_token>
```

---

## 📡 API Endpoints

### 👤 Auth

| Method | Endpoint         | Description           |
| ------ | ---------------- | --------------------- |
| POST   | `/auth/register` | Register new user     |
| POST   | `/auth/login`    | Login & receive token |

---

### 💼 Wallet

| Method | Endpoint                 | Description                 |
| ------ | ------------------------ | --------------------------- |
| GET    | `/wallet`                | Get wallet balance          |
| POST   | `/wallet/transfer`       | Send money to another user  |
| POST   | `/wallet/fund`           | Fund wallet manually        |
| POST   | `/wallet/verify-payment` | Verify Paystack transaction |

---

### 📜 Transactions

| Method | Endpoint        | Description                |
| ------ | --------------- | -------------------------- |
| GET    | `/transactions` | View all user transactions |

---

## 💳 Wallet Funding with Paystack

1. Frontend initiates payment with Paystack popup.
2. On success, Paystack returns a `reference`.
3. Send `POST /wallet/verify-payment` with:

```json
{ "reference": "paystack_reference_string" }
```

4. Wallet is credited if verified.

---

## ✅ Sample JSON Requests

### Register

```json
POST /auth/register
{
  "name": "Israel Oshagara",
  "email": "oshagaras@gmail.com",
  "password": "securepass"
}
```

### Login

```json
POST /auth/login
{
  "email": "oshagaras@gmail.com",
  "password": "securepass"
}
```

### Transfer Money

```json
POST /wallet/transfer
{
  "receiverEmail": "oshagaras@gmail.com",
  "amount": 1000
}
```

### Fund Wallet Manually

```json
POST /wallet/fund
{
  "amount": 3000
}
```

### Fund Wallet via Paystack

```json
POST /wallet/verify-payment
{
  "reference": "paystack_transaction_ref"
}
```

---

## 🛡️ Security

* Passwords hashed using **bcryptjs**
* All sensitive routes protected using JWT
* Input validation (you can add Joi or Express Validator)

---

## 📜 License

* Created By: Israel Oshagara
