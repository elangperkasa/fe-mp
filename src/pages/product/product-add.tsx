import { useEffect, useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

type Category = {
  id: string;
  category_name: string;
};

const ProductAddPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [productName, setProductName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('http://localhost:3100/product-category'
    //         , {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${token}`, // ✅ add token here
    //   },
    // }
);
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error('Failed to load categories', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const newProduct = {
      product_name: productName,
      productCategoryID: categoryId,
      stock,
      price,
    };

    try {
      const res = await fetch('http://localhost:3100/product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });

      if (res.ok) {
        alert('Product added successfully!');
        navigate('/product');
      } else {
        alert('Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product', error);
    }
  };

  if (loading) return <p>Loading categories...</p>;

  return (
    <div style={{ maxWidth: 500, margin: '40px auto' }}>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 10 }}>
          <label>Product Name</label><br />
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            style={{ width: '100%', padding: 8 }}
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>Category</label><br />
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
            style={{ width: '100%', padding: 8 }}
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.category_name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>Stock</label><br />
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            required
            style={{ width: '100%', padding: 8 }}
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label>Price</label><br />
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
            style={{ width: '100%', padding: 8 }}
          />
        </div>
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <button type="submit" style={{ padding: '10px 20px' }}>
          Save Product
        </button>
        <button
            type="button"
            onClick={() => navigate('/product')}
            style={{
            padding: '10px 20px',
            backgroundColor: '#ccc',
            color: '#000',
            border: '1px solid #999',
            cursor: 'pointer',
            }}
        >
            Cancel
        </button>
        </div>
      </form>
    </div>
  );
};

export default ProductAddPage;
