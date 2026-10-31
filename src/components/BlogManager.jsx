import { useState, useEffect } from 'react';
import api from '../services/api';

const BlogManager = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const fetchPosts = async () => {
    try {
      const { data } = await api.get('/blog');
      setPosts(data);
    } catch (err) {
      setError('Failed to fetch blog posts');
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/blog', { title, content });
      setTitle(''); setContent('');
      fetchPosts();
    } catch (err) {
      setError('Failed to create post');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await api.delete(`/blog/${id}`);
        fetchPosts();
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete post');
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Manage Blog Posts</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleCreate} className="mb-6 space-y-3 bg-gray-50 p-4 rounded border">
        <h3 className="font-semibold text-lg">Write New Post</h3>
        <input type="text" placeholder="Post Title" required className="w-full border p-2 rounded" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea placeholder="Write your content here..." required className="w-full border p-2 rounded h-32" value={content} onChange={(e) => setContent(e.target.value)} />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Publish Post</button>
      </form>

      <ul className="space-y-2">
        {posts.map((post) => (
          <li key={post._id} className="flex justify-between items-center border p-3 rounded bg-gray-50">
            <div>
              <h4 className="font-bold">{post.title}</h4>
              <p className="text-sm text-gray-600 line-clamp-1">{post.content}</p>
            </div>
            <button onClick={() => handleDelete(post._id)} className="text-red-500 hover:text-red-700 font-semibold">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogManager;