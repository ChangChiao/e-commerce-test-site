import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const { login, isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/welcome" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (username === 'admin' && password === '1234') {
      setShowVerification(true);
    } else {
      setError('帳號或密碼錯誤');
    }
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (verificationCode === '0000') {
      setIsVerifying(true);
      setTimeout(() => {
        login(username, password);
      }, 2000);
    } else {
      setError('驗證碼錯誤');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">電商後台登入</h2>
        
        {!showVerification ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              帳號
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="請輸入帳號"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              密碼
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="請輸入密碼"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
          >
            登入
          </button>
        </form>
        ) : (
        <form onSubmit={handleVerificationSubmit} className="space-y-6">
          <div>
            <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700 mb-2">
              驗證碼
            </label>
            <input
              type="text"
              id="verificationCode"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="請輸入驗證碼"
              maxLength="4"
              required
              disabled={isVerifying}
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200 disabled:bg-gray-400"
            disabled={isVerifying}
          >
            {isVerifying ? '驗證中...' : '驗證'}
          </button>
        </form>
        )}
        
        {error && (
          <div className="text-red-500 text-sm text-center mt-4">{error}</div>
        )}
        
        <div className="mt-4 text-center text-sm text-gray-600">
          {!showVerification ? '測試帳號：admin / 密碼：1234' : '驗證碼：0000'}
        </div>
      </div>
    </div>
  );
}