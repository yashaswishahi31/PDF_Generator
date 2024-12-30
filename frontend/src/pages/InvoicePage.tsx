// import React from 'react';
// import InvoiceGenerator from '../components/InvoiceGenerator';

// const InvoicePage: React.FC = () => {
//   // Sample data - replace this with your actual data
//   const invoiceData = {
//     personName: "Person_name",
//     email: "example@email.com",
//     date: "12/04/23",
//     products: [
//       { name: "(Product 1)", quantity: 32, rate: 120, totalAmount: 100 },
//       { name: "(Product 2)", quantity: 32, rate: 120, totalAmount: 100 },
//       { name: "(Product 3)", quantity: 32, rate: 120, totalAmount: 100 },
//       { name: "(Product 4)", quantity: 32, rate: 120, totalAmount: 100 }
//     ]
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-8">
//       <InvoiceGenerator {...invoiceData} />
//     </div>
//   );
// };

// export default InvoicePage;

import React from 'react';
import { useLocation } from 'react-router-dom';
import InvoiceGenerator from '../components/InvoiceGenerator';

const InvoicePage: React.FC = () => {
  const location = useLocation();
  const invoiceData = location.state || {
    personName: "Person_name",
    email: "example@email.com",
    date: new Date().toLocaleDateString(),
    products: [
      { name: "(Product 1)", quantity: 32, rate: 120, totalAmount: 100 },
      { name: "(Product 2)", quantity: 32, rate: 120, totalAmount: 100 },
      { name: "(Product 3)", quantity: 32, rate: 120, totalAmount: 100 },
      { name: "(Product 4)", quantity: 32, rate: 120, totalAmount: 100 }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <InvoiceGenerator {...invoiceData} />
    </div>
  );
};

export default InvoicePage;