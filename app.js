// ===== Local API Configuration =====
const API_URL = 'http://localhost:3000/api';

// ===== DOM Elements =====
const postForm = document.getElementById('postForm');
const authorNameInput = document.getElementById('authorName');
const topicTitleInput = document.getElementById('topicTitle');
const messageContentInput = document.getElementById('messageContent');
const postsFeed = document.getElementById('postsFeed');
const noPosts = document.getElementById('noPosts');
const loadingSpinner = document.getElementById('loadingSpinner');
const errorMessage = document.getElementById('errorMessage');
const submitButton = postForm.querySelector('.btn-submit');

// ===== Initialize App =====
document.addEventListener('DOMContentLoaded', async () => {
    try {
        await loadPosts();
    } catch (error) {
        console.error('Initialization error:', error);
        showError('Failed to connect to server. Make sure the server is running on port 3000.');
    }
});

// ===== Form Submission Handler =====
postForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const authorName = authorNameInput.value.trim();
    const title = topicTitleInput.value.trim();
    const content = messageContentInput.value.trim();

    if (!authorName || !title || !content) {
        showError('Please fill in all fields');
        return;
    }

    // Disable submit button during submission
    submitButton.disabled = true;
    submitButton.textContent = 'Posting...';

    try {
        const response = await fetch(`${API_URL}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                author_name: authorName,
                title: title,
                content: content
            })
        });

        if (!response.ok) {
            throw new Error('Failed to create post');
        }

        // Clear form
        postForm.reset();
        
        // Hide error message if it was showing
        hideError();

        // Reload posts to show the new one
        await loadPosts();

        // Show success feedback
        showSuccessMessage();

    } catch (error) {
        console.error('Error creating post:', error);
        showError('Failed to create post. Please try again.');
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Post to Forum';
    }
});

// ===== Load and Display Posts =====
async function loadPosts() {
    try {
        showLoadingSpinner(true);
        hideError();

        const response = await fetch(`${API_URL}/posts`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }

        const result = await response.json();
        const data = result.data || [];

        showLoadingSpinner(false);

        if (data && data.length > 0) {
            renderPosts(data);
            noPosts.classList.add('hidden');
        } else {
            postsFeed.innerHTML = '';
            noPosts.classList.remove('hidden');
        }

    } catch (error) {
        console.error('Error loading posts:', error);
        showLoadingSpinner(false);
        showError('Failed to load posts. Is the server running?');
        noPosts.classList.remove('hidden');
    }
}

// ===== Render Posts to DOM =====
function renderPosts(posts) {
    postsFeed.innerHTML = '';

    posts.forEach((post) => {
        const postCard = createPostCard(post);
        postsFeed.appendChild(postCard);
    });
}

// ===== Create Post Card Element =====
function createPostCard(post) {
    const card = document.createElement('div');
    card.className = 'post-card';

    const formattedDate = formatDate(post.created_at);
    const sanitizedContent = escapeHtml(post.content);
    const sanitizedTitle = escapeHtml(post.title);
    const sanitizedAuthor = escapeHtml(post.author_name);

    card.innerHTML = `
        <div class="post-header">
            <span class="post-author">${sanitizedAuthor}</span>
            <span class="post-date">${formattedDate}</span>
        </div>
        <h2 class="post-title">${sanitizedTitle}</h2>
        <p class="post-content">${sanitizedContent}</p>
    `;

    return card;
}

// ===== Utility Functions =====

/**
 * Format timestamp to readable date
 */
function formatDate(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) {
        return 'just now';
    } else if (diffMins < 60) {
        return `${diffMins} min ago`;
    } else if (diffHours < 24) {
        return `${diffHours}h ago`;
    } else if (diffDays < 7) {
        return `${diffDays}d ago`;
    } else {
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
        });
    }
}

/**
 * Escape HTML special characters to prevent XSS
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Show loading spinner
 */
function showLoadingSpinner(show) {
    if (show) {
        loadingSpinner.classList.remove('hidden');
    } else {
        loadingSpinner.classList.add('hidden');
    }
}

/**
 * Show error message
 */
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
}

/**
 * Hide error message
 */
function hideError() {
    errorMessage.classList.add('hidden');
}

/**
 * Show success feedback (optional: brief visual feedback)
 */
function showSuccessMessage() {
    // Optional: Add a brief success message or animation
    console.log('Post created successfully!');
}

/**
 * Auto-refresh posts every 30 seconds (optional real-time feel)
 */
setInterval(() => {
    loadPosts();
}, 30000);
