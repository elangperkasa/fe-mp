import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalButtonGroup from '../../components/globalbutton/GlobalButtonGroup';
import * as XLSX from 'xlsx';

type Sales = {
  id: string;
  customer_id: string;
  purchased_date: string;
  total_price: string;
};

type Customer = {
  id: string;
  customer_name: string;
  address: string;
  phone: string;
  email: string;
  join_date: string;
};

const token = localStorage.getItem('token');

const SalesListPage = () => {
  const [sales, setSales] = useState<Sales[]>([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [customer, setCustomer] = useState<Customer[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchSales();
    fetchCustomers();
  }, []);

  const customerMap = customer.reduce<Record<string, string>>((map, c) => {
    map[c.id] = c.customer_name;
    return map;
  }, {});

  const fetchSales = async () => {
    const res = await fetch('http://localhost:3100/sales', {
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

  const filteredSales = sales.filter((sale) => {
    if (!fromDate && !toDate) return true;

    const date = new Date(sale.purchased_date);
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;

    return (!from || date >= from) && (!to || date <= to);
  });

  const handleExportExcel = () => {
    const worksheetData = filteredSales.map((s) => ({
      'Sales ID': s.id,
      'Purchased Date': new Date(s.purchased_date).toLocaleDateString(),
      'Customer ID': s.customer_id,
      'Total Price': s.total_price,
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'SalesData');
    XLSX.writeFile(workbook, 'Filtered_Sales_Data.xlsx');
  };

  const fetchCustomers = async () => {
  const token = localStorage.getItem('accessToken');
  const res = await fetch('http://localhost:3100/customer', {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  setCustomer(data);
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
      <h2>Sales Data</h2>
      <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '10px',
        marginBottom: '20px',
      }}
     >
      {/* <button onClick={() => navigate('/sales/add')} style={{ padding: '8px 16px', fontSize: '16px', cursor: 'pointer' }}>+ Add Sales</button> */}
       
       
      <GlobalButtonGroup />
  
      {/* your product table or other content */}
    </div>
        <div >
        <label>
          From Date:&nbsp;
          <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
        </label>
        <label>
          To Date:&nbsp;
          <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
        </label>&nbsp;
        <button onClick={handleExportExcel}>Export to Excel</button>
      </div>
      <table border={1} cellPadding={8} style={{ marginTop: 20 }}>
        <thead style={{ backgroundColor: 'yellow' }}>
          <tr>
            <th>Sales ID</th>
          <th>Purchased Date</th>
          <th>Customer</th>
          {/* <th>Total Price</th> */}
          <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* {sales.map((sale) => ( */}
             {filteredSales.map((sale) => (
            <tr key={sale.id}>
            <td>{sale.id}</td>
            <td>{new Date(sale.purchased_date).toLocaleDateString()}</td>
            <td>{customerMap[sale.customer_id] || 'Unknown'}</td>
            {/* <td>{sale.customer_id}</td> */}
            {/* <td>{sale.total_price}</td> */}
            
            <td>
                {/* <button onClick={() => navigate(`/sales/edit/${sale.id}`)}>Edit</button>{' '} */}
                <button onClick={() => handleDelete(sale.id)}>Delete</button>{' '}
                <button onClick={() => navigate(`/detail/add/${sale.id}`)}>Add Sales Detail</button>{' '}
                <button onClick={() => navigate(`/detail/view/${sale.id}`)}>View Sales Detail</button>
            </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesListPage;