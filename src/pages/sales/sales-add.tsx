import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


type Customer = {
  id: string;
  customer_name: string;
  address: string;
  phone: string;
  email: string;
  join_date: string;
};

const SalesPage = () => {
  const [customer, setCustomer] = useState<Customer[]>([]);
  const { id } = useParams();

  const navigate = useNavigate();

  const fetch1Customer = async () => {
    const token = localStorage.getItem('accessToken');
    const res = await fetch(`http://localhost:3100/customer/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setCustomer(data);
  };

  


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');
    const SalesHeader = {
      customer_id: id,
      total_price: 0
    };


    await fetch('http://localhost:3100/sales', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(SalesHeader),
    });
    navigate('/customer');
  };

  useEffect(() => {
    fetch1Customer();

  })
  return (

      <div style={{ maxWidth: 500, margin: '40px auto' }}>      
      <h2>Add Header Sales for Customer</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 20 }}>
          <label>Customer Name:</label><br />
          <input  type="text" value={customer.customer_name} required style={{ width: '100%', padding: 8 }}/>
        </div>
        {/* <div style={{ marginBottom: 20 }}>
          <label>Total Price:</label><br />
          <input type="text" value="0" required style={{ width: '100%', padding: 8 }}/>
        </div> */}
        {/* <div style={{ marginBottom: 20 }}>
          <label>Product Name:</label><br />
          <input type="text" onChange={(e) => setproductname(e.target.value)} required style={{ width: '100%', padding: 8 }}/>
        </div>
        <div style={{ marginBottom: 20 }}>
          <label>Number Item Purchased:</label><br />
          <input type="text" onChange={(e) => setnumberitem(e.target.value)} required style={{ width: '100%', padding: 8 }}/>
        </div>
        <div style={{ marginBottom: 20 }}>
          <label>Item Price:</label><br />
          <input type="text" onChange={(e) => setitemprice(e.target.value)} required style={{ width: '100%', padding: 8 }}/>
        </div>
         <div style={{ marginBottom: 20 }}>
          <label>Sub Total:</label><br />
          <input type="text" onChange={(e) => setsubtotal(e.target.value)} required style={{ width: '100%', padding: 8 }}/>
        </div> */}

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