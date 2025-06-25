import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


// type Customer = {
//   id: string;
//   customer_name: string;
//   address: string;
//   phone: string;
//   email: string;
//   join_date: string;
// };

// type Sales = {
//   id: string;
//   customer_name: string;
//   address: string;
//   phone: string;
//   email: string;
//   join_date: string;
// };

type Detail = [{
  id: string;
  product_id: string;
  purchased_amount: string;
  promo_id: string;
  item_price: string;
  sub_total_price: string;
  sales_id :string;
  sales: Sales ;

}];

type Sales = {
  id : string ;
  purchased_date : string ;
  customer_id : string ;
  total_price : string ;
  customer : Customer
}

type Customer = {
   id : string ;
   customer_name : string ;
   address : string ;
   phone : string ;
   email : string ;
   join_date : string ;
}

type Product = {
  id: string;
  product_name: string;
  productCategoryID: string;
  stock: number;
  price: number;
};

const SalesPage = () => {  
  const [sales, setSales] = useState<Sales | null>(null);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [detail, setDetail] = useState<Detail[]>([]);
  const { id } = useParams();
  const [Newsalesid, setNewsalesid] = useState('');
  const [Newsubtotalprice, setNewsubtotalprice] = useState('');
  const [Newitemprice, setNewitemprice] = useState('');
  const [Newproductid, setNewproductid] = useState('');
  const [Newpurchasedamount, setNewpurchasedamount] = useState('1');
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  // const [selectedSubtotal, setselectedSubtotal] = useState<number | null>(null);
  const [quantity, setQuantity] = useState<number>(1); // | ''>('');
  const [subtotal, setSubtotal] = useState<number>(0);
  const [price, setPrice] = useState<number | ''>('');

  const navigate = useNavigate();

  const token = localStorage.getItem('accessToken');

  const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:3100/product', {
      });
      const data = await res.json();
      // alert(JSON.stringify(data))
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products', error);
      }
    };

 const fetchHeader = async () => {
    const res = await fetch(`http://localhost:3100/sales/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setSales(data);

    const rescus = await fetch(`http://localhost:3100/customer/${data.customer_id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const datacus = await rescus.json();
    setCustomer(datacus);
  };

   const fetchDetail = async () => {
    const res = await fetch(`http://localhost:3100/salesdetail/sales/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setDetail(data);
    setCustomer(data[0].sales.customer);
    setSales(data[0].sales);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');
    const SalesDetail = {
      sales_id: id,
      sub_total_price: subtotal,
      item_price: price,
      product_id: selectedProductId,
      purchased_amount: quantity,
      
    };

    await fetch('http://localhost:3100/salesdetail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(SalesDetail),
    });
    // alert(id)
    navigate(`/detail/view/${id}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setSelectedProductId(id);

    const selectedProduct = products.find((p) => p.id === id);
    setPrice(selectedProduct ? selectedProduct.price : null);
    setSubtotal(selectedProduct.price*Newpurchasedamount);
  };

 const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuantity(value === '' ? '' : Number(value));
  };


  useEffect(() => {  
    fetchHeader();
    fetchProducts();
    fetchDetail();

    if (typeof price === 'number' && typeof quantity === 'number') {
      setSubtotal(price * quantity);
    } else {
      setSubtotal(0);
    }
  }, [price,quantity]);

  return (

      <div style={{ maxWidth: 500, margin: '40px auto' }}>      
      <h2>Add Detail Sales</h2>
      <form onSubmit={handleSubmit}>
        <div >
          <label>Header :</label> &nbsp;&nbsp;
          {/* {sales?.id} &nbsp;&nbsp;-&nbsp;&nbsp; */}
          <label>Customer Name:</label> {customer?.customer_name} &nbsp;&nbsp;-&nbsp;&nbsp;
          <label>Purchase Date:</label> {new Date(sales?.purchased_date).toLocaleDateString()}
          {/* <input type="text" value="0" required style={{ width: '100%', padding: 8 }}/> */}
        </div>
        &nbsp;&nbsp;<br /><br />
         <div style={{ marginBottom: 20 }}>
          <label>Detail :</label> &nbsp;&nbsp;<br /><br />
          
          <label>Product Name:</label><br />
          {/* <input type="text" onChange={(e) => setNewproductid(e.target.value)} required style={{ width: '100%', padding: 8 }}/> */}
        <select id="product" value={selectedProductId} onChange={handleChange}
        // onChange={(e) => setSelectedProductId(e.target.value)}
        style={{ width: '100%', padding: 8 }}>
            <option value="">-- Choose a product --</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.product_name}
              </option>
            ))}
        </select>
        </div>
        <div style={{ marginBottom: 20 }}>
          <label>Number Item Purchased:</label><br />
          <input type="number" value={quantity} 
          // onChange={(e) => setNewpurchasedamount(e.target.value)} 
          onChange={handleQuantityChange}
          min={1}
          required style={{ width: '100%', padding: 8 }}/>
        </div>
        <div style={{ marginBottom: 20 }}>
          <label>Item Price:</label><br />
          <input type="number"  value={price} required style={{ width: '100%', padding: 8 }}/>
        </div>
         <div style={{ marginBottom: 20 }}>
          <label>Sub Total:</label><br />
          <input type="number" value={subtotal} required style={{ width: '100%', padding: 8 }}/>
        </div>
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <button type="submit" style={{ marginLeft: 10,padding: '10px 20px' }}>Save</button>
        <button type="button" onClick={() => navigate('/sales')} style={{ marginLeft: 10,padding: '10px 20px' }}>
          Cancel
        </button>
        </div>
      </form>

    </div>
  );
};

export default SalesPage;