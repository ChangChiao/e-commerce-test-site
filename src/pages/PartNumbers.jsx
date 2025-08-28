import { useState, useEffect } from 'react';

export default function PartNumbers() {
  const [parts, setParts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPart, setEditingPart] = useState(null);
  const [formData, setFormData] = useState({
    partNumber: '',
    partName: '',
    applicant: '',
    department: '',
    category: '',
    specification: '',
    quantity: ''
  });

  useEffect(() => {
    const storedParts = localStorage.getItem('parts');
    if (storedParts) {
      setParts(JSON.parse(storedParts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('parts', JSON.stringify(parts));
  }, [parts]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingPart) {
      setParts(parts.map(part => 
        part.id === editingPart.id 
          ? { ...formData, id: editingPart.id }
          : part
      ));
    } else {
      const newPart = {
        ...formData,
        id: Date.now()
      };
      setParts([...parts, newPart]);
    }
    
    closeModal();
  };

  const openModal = (part = null) => {
    if (part) {
      setEditingPart(part);
      setFormData({
        partNumber: part.partNumber,
        partName: part.partName,
        applicant: part.applicant,
        department: part.department,
        category: part.category,
        specification: part.specification,
        quantity: part.quantity
      });
    } else {
      setEditingPart(null);
      setFormData({
        partNumber: '',
        partName: '',
        applicant: '',
        department: '',
        category: '',
        specification: '',
        quantity: ''
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPart(null);
    setFormData({
      partNumber: '',
      partName: '',
      applicant: '',
      department: '',
      category: '',
      specification: '',
      quantity: ''
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('確定要刪除此料號嗎？')) {
      setParts(parts.filter(part => part.id !== id));
    }
  };

  const categories = ['電子零件', '網通設備', '機構件', '五金零件', '電路板'];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">料號管理</h1>
        <button
          onClick={() => openModal()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          新增料號
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                料號
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                品名
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                申請人
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                部門
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                物料類別
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                規格
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                數量
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {parts.map((part) => (
              <tr key={part.id}>
                <td className="px-6 py-4 whitespace-nowrap">{part.partNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap">{part.partName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{part.applicant}</td>
                <td className="px-6 py-4 whitespace-nowrap">{part.department}</td>
                <td className="px-6 py-4 whitespace-nowrap">{part.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">{part.specification}</td>
                <td className="px-6 py-4 whitespace-nowrap">{part.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => openModal(part)}
                    className="text-blue-600 hover:text-blue-900 mr-2"
                  >
                    編輯
                  </button>
                  <button
                    onClick={() => handleDelete(part.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    刪除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {parts.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            尚未有料號資料
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-xl">
            <h2 className="text-xl font-bold mb-4">
              {editingPart ? '編輯料號' : '新增料號'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  料號
                </label>
                <input
                  type="text"
                  name="partNumber"
                  value={formData.partNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  品名
                </label>
                <input
                  type="text"
                  name="partName"
                  value={formData.partName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  申請人
                </label>
                <input
                  type="text"
                  name="applicant"
                  value={formData.applicant}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  部門
                </label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  物料類別
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">請選擇</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  規格
                </label>
                <textarea
                  name="specification"
                  value={formData.specification}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  數量
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  required
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded hover:bg-gray-50"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  {editingPart ? '更新' : '新增'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}