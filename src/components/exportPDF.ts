import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

const exportToPDF = () => {
  const doc = new jsPDF();
  autoTable(doc, {
    head: [['ID', 'Purchased Date', 'Customer ID', 'Total Price']],
    body: filteredSales.map((sale) => [
      sale.id,
      new Date(sale.purchased_date).toLocaleDateString(),
      sale.customer_id,
      sale.total_price.toLocaleString(),
    ]),
  });
  doc.save('sales.pdf');
};

const exportToExcel = () => {
  const worksheet = XLSX.utils.json_to_sheet(
    filteredSales.map((sale) => ({
      ID: sale.id,
      'Purchased Date': new Date(sale.purchased_date).toLocaleDateString(),
      'Customer ID': sale.customer_id,
      'Total Price': sale.total_price,
    }))
  );
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sales');
  XLSX.writeFile(workbook, 'sales.xlsx');
};