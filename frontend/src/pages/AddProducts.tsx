import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
interface Product {
  name: string;
  price: number;
  quantity: number;
  totalPrice: number;
}

interface ProductInput {
  name: string;
  price: string;
  quantity: string;
}

// const AddProduct: React.FC = () => {
//   const navigate = useNavigate();
//   const [products, setProducts] = useState<Product[]>([]);
//   const [newProduct, setNewProduct] = useState<ProductInput>({
//     name: '',
//     price: '',
//     quantity: ''
//   });
//   const handleGeneratePDF = () => {
//     // You can pass the data through navigation state or context
//     navigate('/invoice');
//   };

const AddProduct: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<ProductInput>({
    name: '',
    price: '',
    quantity: ''
  });

  // const handleGeneratePDF = () => {
  //   // You can pass the products data to the invoice page if needed
  //   navigate('/invoice', { 
  //     state: { 
  //       products,
  //       personName: "Person_name", // You can pass actual user data here
  //       email: "example@email.com",
  //       date: new Date().toLocaleDateString()
  //     } 
  //   });
  // };
  // const handleGeneratePDF = async () => {
  //   try {
  //     const response = await axios.post('http://localhost:5000/api/generate-invoice', {
  //       personName: "Person_name", // You can make this dynamic
  //       email: "example@email.com", // You can make this dynamic
  //       date: new Date().toLocaleDateString(),
  //       products: products.map(p => ({
  //         name: p.name,
  //         quantity: p.quantity,
  //         rate: p.price, // assuming price is your rate
  //         totalAmount: p.price * p.quantity
  //       }))
  //     }, {
  //       responseType: 'blob'
  //     });




      // Create blob link to download
    //   const url = window.URL.createObjectURL(new Blob([response.data]));
    //   const link = document.createElement('a');
    //   link.href = url;
    //   link.setAttribute('download', `invoice-${Date.now()}.pdf`);
    //   document.body.appendChild(link);
    //   link.click();
      
    //   // Cleanup
    //   link.parentNode?.removeChild(link);
    //   window.URL.revokeObjectURL(url);
    // } catch (error) {
    //   console.error('Failed to generate PDF:', error);
    //   alert('Failed to generate PDF. Please try again.');
    // }
const handleGeneratePDF = async () => {
  try {
    const response = await axios.post('http://localhost:5000/api/generate-invoice', {
      personName: 'John Doe',
      email: 'john@example.com',
      date: '2024-01-01',
      products: [
        { name: 'Product A', quantity: 2, rate: 100, totalAmount: 200 },
        { name: 'Product B', quantity: 1, rate: 150, totalAmount: 150 },
      ],
    }, {
      responseType: 'blob', // Ensure PDF is downloaded as binary
    });
    const blob = new Blob([response.data], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'invoice.pdf';
    link.click();
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Failed to generate PDF');
  }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.quantity) {
      alert('Please fill in all fields');
      return;
    }

    const price = parseFloat(newProduct.price);
    const quantity = parseInt(newProduct.quantity);

    setProducts(prev => [...prev, {
      name: newProduct.name,
      price,
      quantity,
      totalPrice: price * quantity
    }]);

    // Reset form
    setNewProduct({
      name: '',
      price: '',
      quantity: ''
    });
  };

  const calculateSubTotal = (): number => {
    return products.reduce((sum, product) => sum + product.totalPrice, 0);
  };

  const calculateGST = (): number => {
    return calculateSubTotal() * 0.18; // 18% GST
  };

  const calculateTotal = (): number => {
    return calculateSubTotal() + calculateGST();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex items-center gap-4 mb-8">
          <div className="h-8 w-8 bg-white rounded-lg"></div>
          <h1 className="text-xl font-semibold">levitation</h1>
          <button className="ml-auto bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors">
            Logout
          </button>
        </header>

        {/* Main Content */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Add Products</h2>
            <p className="text-gray-400">
              This is basic login page which is used for levitation assignment purpose.
            </p>
          </div>

          {/* Product Form */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="flex flex-col">
              <label className="mb-2">Product Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter the product name"
                value={newProduct.name}
                onChange={handleInputChange}
                className="bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:border-green-500 text-white"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-2">Product Price</label>
              <input
                type="number"
                name="price"
                placeholder="Enter the price"
                value={newProduct.price}
                onChange={handleInputChange}
                className="bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:border-green-500 text-white"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-2">Quantity</label>
              <input
                type="number"
                name="quantity"
                placeholder="Enter the Qty"
                value={newProduct.quantity}
                onChange={handleInputChange}
                className="bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:border-green-500 text-white"
              />
            </div>
          </div>

          {/* Add Product Button */}
          <div className="flex justify-center mb-8">
            <button 
              onClick={addProduct}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md transition-colors"
            >
              Add Product
            </button>
          </div>

          {/* Products Table */}
          <div className="overflow-x-auto">
            <table className="w-full mb-8">
              <thead className="bg-gray-700">
                <tr>
                  <th className="text-left py-3 px-4">Product name</th>
                  <th className="text-left py-3 px-4">Price</th>
                  <th className="text-left py-3 px-4">Quantity</th>
                  <th className="text-left py-3 px-4">Total Price</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index} className="border-b border-gray-700">
                    <td className="py-3 px-4">{product.name}</td>
                    <td className="py-3 px-4">INR {product.price}</td>
                    <td className="py-3 px-4">{product.quantity}</td>
                    <td className="py-3 px-4">INR {product.totalPrice}</td>
                  </tr>
                ))}
                <tr className="border-b border-gray-700">
                  <td colSpan={3} className="py-3 px-4 text-right">Sub-Total</td>
                  <td className="py-3 px-4">INR {calculateSubTotal().toFixed(1)}</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td colSpan={3} className="py-3 px-4 text-right">Incl GST 18%</td>
                  <td className="py-3 px-4">INR {calculateTotal().toFixed(1)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Generate PDF Button */}
          <div className="flex justify-center">
            <button 
            onClick={handleGeneratePDF}
            className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-md transition-colors">
              Generate PDF Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;