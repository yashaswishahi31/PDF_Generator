import React, { useState } from 'react';
import { ArrowUpDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';



interface LoginFormData {
  email: string;
  password: string;
}

const Login = () => {
  const navigate=useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });

  const slides = [
    {
      image: "./Yashaswi_Image.png",
      title: "Connecting People",
      subtitle: "with Technology"
    },
    {
      image: "/api/placeholder/600/800",
      title: "Building Future",
      subtitle: "through Innovation"
    },
    {
      image: "/api/placeholder/600/800",
      title: "Creating Impact",
      subtitle: "with Solutions"
    }
  ];

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log('Form submitted:', formData);
  // };
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//         const response = await fetch('http://localhost:5000/api/auth/login', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(formData),
//         });
//         const data = await response.json();
//         if (response.ok) {
//             alert('Login successful');
//             localStorage.setItem('token', data.token);
//             navigate('/dashboard'); // Adjust to your actual route
//         } else {
//             alert(data.message);
//         }
//     } catch (error) {
//         console.error('Error:', error);
//     }
// };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
          alert('Login successful');
          localStorage.setItem('token', data.token);
          navigate('/addproduct'); // Redirect to AddProduct page
      } else {
          alert(data.message);
      }
  } catch (error) {
      console.error('Error:', error);
  }
};



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
//     <div className="min-h-screen bg-gray-900">
//       {/* Top Header */}
//       <header className="w-full bg-gray-900 border-b border-gray-800 p-4">
//         <div className="max-w-7xl mx-auto flex justify-end">
//           {/* <button 
//           onClick={() => navigate('/signup')}
//           className="text-green-500 hover:text-green-400 text-sm">
//             Already have an account? Sign in
//           </button> */}
//           <button 
//   // onClick={() => navigate('/signup')}
//   className="text-white hover:text-gray-300 text-sm"
// >
//   Connecting People With Technology
// </button>
//         </div>
//       </header>

<div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <header className="w-full px-6 py-4 flex justify-between items-center border-b border-gray-800">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-white rounded-lg"></div>
          <span className="ml-2 text-white text-xl">levitation</span>
        </div>
        <button className="px-4 py-2 text-green-400 border border-green-400 rounded-md hover:bg-green-600 hover:text-white transition-colors">
  Connecting People With Technology
</button>

      </header>

      <div className="flex items-center justify-center p-4 min-h-[calc(100vh-64px)]">
        <div className="w-full max-w-6xl flex rounded-lg overflow-hidden shadow-2xl">
          {/* Left side - Horizontal slider */}
          <div className="relative hidden md:block w-1/2">
            <div className="relative h-full overflow-hidden">
              <div className="animate-slide-horizontal flex">
                {[...slides, ...slides].map((slide, index) => (
                  <div
                    key={index}
                    className="min-w-full h-full flex flex-col items-center justify-center relative"
                  >
                    <div className="relative w-full h-full">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover brightness-110"
                      />
                      {/* Subtle gradient for text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                      
                      <div className="absolute bottom-8 left-0 right-0 text-center z-20 px-6">
                        <h3 className="text-2xl font-bold text-white mb-2 text-shadow">
                          {slide.title}
                        </h3>
                        <p className="text-green-400 text-shadow">
                          {slide.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2">
              <ArrowUpDown className="text-white" size={24} />
            </div>
          </div>

          {/* Right side - Login form */}
          <div className="w-full md:w-1/2 bg-gray-900 p-8 md:p-12">
            <div className="mb-8">
              <img 
                src="/api/placeholder/40/40" 
                alt="Logo" 
                className="h-10 mb-4"
              />
              <h2 className="text-3xl font-bold text-white mb-2">
                Let the Journey Begin!
              </h2>
              <p className="text-gray-400">
                Sign in to your account and be ready to explore more.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label 
                  htmlFor="email" 
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-green-500 transition"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label 
                  htmlFor="password" 
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Current Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-green-500 transition"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <a href="#" className="text-sm text-green-500 hover:text-green-400">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition duration-200"
              >
                Login now
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;