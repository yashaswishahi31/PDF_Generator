import React from 'react';

interface Product {
  name: string;
  quantity: number;
  rate: number;
  totalAmount: number;
}

interface InvoiceProps {
  personName: string;
  email: string;
  date: string;
  products: Product[];
}

const InvoiceGenerator: React.FC<InvoiceProps> = ({
  personName,
  email,
  date,
  products
}) => {
  const calculateTotal = () => {
    return products.reduce((sum, product) => sum + product.totalAmount, 0);
  };

  const calculateGST = () => {
    return calculateTotal() * 0.18; // 18% GST
  };

  const calculateFinalTotal = () => {
    return calculateTotal() + calculateGST();
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-gray-900 rounded-lg"></div>
          <span className="text-xl font-semibold">Levitation</span>
        </div>
        <div className="text-right">
          <h2 className="text-xl font-bold">INVOICE GENERATOR</h2>
          <p className="text-gray-500 text-sm">Sample Output should be this</p>
        </div>
      </div>

      {/* Customer Info */}
      <div className="bg-gray-900 text-white rounded-lg p-6 mb-8">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-400 mb-2">Name</p>
            <p className="text-green-400">{personName}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-400 mb-2">Date : {date}</p>
            <p className="bg-white text-black px-3 py-1 rounded">{email}</p>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="mb-8">
        <div className="grid grid-cols-4 bg-gradient-to-r from-gray-900 to-green-900 text-white p-3 rounded-t-lg">
          <div>Product</div>
          <div className="text-center">Qty</div>
          <div className="text-center">Rate</div>
          <div className="text-right">Total Amount</div>
        </div>
        {products.map((product, index) => (
          <div key={index} className="grid grid-cols-4 border-b py-3 px-3">
            <div>{product.name}</div>
            <div className="text-center">{product.quantity}</div>
            <div className="text-center">{product.rate}</div>
            <div className="text-right">USD {product.totalAmount}</div>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="flex justify-end mb-8">
        <div className="w-64 border rounded-lg p-4">
          <div className="flex justify-between mb-2">
            <span>Total Charges</span>
            <span>${calculateTotal()}</span>
          </div>
          <div className="flex justify-between mb-2 text-gray-600">
            <span>GST (18%)</span>
            <span>${calculateGST()}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total Amount</span>
            <span className="text-blue-600">₹ {calculateFinalTotal()}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-gray-600 text-sm mt-16">
        <p>Date: {date}</p>
        <p className="mt-8 max-w-2xl mx-auto">
          We are pleased to provide any further information you may require and look forward to assisting with 
          your next order. Rest assured, it will receive our prompt and dedicated attention.
        </p>
      </div>
    </div>
  );
};

export default InvoiceGenerator;