import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalButtonGroup from '../../components/globalbutton/GlobalButtonGroup';

type Customer = {
  id: string;
  customer_name: string;
  address: string;
  phone: string;
  email: string;
  join_date: string;
};
const token = localStorage.getItem('token');

const CustomerListPage = () => {
  const [customer, setCustomer] = useState<Customer[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCustomer();
  }, []);

  const fetchCustomer = async () => {
    const token = localStorage.getItem('accessToken');
    const res = await fetch('http://localhost:3100/customer', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setCustomer(data);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this Customer?')) return;

    const token = localStorage.getItem('accessToken');
    const res = await fetch(`http://localhost:3100/customer/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) fetchCustomer();
  };

  return (
    <div
        style={{
        display: 'flex',
        // justifyContent: 'center', // horizontally center
        alignItems: 'center',     // vertically center
        // minHeight: '100vh',       // full viewport height
        padding: 5,
        flexDirection: 'column',
        }}
        >
      <h2>Customer</h2>
          <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '10px',
        marginBottom: '20px',
      }}
     >
      <button onClick={() => navigate('/customer/add')} style={{ padding: '8px 16px', fontSize: '16px', cursor: 'pointer' }}>+ Add Customer</button>
       
      <GlobalButtonGroup />

      {/* your product table or other content */}
    </div>
      <table border={1} cellPadding={8} style={{ marginTop: 20 }}>
        <thead style={{ backgroundColor: 'yellow' }}>
          <tr>
            <th>Name</th>
          <th>Address</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Join Date</th>
          <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customer.map((cust) => (
            <tr key={cust.id}>
               <td>{cust.customer_name}</td>
            <td>{cust.address}</td>
            <td>{cust.phone}</td>
            <td>{cust.email}</td>
            <td>{new Date(cust.join_date).toLocaleDateString()}</td>
            <td>
                <button onClick={() => navigate(`/customer/edit/${cust.id}`)}>Edit</button>{' '}
                <button onClick={() => handleDelete(cust.id)}>Delete</button>{' '}
                <button onClick={() => navigate(`/sales/add/${cust.id}`)}>Add Sales</button>
            </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerListPage;