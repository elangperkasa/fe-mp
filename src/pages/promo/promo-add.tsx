import { useEffect, useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

type Product = {
  id: string;
  product_name: string;
};

const PromoAddPage = () => {
  const [product, setProduct] = useState<Product[]>([]);
  const [productName, setProductName] = useState('');
  const [promoStart, setpromoStart] = useState('');
  const [promoEnd, setpromoEnd] = useState(0);
  const [productId, setproductId] = useState(0);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch('http://localhost:3100/product'
    //         , {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${token}`, // ✅ add token here
    //   },
    // }
);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error('Failed to load product', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const newPromo = {
      promo_name: productName,
      promo_start: promoStart,
      promo_end: promoEnd,
      product_id: productId,
    };

    try {
      const res = await fetch('http://localhost:3100/promo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPromo),
      });

      if (res.ok) {
        alert('Promo added successfully!');
        navigate('/promo');
      } else {
        alert('Failed to add promo');
      }
    } catch (error) {
      console.error('Error adding promo', error);
    }
  };

  if (loading) return <p>Loading data...</p>;

  return (
    <div style={{ maxWidth: 500, margin: '40px auto' }}>
      <h2>Add New Promo</h2>
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

        {/* <div style={{ marginBottom: 10 }}>
          <label>Product</label><br />
          <select
            value={id}
            onChange={(e) => setproductId(e.target.value)}
            required
            style={{ width: '100%', padding: 8 }}
          >
            <option value="">-- Select Category --</option>
            {product.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.product_name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>Promo Start</label><br />
          <input
            type="date"
            value={promoStart}
            onChange={(e) => setpromoStart(Date(e.target.value))}
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
        </div> */}
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

export default PromoAddPage;
