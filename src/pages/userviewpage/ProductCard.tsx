import React from 'react';

type Product = {
  id: string;
  product_name: string;
  description: string;
  price: number;
  image: string;
};

type Props = {
  product: Product;
};

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100">
        <img
          src={product.image}
          className="card-img-top"
          alt={product.product_name}
          style={{ height: '200px', objectFit: 'cover' }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{product.product_name}</h5>
          <p className="card-text">{product.description}</p>
          <div className="mt-auto">
            <h6 className="text-success">Rp {product.price.toLocaleString()}</h6>
            <button className="btn btn-primary mt-2 w-100">Buy</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;