import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  // Fetch articles once on component mount
  useEffect(() => {
    fetchArticles();
  }, []);

  // Fetch all articles from API
  const fetchArticles = async () => {
    try {
      const res = await axios.get('http://localhost:5000/articles');
      setArticles(res.data);
    } catch (error) {
      console.error('Failed to fetch articles', error);
    }
  };

  // Delete article by ID and update state
  const deleteArticle = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/articles/${id}`);
      setArticles((prev) => prev.filter(article => article.id !== id));
    } catch (error) {
      console.error('Failed to delete article', error);
    }
  };

  return (
    <div>
      {/* Navigation links */}
      <nav style={{ marginBottom: '20px' }}>
        <Link to="/" style={{ marginRight: '10px' }}>View Articles</Link>
        <Link to="/add">Add Article</Link>
      </nav>

      <h2>Articles</h2>
      <ul>
        {articles.map(article => (
          <li key={article.id}>
            <strong>{article.title}</strong><br />
            <small>By Journalist #{article.journalistId} | Category #{article.categoryId}</small><br />
            <button onClick={() => deleteArticle(article.id)}>Delete</button>{' '}
            <button onClick={() => navigate(`/update/${article.id}`)}>Update</button>{' '}
            <button onClick={() => navigate(`/articles/${article.id}`)}>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
