import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalButtonGroup from '../../components/globalbutton/GlobalButtonGroup';

type Sales = {
  id: string;
  customer_id: string;
  purchased_date: string;
  total_price: string;
};

type Detail = {
  id: string;
  product_id: string;
  purchased_amount: string;
  promo_id: string;
  item_price: string;  
  sub_total_price: string;  
  sales_id: string;
};

const token = localStorage.getItem('token');

const DetailListPage = () => {
  const [sales, setSales] = useState<Sales[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    const res = await fetch('http://localhost:3100/salesdetail', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setSales(data);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this Sales Header?')) return;

    const res = await fetch(`http://localhost:3100/sales/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) fetchSales();
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
      <h2>Sales Data Detail List</h2>
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
            <th>Sales IDxx</th>
            <th>Purchased Date</th>
            <th>Customer ID</th>
            <th>Total Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale.id}>
            <td>{sale.id}</td>
            <td>{new Date(sale.purchased_date).toLocaleDateString()}</td>
            <td>{sale.customer_id}</td>
            <td>{sale.total_price}</td>
            
            <td>
                {/* <button onClick={() => navigate(`/sales/edit/${sale.id}`)}>Edit</button>{' '} */}
                <button onClick={() => handleDelete(sale.id)}>Delete</button>{' '}
                <button onClick={() => navigate(`/sales-detail/add/${sale.id}`)}>Add Sales Detail</button>
            </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DetailListPage;