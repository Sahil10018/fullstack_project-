# 📚 Classroom Discussion Forum - Local Setup

A complete classroom discussion forum with a Node.js backend and local SQLite database. No external services required!

---

## 📋 Project Structure

```
classroom-forum/
├── index.html       # Main HTML structure
├── style.css        # Styling and responsive design
├── app.js           # Frontend application logic
├── server.js        # Node.js Express backend
├── package.json     # Node.js dependencies
└── forum.db         # SQLite database (created automatically)
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js** (version 12 or higher) - Download from [nodejs.org](https://nodejs.org)

### Step 1: Install Dependencies

Open PowerShell or Command Prompt in your project directory and run:

```bash
npm install
```

This will install:
- `express` - Web server framework
- `sqlite3` - Local database
- `cors` - Cross-origin resource sharing

### Step 2: Start the Server

Run the backend server:

```bash
npm start
```

You should see:
```
✨ Classroom Forum Server Running ✨
📍 Local: http://localhost:3000
Press CTRL+C to stop the server
```

### Step 3: Open the Application

Open your web browser and go to:

**http://localhost:3000**

That's it! The forum is now running locally with a SQLite database.

---

## 💻 How to Use

### Creating Posts
1. Enter your name in the **"Your Name"** field
2. Enter a topic title in the **"Topic Title"** field
3. Share your thoughts in the **"Message"** field
4. Click **"Post to Forum"**

### Viewing Posts
- Posts appear in reverse chronological order (newest first)
- Relative timestamps (e.g., "5 min ago", "2h ago", etc.)
- Posts are automatically refreshed every 30 seconds

### Database
- The SQLite database `forum.db` is created automatically on first run
- All posts are stored locally on your computer
- No data is sent to external services

---

## 🛠️ API Endpoints

The backend provides the following REST API endpoints:

### GET /api/posts
Retrieve all posts (ordered by newest first)

```bash
curl http://localhost:3000/api/posts
```

### POST /api/posts
Create a new post

```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "author_name": "John",
    "title": "My Topic",
    "content": "This is my post content"
  }'
```

### GET /api/posts/:id
Retrieve a specific post

```bash
curl http://localhost:3000/api/posts/1
```

### DELETE /api/posts/:id
Delete a specific post

```bash
curl -X DELETE http://localhost:3000/api/posts/1
```

### GET /api/health
Check if the server is running

```bash
curl http://localhost:3000/api/health
```

## 🔧 Troubleshooting

### Issue: "Cannot find module 'express'"
**Solution:** Run `npm install` to install dependencies

### Issue: "EADDRINUSE: address already in use :::3000"
**Solution:** The port 3000 is already in use. Either:
- Close the other application using port 3000
- Or modify the `PORT` variable in `server.js`

### Issue: "Failed to connect to server"
**Solution:** Make sure the backend server is running. Check that you see the server startup message in your terminal.

### Issue: Posts not saving
**Solution:** Check that the `forum.db` file is created in your project directory. The database should be writable.

---

## 📝 Features

✅ Create and view discussion posts
✅ Local SQLite database (no network required)
✅ Responsive design for desktop and mobile
✅ Automatic 30-second auto-refresh
✅ XSS protection with HTML sanitization
✅ Relative timestamp formatting
✅ Clean, modern UI

---

## 🎓 Learning Points

This project demonstrates:
- Node.js and Express.js backend development
- SQLite database usage
- REST API design
- JavaScript fetch API
- CORS handling
- Database initialization

---

## 📄 License

MIT License - Feel free to use and modify as needed
- Check browser console (F12) for error messages

### Page loads but shows "No posts yet"

**Problem:** Feed is empty  
**Solution:**
- Make sure the `posts` table was created successfully
- Check that Supabase credentials are correct
- Verify Row Level Security policies are enabled

### "CORS Error" or Network Issues

**Problem:** Browser shows CORS or network errors  
**Solution:**
- This shouldn't happen with Supabase public keys
- Try clearing browser cache (Ctrl+Shift+Del)
- Ensure you're using the correct Supabase URL format

### Changes not showing up

**Problem:** Updated files aren't reflecting in browser  
**Solution:**
- Clear browser cache (Ctrl+Shift+Del or Cmd+Shift+Del on Mac)
- Hard refresh (Ctrl+F5 or Cmd+Shift+R)
- In Live Server, just save the file

---

## 📊 Database Schema

The `posts` table has the following columns:

| Column | Type | Description |
|--------|------|-------------|
| `id` | BIGINT | Unique post identifier (auto-generated) |
| `title` | VARCHAR(255) | Topic title |
| `content` | TEXT | Message content |
| `author_name` | VARCHAR(100) | Poster's name |
| `created_at` | TIMESTAMP | When post was created |
| `updated_at` | TIMESTAMP | When post was last updated |

---

## 🔐 Security Notes

- **No Authentication:** This is a public forum - anyone can post
- **Input Sanitization:** All user input is escaped to prevent XSS attacks
- **Row Level Security:** Supabase RLS policies allow public reads and inserts
- **No File Uploads:** Users can only submit text (prevents malware)

For production use, consider adding:
- Rate limiting (prevent spam)
- Moderation features
- User authentication
- Post deletion/editing

---

## 📝 Example Usage

1. Enter your name (e.g., "Sarah")
2. Enter a topic (e.g., "Best resources for learning algorithms?")
3. Write your message (e.g., "I found this amazing YouTube series...")
4. Click "Post to Forum"
5. Your post appears at the top of the feed instantly!

---

## 🤝 Contributing

To improve this forum:
1. Modify the CSS for better styling
2. Add features like post search or filtering
3. Implement user authentication
4. Add emoji reactions to posts
5. Create a dark mode toggle

---

## 📞 Support

For issues with:
- **Supabase:** Visit [supabase.com/docs](https://supabase.com/docs)
- **JavaScript:** Check [MDN Web Docs](https://developer.mozilla.org)
- **CSS:** Visit [CSS-Tricks](https://css-tricks.com)

---

## 📄 License

This project is free to use and modify for educational purposes.

---

**Built with ❤️ for classroom discussions**
