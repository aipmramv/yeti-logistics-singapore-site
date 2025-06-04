import { useState } from 'react';

const Admin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem('pagesCmsLoggedIn') === 'true'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('pagesCmsLoggedIn', 'true');
      setLoggedIn(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('pagesCmsLoggedIn');
    setLoggedIn(false);
  };

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="p-6 bg-white rounded shadow-md space-y-4"
        >
          <h1 className="text-xl font-bold text-center">Pages CMS Login</h1>
          <input
            className="border rounded px-3 py-2 w-64"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="border rounded px-3 py-2 w-64"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 space-y-4">
      <h1 className="text-2xl font-bold">Welcome to Pages CMS</h1>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Admin;
