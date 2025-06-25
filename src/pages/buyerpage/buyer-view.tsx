import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.css';

// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';


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
  <div className="container mt-4">
    <div className="row">
      {products.map((product) => (
        <div className="col-md-4 mb-4" key={product.id}>
          <Card>
            <Card.Img
              variant="top"
              src={`/images/pertamax.jpg`}
              alt={product.product_name}
            />
            <Card.Body>
              <Card.Title>{product.product_name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Category: {getCategoryName(product.productCategoryID)}
              </Card.Subtitle>
              <Card.Text>
                Stock: {product.stock} <br />
                Price: Rp {product.price.toLocaleString()}
              </Card.Text>
              <Button
                variant="primary"
                onClick={() => navigate(`/product/edit/${product.id}`)}
              >
                Edit
              </Button>{' '}
              <Button variant="danger" onClick={() => handleDelete(product.id)}>
                Delete
              </Button>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  </div>
);
}

export default ProductPage;