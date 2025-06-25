import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CategoryAddPage = () => {
  const [customer_name, setcustomer_name] = useState("");
  const [address, setaddress] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');
    await fetch('http://localhost:3100/customer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ customer_name: customer_name, phone : phone, address:address,email:email }),
    });
    navigate('/customer');
  };

  return (

      <div style={{ maxWidth: 500, margin: '40px auto' }}>      
      <h2>Add Customer</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 20 }}>
          <label>Customer Name:</label><br />
          <input  type="text" onChange={(e) => setcustomer_name(e.target.value)} required style={{ width: '100%', padding: 8 }}/>
        </div>
        <div style={{ marginBottom: 20 }}>
          <label>Address:</label><br />
          <input type="text" onChange={(e) => setaddress(e.target.value)} required style={{ width: '100%', padding: 8 }}/>
        </div>
        <div style={{ marginBottom: 20 }}>
          <label>Phone:</label><br />
          <input type="text" onChange={(e) => setphone(e.target.value)} required style={{ width: '100%', padding: 8 }}/>
        </div>
        <div style={{ marginBottom: 20 }}>
          <label>email:</label><br />
          <input type="email" onChange={(e) => setemail(e.target.value)} required style={{ width: '100%', padding: 8 }} />
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <button type="submit" style={{ marginLeft: 10,padding: '10px 20px' }}>Save</button>
        <button type="button" onClick={() => navigate('/customer')} style={{ marginLeft: 10,padding: '10px 20px' }}>
          Cancel
        </button>
        </div>
      </form>

    </div>
  );
};

export default CategoryAddPage;