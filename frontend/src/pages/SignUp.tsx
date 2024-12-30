import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUpPage = () => {
  const navigate = useNavigate(); // Initialize navigate function
  const [formData, setFormData] = useState<SignUpFormData>({
    name: '',
    email: '',
    password: '',
  });

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log('Form submitted:', formData);
  // };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (response.ok) {
            alert('Registration successful');
            navigate('/login');
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <header className="w-full px-6 py-4 flex justify-between items-center border-b border-gray-800">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-white rounded-lg"></div>
          <span className="ml-2 text-white text-xl">levitation</span>
        </div>
        <button
          onClick={() => navigate('/login')} // Navigate to login on click
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
        >
          Login
        </button>
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Left Section */}
        <div className="w-1/2 p-8 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-white mb-2">
                Sign up to begin your journey
              </h1>
              <p className="text-gray-400 text-sm">
                This is a basic signup page used for levitation assignment purposes.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Enter your name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-800 rounded-md text-white"
                  placeholder="Enter Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-800 rounded-md text-white"
                  placeholder="Enter Email ID"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-800 rounded-md text-white"
                  placeholder="Enter Password"
                />
              </div>

              <div className="flex items-center space-x-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                >
                  Register
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/login')} // Navigate to login on click
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Already have an account? Login
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Section - Image */}
        <div className="w-1/2 relative">
          <img
            src="/api/placeholder/800/600"
            alt="Technology Connection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20">
            <div className="absolute bottom-8 left-8 right-8">
              <div className="bg-green-500 bg-opacity-90 p-6 rounded-lg">
                <h2 className="text-3xl font-bold text-white mb-2">
                  Connecting People
                </h2>
                <h3 className="text-2xl text-white">With Technology</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
