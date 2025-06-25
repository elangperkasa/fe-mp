import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalButtonGroup from '../../components/globalbutton/GlobalButtonGroup';

type Category = {
  id: string;
  category_name: string;
  stock: number;
};

const token = localStorage.getItem('token');

const CategoryListPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const token = localStorage.getItem('accessToken');
    const res = await fetch('http://localhost:3100/product-category', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setCategories(data);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this category?')) return;

    const token = localStorage.getItem('accessToken');
    const res = await fetch(`http://localhost:3100/product-category/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) fetchCategories();
  };

  return (
    <div
        style={{
        display: 'flex',
        // justifyContent: 'center', // horizontally center
        alignItems: 'center',     // vertically center
        // minHeight: '100vh',       // full viewport height
        padding: 5,
        flexDirection: 'column',
        }}
        >
      <h2>Product Categories</h2>
          <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '10px',
        marginBottom: '20px',
      }}
     >
      <button onClick={() => navigate('/category/add')} style={{ padding: '8px 16px', fontSize: '16px', cursor: 'pointer' }}>+ Add Category</button>
       
      <GlobalButtonGroup />

      {/* your product table or other content */}
    </div>
      <table border={1} cellPadding={8} style={{ marginTop: 20 }}>
        <thead style={{ backgroundColor: 'yellow' }}>
          <tr>
            <th>Name</th>
            {/* <th>Stock</th>   */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.id}>
              <td>{cat.category_name}</td>
              {/* <td>{cat.stock}</td> */}
              <td>
                <button onClick={() => navigate(`/category/edit/${cat.id}`)}>Edit</button>{' '}
                <button onClick={() => handleDelete(cat.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryListPage;