import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import GlobalButtonGroup from '../../components/globalbutton/GlobalButtonGroup';


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
const token = localStorage.getItem('token');

const DetailListPage = () => {
  const [sales, setSales] = useState<Sales | null>(null);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [detail, setDetail] = useState<Detail[]>([]);
  const [totalSubtotal, setTotalSubtotal] = useState<number>(0);
  const { id } = useParams();

  const navigate = useNavigate();

  
  const fetchDetail = async () => {
    const res = await fetch(`http://localhost:3100/salesdetail/sales/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setDetail(data);
    setCustomer(data[0].sales.customer);
    setSales(data[0].sales);
    const total = data.reduce(
          (acc: number, item: Detail) => acc + item.sub_total_price,
          0
    );
    setTotalSubtotal(total);

  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this Sales?')) return;

    const res = await fetch(`http://localhost:3100/salesdetail/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) fetchDetail();
  };

  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    fetchDetail();
  }, []);

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
      <button onClick={() => navigate(`/detail/add/${id}`)} style={{ padding: '8px 16px', fontSize: '16px', cursor: 'pointer' }}>+ Add Detail</button>
       
      <GlobalButtonGroup />

      
    </div>
      <table border={1} cellPadding={8} style={{ marginTop: 20 }}>
        <thead style={{ backgroundColor: 'yellow' }}>
          <tr>
            <th>Product Name</th>
            <th>Purchased Amount</th>
            <th>Item Price (Rp)</th>
            <th>Sub Total Price (Rp)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {detail.map((dtl) => (
            <tr key={dtl.id}>
                <td>{dtl.product.product_name}</td>                
                <td style={{ textAlign: 'right' }}>{dtl.purchased_amount.toLocaleString()}</td>
                <td style={{ textAlign: 'right' }}>{dtl.item_price.toLocaleString()}</td>
                <td style={{ textAlign: 'right' }} >{dtl.sub_total_price.toLocaleString()}</td>
                <td>
                <button onClick={() => handleDelete(dtl.id)}>Delete</button>{' '}
                </td>
            </tr>
          ))} 
        </tbody>
      </table>
      <div>
      <h3>Total Subtotal Price: &nbsp; Rp {totalSubtotal.toLocaleString()}</h3>
    </div>
    </div>
  );
};

export default DetailListPage;