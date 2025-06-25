import { useNavigate } from 'react-router-dom';

const GlobalButtonGroup = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: 'flex',
        // justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '10px',
        // marginBottom: '20px',
      }}
     >
      <button
        onClick={() => navigate('/product')}
        style={{ padding: '8px 16px', fontSize: '16px', cursor: 'pointer' }}
      >
        + View Product
      </button>

      <button
        onClick={() => navigate('/category')}
        style={{ padding: '8px 16px', fontSize: '16px', cursor: 'pointer' }}
      >
        + View Category
      </button>

      <button
        onClick={() => navigate('/customer')}
        style={{ padding: '8px 16px', fontSize: '16px', cursor: 'pointer' }}
      >
        + View Customer
      </button>

      
{/*
      <button
        onClick={() => navigate('/userlist')}
        style={{ padding: '8px 16px', fontSize: '16px', cursor: 'pointer' }}
      >
        + View Userx
      </button> */}
      <button
        onClick={() => navigate('/sales')}
        style={{ padding: '8px 16px', fontSize: '16px', cursor: 'pointer' }}
      >
        + View Sales
      </button>
       
             <button
        onClick={() => navigate('/userviewpage')}
        style={{ padding: '8px 16px', fontSize: '16px', cursor: 'pointer' }}
      >
        + Report
      </button>
      {/* <button
        onClick={() => navigate('/buyerview')}
        style={{ padding: '8px 16px', fontSize: '16px', cursor: 'pointer' }}
      >
        + Buyer Page
      </button> */}
    </div>
  );
};

export default GlobalButtonGroup;