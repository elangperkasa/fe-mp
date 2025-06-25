import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Sales = {
  id: string;
  purchased_date: string;
  customer_id: string;
  total_price: number;
};

type Customer = {
  id: string;
  customer_name: string;
};

type Product = {
  id: string;
  product_name: string;
};

type SalesDetail = {
  id: string;
  product_id: string;
  purchased_amount: number;
  item_price: number;
  sub_total_price: number;
  sales_id: string;
};

type FullSalesReport = {
  sales: Sales;
  customer: Customer;
  details: (SalesDetail & { product: Product })[];
};


const SalesReportPage = () => {
  const [reportData, setReportData] = useState<FullSalesReport[]>([]);
  const [fromDate, setFromDate] = useState<string>(''); // format: YYYY-MM-DD
  const [toDate, setToDate] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('accessToken');
      const headers = { Authorization: `Bearer ${token}` };

      const salesRes = await fetch('http://localhost:3100/sales', { headers });
      const salesData: Sales[] = await salesRes.json();

      const filteredSales = salesData.filter((sale) => {
      const date = new Date(sale.purchased_date).toISOString().split('T')[0];
      return (!fromDate || date >= fromDate) && (!toDate || date <= toDate);
    });

      const fullReport: FullSalesReport[] = await Promise.all(
        salesData.map(async (sale) => {
          const [customerRes, detailRes] = await Promise.all([
            fetch(`http://localhost:3100/customer/${sale.customer_id}`, { headers }),
            fetch(`http://localhost:3100/salesdetail/sales/${sale.id}`, { headers }),
          ]);

          const customer: Customer = await customerRes.json();
          const details: SalesDetail[] = await detailRes.json();

          const detailsWithProduct = await Promise.all(
            details.map(async (detail) => {
              const productRes = await fetch(`http://localhost:3100/product/${detail.product_id}`, { headers });
              const product: Product = await productRes.json();
              return { ...detail, product };
            })
          );

          return {
            sales: sale,
            customer,
            details: detailsWithProduct,
          };
        })
      );

      setReportData(fullReport);
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* <div style={{ marginBottom: '1rem' }}>
        <label>
          From Date:{' '}
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </label>{' '}
        <label>
          To Date:{' '}
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </label>{' '}
        <button onClick={fetchFilteredSales}>Filter</button>
      </div> */}
      <h1 style={{padding: 20}}>Sales Report</h1>
      {reportData.map((report) => (
        <div key={report.sales.id} style={{ border: '1px solid #ccc', margin: '1rem', padding: '1rem' }}>
          <h2>Sales ID: {report.sales.id}</h2>
          <p>Date: {new Date(report.sales.purchased_date).toLocaleString()}</p>
          <p>Customer: {report.customer.customer_name}</p>
          {/* <p>Total Price: Rp {report.sales.total_price.toLocaleString()}</p> */}

          <h3>Details:</h3>
          <table border={1} cellPadding={5} style={{ width: '100%', marginTop: '1rem' }}>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Qty</th>
                <th>Item Price (Rp)</th>
                <th>Subtotal (Rp)</th>
              </tr>
            </thead>
            <tbody>
              {report.details.map((detail) => (
                <tr key={detail.id}>
                  <td>{detail.product.product_name}</td>
                  <td style={{ textAlign: 'right' }}>{detail.purchased_amount.toLocaleString()}</td>
                  <td style={{ textAlign: 'right' }}>{detail.item_price.toLocaleString()}</td>
                  <td style={{ textAlign: 'right' }}>{detail.sub_total_price.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default SalesReportPage;