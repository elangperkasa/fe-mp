import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CategoryEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer_name, setcustomer_name] = useState("");
  const [address, setaddress] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");

  useEffect(() => {
    const fetchCategory = async () => {
      const token = localStorage.getItem('accessToken');
      const res = await fetch(`http://localhost:3100/customer/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setcustomer_name(data.customer_name);
      setaddress(data.address);
      setphone(data.phone);
      setemail(data.email);

    };
    fetchCategory();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');
    await fetch(`http://localhost:3100/customer/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ customer_name: customer_name, address: address }),
    });
    navigate('/customer');
  };

  return (
      // <div
      //   style={{
      //   display: 'flex',
      //   alignItems: 'center',     
      //   padding: 5,
      //   flexDirection: 'column',
      //   }}
      // >
       <div style={{ maxWidth: 500, margin: '40px auto' }}> 
      <h2>Edit Customer</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 20 }}>
          <label>Customer Name:</label><br />
          <input defaultValue={customer_name} onChange={(e) => setcustomer_name(e.target.value)} required style={{ width: '100%', padding: 8 }}/>
        </div>
        <div style={{ marginBottom: 20 }}>
          <label>Phone:</label><br />
          <input defaultValue={phone}  onChange={(e) => setphone(e.target.value)}  required style={{ width: '100%', padding: 8 }} />
        </div>
             <div style={{ marginBottom: 20 }}>
          <label>Address:</label><br />
          <input defaultValue={address}  onChange={(e) => setaddress(e.target.value)}  required style={{ width: '100%', padding: 8 }}/>
        </div>
        <div style={{ marginBottom: 20 }}>
          <label>Email:</label><br />
          <input defaultValue={email}  onChange={(e) => setemail(e.target.value)}  required style={{ width: '100%', padding: 8 }} />
        </div>
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <button type="submit" style={{ marginLeft: 10,padding: '10px 20px' }}>Update</button>
        <button type="button" onClick={() => navigate('/customer')}  style={{ marginLeft: 10,padding: '10px 20px' }}>
          Cancel
        </button>

        </div>
      </form>
    </div>
  );
};

export default CategoryEditPage;