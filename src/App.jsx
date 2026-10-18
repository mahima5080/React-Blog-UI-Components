import React, { useState, useEffect } from 'react';
import postsData from './posts.json';

function App() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    setPosts(postsData);
  }, []);

  const categories = ['All', 'React', 'JavaScript', 'CSS', 'Node.js'];

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh', padding: '20px' }}>
      <header style={{ maxWidth: '1100px', margin: '0 auto 30px', textAlign: 'center' }}>
        <h1 style={{ color: '#0f172a', fontSize: '2.5rem', marginBottom: '10px' }}>TechInsights Blog</h1>
        <p style={{ color: '#64748b' }}>Explore articles on React, Web Development, and MERN Stack</p>
      </header>

      <div style={{ maxWidth: '1100px', margin: '0 auto 30px', display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'space-between', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search articles by keyword..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: 1, minWidth: '250px', padding: '12px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem', outline: 'none' }}
        />
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 'bold',
                backgroundColor: selectedCategory === cat ? '#4f46e5' : '#e2e8f0',
                color: selectedCategory === cat ? '#ffffff' : '#334155',
                transition: 'all 0.2s'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <main style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              style={{ backgroundColor: '#ffffff', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}
            >
              <img src={post.image} alt={post.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
              <div style={{ padding: '20px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#4f46e5', textTransform: 'uppercase' }}>{post.category}</span>
                <h3 style={{ color: '#0f172a', margin: '8px 0', fontSize: '1.2rem', lineHeight: '1.4' }}>{post.title}</h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.5' }}>{post.excerpt}</p>
                <div style={{ marginTop: '15px', paddingTop: '10px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#94a3b8' }}>
                  <span>{post.author}</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#64748b' }}>
            No articles found matching your search or selected category.
          </div>
        )}
      </main>

      {selectedPost && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', zIndex: 100 }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', maxWidth: '600px', width: '100%', padding: '25px', position: 'relative' }}>
            <button onClick={() => setSelectedPost(null)} style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#64748b' }}>&times;</button>
            <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#4f46e5', textTransform: 'uppercase' }}>{selectedPost.category}</span>
            <h2 style={{ color: '#0f172a', margin: '10px 0' }}>{selectedPost.title}</h2>
            <img src={selectedPost.image} alt={selectedPost.title} style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '8px', margin: '15px 0' }} />
            <p style={{ color: '#334155', lineHeight: '1.6' }}>{selectedPost.excerpt}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;