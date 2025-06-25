import { Helmet } from 'react-helmet-async';
import  ProductView  from './view/product-view';


export default function Product() {
  return (
    <>
      <Helmet>
        <title>Product List</title>
      </Helmet>

      <ProductView />
    </>
  );
}
