import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// import GlobalButtonGroup from '../../../components/globalbutton/GlobalButtonGroup';

type Product = {
  id: string;
  product_name: string;
  productCategoryID: string;
  stock: number;
  price: number;
};

type Category = {
  id: string;
  category_name: string;
};


const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken');

  const handleDelete = async (id: string) => {
  const confirmDelete = window.confirm('Are you sure you want to delete this product?');
  if (!confirmDelete) return;
  try {
    const res = await fetch(`http://localhost:3100/product/${id}`, {
      method: 'DELETE',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${token}`,
    //   },
    });

    if (res.ok) {
      alert('Product deleted successfully');
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } else {
      alert('Failed to delete product');
    }
  } catch (error) {
    console.error('Delete error:', error);
    alert('Error deleting product');
  }
};

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:3100/product');
        const data = await res.json();

         // Fetch categories
        const categoryRes = await fetch('http://localhost:3100/product-category');
        const categoryData = await categoryRes.json();

        setProducts(data);
        setCategories(categoryData);
      } catch (err) {
        console.error('Failed to fetch products', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
    const getCategoryName = (id: string) => {
    const found = categories.find((c) => c.id === id);
    return found ? found.category_name : 'Unknown';
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
        <h2>Product List</h2>
      
<div
 style={{
    display: 'flex',
    justifyContent: 'center', // ✅ center horizontally
    flexWrap: 'wrap',         // ✅ allow wrapping if screen is narrow
    gap: '10px',              // ✅ spacing between buttons
    marginBottom: '20px',
  }}
>
  <button
    onClick={() => navigate('/addproduct')}
    style={{
      padding: '8px 16px',
      fontSize: '16px',
      cursor: 'pointer',
    }}
  >
    + Add Product
  </button>
{/* <GlobalButtonGroup /> */}
</div>


      <table   style={{
            borderCollapse: 'collapse',
            width: '100%',
            maxWidth: 800,
            border: '1px solid black',
        }}>
        <thead>
          <tr style={{ textAlign: 'left',backgroundColor: 'yellow' }}>
            <th style={{ border: '1px solid black', textAlign: 'left', padding: '8px' }}>Name</th>
            <th style={{ border: '1px solid black', textAlign: 'left', padding: '8px' }}>Category ID</th>
            <th style={{ border: '1px solid black', textAlign: 'right', padding: '8px' }}>Stock</th>
            <th style={{ border: '1px solid black', textAlign: 'right', padding: '8px' }}>Price (Rp)</th>
            <th style={{ border: '1px solid black', textAlign: 'center', padding: '8px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td style={{ border: '1px solid black', textAlign: 'left', padding: '8px' }}>{p.product_name}</td>
              <td style={{ border: '1px solid black', textAlign: 'left', padding: '8px' }}>{getCategoryName(p.productCategoryID)}</td>
              <td style={{ border: '1px solid black', textAlign: 'right', padding: '8px' }}>{p.stock}</td>
              <td style={{ border: '1px solid black', textAlign: 'right', padding: '8px' }}>{p.price.toLocaleString('id-ID')}</td>
            <td style={{ border: '1px solid black', textAlign: 'center', padding: '8px' }}>
                <button onClick={() => navigate(`/product/edit/${p.id}`)} style={{ marginRight: 10 }}>
                Edit
                </button>
                <button onClick={() => handleDelete(p.id)} style={{ backgroundColor: 'red', color: 'white' }}>
                Delete
                </button>
            </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductPage;