import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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

const ProductEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    const fetchData = async () => {
      try {
        const [productRes, categoryRes] = await Promise.all([
          fetch(`http://localhost:3100/product/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch('http://localhost:3100/product-category', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const productData = await productRes.json();
        const categoryData = await categoryRes.json();

        setProduct(productData);
        setCategories(categoryData);
      } catch (err) {
        console.error('Failed to load data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');

    try {
      const res = await fetch(`http://localhost:3100/product/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(product),
      });

      if (res.ok) {
        alert('Product updated successfully');
        navigate('/product');
      } else {
        alert('Failed to update product');
      }
    } catch (err) {
      console.error('Update failed', err);
    }
  };

  if (loading || !product) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: 500, margin: '40px auto' }}>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 10 }}>
          <label>Product Name</label><br />
          <input
            type="text"
            value={product.product_name}
            onChange={(e) => setProduct({ ...product, product_name: e.target.value })}
            required
            style={{ width: '100%', padding: 8 }}
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>Category</label><br />
          <select
            value={product.productCategoryID}
            onChange={(e) => setProduct({ ...product, productCategoryID: e.target.value })}
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
            value={product.stock}
            onChange={(e) => setProduct({ ...product, stock: Number(e.target.value) })}
            required
            style={{ width: '100%', padding: 8 }}
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label>Price</label><br />
          <input
            type="number"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })}
            required
            style={{ width: '100%', padding: 8 }}
          />
        </div>

        <button type="submit" style={{ padding: '10px 20px' }}>
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ProductEditPage;