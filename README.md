# 📚 Classroom Discussion Forum - Setup Guide

A clean, minimalist single-page classroom discussion forum built with vanilla HTML, CSS, JavaScript, and Supabase.

---

## 📋 Project Structure

```
classroom-forum/
├── index.html       # Main HTML structure
├── style.css        # Styling and responsive design
├── app.js           # Application logic and Supabase integration
└── setup.sql        # Database table creation script
```

---

## 🚀 Quick Start Guide

### Step 1: Set Up Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/log in
2. Click **"New Project"** and create a new project
3. Wait for the project to initialize (takes ~2 minutes)
4. Once ready, you'll see your **Project Dashboard**

### Step 2: Create the Database Table

1. In your Supabase dashboard, go to **SQL Editor** (left sidebar)
2. Click **"New Query"**
3. Copy the entire contents of `setup.sql` and paste it into the editor
4. Click **"Run"** to execute the SQL
5. You should see a success message

### Step 3: Get Your Supabase Credentials

1. Go to **Settings** → **API** (left sidebar)
2. You'll see two keys:
   - **Project URL** (copy this)
   - **anon public key** (copy this)
3. Keep these safe - you'll need them next

### Step 4: Configure the Application with .env

1. Open or create the `.env` file in the project root
2. Add your Supabase settings like this:
   ```env
   SUPABASE_URL=https://YOUR_SUPABASE_URL.supabase.co
   SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
   ```
3. Save the file

### Step 5: Run the App Locally

1. Open `app.js` in a text editor
2. Find these lines at the top:
   ```javascript
   const SUPABASE_URL = 'https://YOUR_SUPABASE_URL.supabase.co';
   const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
   ```
3. Replace `YOUR_SUPABASE_URL` with your **Project URL**
4. Replace `YOUR_SUPABASE_ANON_KEY` with your **anon public key**
5. Save the file

---

## 💻 How to Run Locally

### Option A: Using Python (Recommended for Beginners)

**Python 3.x:**
```bash
cd classroom-forum
python -m http.server 8000
```

**Python 2.x:**
```bash
cd classroom-forum
python -m SimpleHTTPServer 8000
```

Then open your browser and go to: **http://localhost:8000**

### Option B: Using Node.js (if installed)

```bash
cd classroom-forum
npx http-server
```

Then open your browser to the URL shown (usually **http://localhost:8080**)

### Option C: Using Live Server (VS Code Extension)

1. Install the **Live Server** extension in VS Code
2. Right-click on `index.html`
3. Select **"Open with Live Server"**
4. Your browser will automatically open

### Option D: Direct File Opening (Quick Test)

Simply double-click `index.html` to open it in your browser.
*(Note: This works, but some features may be limited due to browser security)*

---

## 🌐 Deploy Online (Free Options)

### Deploy to Netlify

1. Create a zip file containing all three files (index.html, style.css, app.js)
2. Go to [netlify.com](https://netlify.com)
3. Sign up with GitHub, GitLab, or email
4. Drag and drop your zip file into Netlify
5. Your site will be live in seconds!

### Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Import Project"**
3. Paste your repository URL or upload files
4. Click **"Deploy"**

### Deploy to GitHub Pages

1. Create a GitHub repository
2. Upload your files
3. Go to **Settings** → **Pages**
4. Select **"Deploy from a branch"** and choose **main**
5. Your site will be live at `https://yourusername.github.io/repo-name`

---

## ✨ Features

✅ **No Authentication Required** - Users can post without logging in  
✅ **Real-time Feed** - Posts refresh automatically every 30 seconds  
✅ **Responsive Design** - Works perfectly on mobile, tablet, and desktop  
✅ **Clean & Minimalist UI** - Professional blue theme with soft gray background  
✅ **XSS Protection** - Input sanitization to prevent malicious code  
✅ **Easy to Customize** - All styling in one CSS file, all logic in one JS file  

---

## 🎨 Customization

### Change Colors

Open `style.css` and modify these values:

```css
/* Navigation Bar Colors */
.navbar {
    background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
    /* Change #1e3a8a and #2563eb to your desired colors */
}

/* Background Color */
body {
    background-color: #f0f2f5;
    /* Change this to your preferred background color */
}
```

### Change Button Text

Open `index.html` and look for:
```html
<button type="submit" class="btn-submit">Post to Forum</button>
```

### Change Form Labels

Open `index.html` and modify the label text:
```html
<label for="authorName">Your Name</label>
<label for="topicTitle">Topic Title</label>
<label for="messageContent">Message</label>
```

### Change Input Placeholders

```html
<input placeholder="Enter your name" ... >
<input placeholder="What's your topic?" ... >
<textarea placeholder="Share your thoughts..." ... ></textarea>
```

---

## 🔧 Troubleshooting

### "Failed to create post" Error

**Problem:** Posts aren't being created  
**Solution:** 
- Check that your Supabase credentials are correct in `app.js`
- Verify the `posts` table exists in your database
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
