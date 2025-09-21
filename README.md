# 💬 Chattr

A real-time chat application built with React and Socket.IO, featuring room-based messaging and modern web technologies.

## ✨ Features

- **Real-time messaging** using Socket.IO for instant communication
- **Room-based chat** - join different chat rooms with unique names
- **User management** - track users in each room with unique usernames
- **Modern UI** - clean, responsive design with dark theme
- **React Router** - seamless navigation between join and chat pages
- **Emoji support** - enhanced messaging with emoji reactions
- **Auto-scroll** - automatically scroll to latest messages
- **Mobile responsive** - works great on all device sizes

## 🚀 Tech Stack

### Frontend
- **React 19** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Socket.IO Client** - Real-time communication
- **React Emoji** - Emoji support
- **React Scroll to Bottom** - Auto-scroll functionality

### Backend
- **Node.js** with **Bun** runtime
- **Express.js** - Web framework
- **Socket.IO** - Real-time bidirectional communication
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
Chattr/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Join/      # Join room component
│   │   │   └── Chat/      # Chat interface component
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   ├── package.json
│   └── vite.config.js
├── server/                 # Node.js backend
│   ├── index.js           # Main server file
│   ├── router.js          # Express routes
│   ├── users.js           # User management utilities
│   └── package.json
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- [Bun](https://bun.sh) (recommended) or Node.js
- Modern web browser

### 1. Clone the repository
```bash
git clone <repository-url>
cd Chattr
```

### 2. Install dependencies

**Backend:**
```bash
cd server
bun install
```

**Frontend:**
```bash
cd client
bun install
```

### 3. Start the development servers

**Terminal 1 - Backend:**
```bash
cd server
bun run dev
```
Server will start on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd client
bun run dev
```
Client will start on `http://localhost:5173`

## 🎯 Usage

1. **Join a Room**
   - Enter your name and room name
   - Click "Sign In" to join the chat

2. **Start Chatting**
   - Send messages by typing and pressing Enter
   - Messages are sent in real-time to all users in the room
   - See when users join or leave the room

3. **Room Management**
   - Each room is isolated - users only see messages from their room
   - Usernames must be unique within each room
   - Room names are case-insensitive

## 🔧 Available Scripts

### Client (Frontend)
- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run preview` - Preview production build
- `bun run lint` - Run ESLint

### Server (Backend)
- `bun run dev` - Start development server with nodemon
- `bun run start` - Start production server

## 🌐 API Endpoints

- `GET /` - Health check endpoint

## 🔌 Socket.IO Events

### Client to Server
- `join` - Join a room with name and room parameters
- `sendMessage` - Send a message to the current room
- `disconnect` - Handle user disconnection

### Server to Client
- `message` - Receive messages from other users or admin
- `error` - Handle connection or validation errors

## 🎨 Customization

### Styling
- Modify CSS files in `client/src/components/` for custom styling
- The app uses a dark theme with blue accents
- Responsive design included for mobile devices

### Features
- Add new Socket.IO events in `server/index.js`
- Extend user management in `server/users.js`
- Add new React components in `client/src/components/`

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd client
bun run build
# Deploy the dist/ folder
```

### Backend (Railway/Heroku)
```bash
cd server
# Set PORT environment variable
bun run start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🐛 Known Issues

- Users are not automatically removed from the users array on disconnect
- No message persistence (messages are lost on page refresh)
- No user authentication system

## 🔮 Future Enhancements

- [ ] Message persistence with database
- [ ] User authentication and profiles
- [ ] File sharing capabilities
- [ ] Message reactions and replies
- [ ] Private messaging
- [ ] Online user indicators
- [ ] Message search functionality
- [ ] Dark/light theme toggle

---

**Happy Chatting! 💬**
