const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// SQLite Database Setup
const db = new sqlite3.Database(path.join(__dirname, 'forum.db'), (err) => {
    if (err) {
        console.error('Error opening database:', err);
    } else {
        console.log('Connected to SQLite database');
        initializeDatabase();
    }
});

// Initialize Database Tables
function initializeDatabase() {
    db.run(`
        CREATE TABLE IF NOT EXISTS posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            author_name TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {
        if (err) {
            console.error('Error creating posts table:', err);
        } else {
            console.log('Posts table ready');
        }
    });
}

// ===== API Routes =====

// GET all posts (ordered by most recent first)
app.get('/api/posts', (req, res) => {
    db.all(
        'SELECT * FROM posts ORDER BY created_at DESC',
        (err, rows) => {
            if (err) {
                console.error('Error fetching posts:', err);
                res.status(500).json({ error: 'Failed to fetch posts' });
            } else {
                res.json({ data: rows || [] });
            }
        }
    );
});

// POST new post
app.post('/api/posts', (req, res) => {
    const { author_name, title, content } = req.body;

    // Validation
    if (!author_name || !title || !content) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const query = `
        INSERT INTO posts (author_name, title, content, created_at, updated_at)
        VALUES (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `;

    db.run(query, [author_name, title, content], function(err) {
        if (err) {
            console.error('Error inserting post:', err);
            res.status(500).json({ error: 'Failed to create post' });
        } else {
            res.status(201).json({
                id: this.lastID,
                author_name,
                title,
                content,
                created_at: new Date().toISOString()
            });
        }
    });
});

// GET a single post by ID
app.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;

    db.get('SELECT * FROM posts WHERE id = ?', [id], (err, row) => {
        if (err) {
            console.error('Error fetching post:', err);
            res.status(500).json({ error: 'Failed to fetch post' });
        } else if (!row) {
            res.status(404).json({ error: 'Post not found' });
        } else {
            res.json({ data: row });
        }
    });
});

// DELETE a post by ID
app.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;

    db.run('DELETE FROM posts WHERE id = ?', [id], function(err) {
        if (err) {
            console.error('Error deleting post:', err);
            res.status(500).json({ error: 'Failed to delete post' });
        } else {
            res.json({ message: 'Post deleted successfully' });
        }
    });
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running' });
});

// Start Server
app.listen(PORT, () => {
    console.log(`\n✨ Classroom Forum Server Running ✨`);
    console.log(`📍 Local: http://localhost:${PORT}`);
    console.log(`Press CTRL+C to stop the server\n`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\nShutting down server...');
    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err);
        } else {
            console.log('Database connection closed');
        }
        process.exit(0);
    });
});
