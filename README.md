# ChatMessage

## 📄 Project Update Report: Chat, Auth, Reporting, and Realtime

---

### ✅ BACKEND UPDATES

#### 📦 New Modules

- **Authentication module added** with login/register functionality.
- **New Route**: `auth.routes.ts`

  - Endpoint: `POST /api/login`, `POST /api/register`

---

#### 📨 Message Handling

**Updated in `message.routes.ts`:**

| Endpoint                              | Method   | Purpose                                                            |
| ------------------------------------- | -------- | ------------------------------------------------------------------ |
| `api/msg`                             | GET/POST | Handle `rasoi` weekly report messages (`isRasoi`, `isError` flags) |
| `api/messages/send/user/:userId`      | POST     | Send message to user by user ID                                    |
| `api/messages/send/number`            | POST     | Send message by contact number                                     |
| `api/messages/send/number/:contactNo` | GET      | Fetch message history by contact number                            |
| `api/messages/mark-seen`              | POST     | Mark messages as seen in DB when opened                            |

> Shared function: `sendMessages()` handles both GET and POST message flows.

---

#### 📋 Bill and Report API Enhancements

**In `bill.routes.ts`:**

- `POST /bill`: Adds `isPavti` and `isError` flags used for weekly data tracking.

**In `report.routes.ts`:**

| Endpoint                  | Method | Purpose                     |
| ------------------------- | ------ | --------------------------- |
| `api/report/weekly`       | GET    | Fetch all weekly reports    |
| `api/report/weekly/:date` | GET    | Fetch weekly report by date |

---

#### 🔊 Webhook socket add

**In `webhook.routes.ts`:**

- Add socket-based event handling for message notifications.

---

#### ⚙️ Environment Variables (.env)

```
PORT=13738
DB_URL=mongodb://localhost:27017/
DB_NAME=myDatabase
WHATSAPP_ACCESS_TOKEN=EAAPssyf3zFsBO9mVzedEQoZBzAMN88GduSAZCRZBY4MS6nYCkg2PB6xSLcvg88iVhafZAjp60O4rLAuG15tG9uoxZAEwB59x7bSHVlQERrQBOGQZCt0JQ21ioJU5WGv1ZCZCygosH8fure5EF7j0tKesZBZC58oAI06HVSe4uNpfFJxnWIFBPQYisgtXuwwA2nkgt9VAZDZD
WHATSAPP_PHONE_NUMBER_ID=312749801914929
NODE_ENV=development
JWT_SECRET=myverystrongsecretkey
```

#### ⛏️ Backend Dependencies

- `bcrypt`
- `jsonwebtoken`
- `socket.io`

## backend run - npm run nodemon-dev

**Backend base URL**: [http://65.1.102.134:13738](http://65.1.102.134:13738)

---

### ✅ FRONTEND UPDATES

#### 🔐 Auth

- Components: `Login.jsx`, `Register.jsx`
- Used to authenticate users using JWT

#### 📱 Socket Integration

- File: `socket.js`
- Used to listen/send real-time `new_message` events.

---

#### 💬 Chat Feature

**Updated Files:**

- `components/chats/Chat.jsx`
- `ChatList.jsx` – sorted chat contacts with last message
- `ChatMessages.jsx` – show messages, seen check

**Redux Updates:**

- `chatAction.js`
- `chatReducer.js`
- `chatSaga.js` (if used)

**chat.services.jsx:**

```js
getChatList:         GET /users
getChatHistory:      GET /messages/send/number/:contactNo
sendMessageByNumber: POST /messages/send/number
markMessagesAsSeen:  POST /messages/mark-seen
```

---

#### 📊 Report Feature

**New Components:**

- `report/WeeklyReportPage.jsx`
- `report/DailyReportDetail.jsx`
- Fetches weekly report data from backend APIs.

---

#### ⚙️ Frontend .env

```
REACT_APP_BASE_URL=http://65.1.102.134:13738/api
```

##frontend run - npm start

#### 📁 Frontend Dependencies

- `react-toastify`
- `socket.io-client`

---

### 🧠 HOW IT WORKS (Flow)

1. **User logs in** → JWT stored → APIs use auth headers
2. **Chat opened** → Messages loaded → Seen status updated in DB
3. **Message sent** → API + Socket emit → UI + DB updated
4. **Weekly report** → API call via component → Displayed in UI

---

### ✅ Summary

- Real-time chat fully integrated using sockets.
- All messages synced and stored via MongoDB.
- Seen, delivered, error flags used for message/report tracking.
- Clean separation of auth, chat, and report modules.
- All endpoints token protected (where needed).

---
