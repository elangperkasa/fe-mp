import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

type Product = {
  id: string;
  product_name: string;
  description: string;
  price: number;
  image: string;
};

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Replace this with real API call if needed
    setProducts([
      {
        id: '1',
        product_name: 'Product A',
        description: 'High quality item A.',
        price: 120000,
        image: 'https://via.placeholder.com/300x200',
      },
      {
        id: '2',
        product_name: 'Product B',
        description: 'Affordable and reliable.',
        price: 90000,
        image: 'https://via.placeholder.com/300x200',
      },
    ]);
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;