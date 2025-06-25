import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CategoryEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [stock, setStock] = useState(0);

  useEffect(() => {
    const fetchCategory = async () => {
      const token = localStorage.getItem('accessToken');
      const res = await fetch(`http://localhost:3100/product-category/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setName(data.category_name);
      setStock(data.stock);
    };
    fetchCategory();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');
    await fetch(`http://localhost:3100/product-category/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ category_name: name, stock }),
    });
    navigate('/category');
  };

  return (
      // <div
      //   style={{
      //   display: 'flex',
      //   alignItems: 'center',     
      //   padding: 5,
      //   flexDirection: 'column',
      //   }}
      // >
       <div style={{ maxWidth: 500, margin: '40px auto' }}> 
      <h2>Edit Product Category</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 20 }}>
          <label>Category Name:</label><br />
          <input value={name} onChange={(e) => setName(e.target.value)} required style={{ width: '100%', padding: 8 }}/>
        </div>
        {/* <div style={{ marginBottom: 20 }}>
          <label>Stock:</label><br />
          <input type="number" value={stock} onChange={(e) => setStock(+e.target.value)} required style={{ width: '100%', padding: 8 }} />
        </div> */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <button type="submit" style={{ marginLeft: 10,padding: '10px 20px' }}>Update</button>
        <button type="button" onClick={() => navigate('/category')}  style={{ marginLeft: 10,padding: '10px 20px' }}>
          Cancel
        </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryEditPage;