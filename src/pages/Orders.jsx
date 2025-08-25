import { useState, useEffect } from 'react';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedProduct, setSelectedProduct] = useState('all');

  useEffect(() => {
    // 生成隨機訂單資料
    const generateOrders = () => {
      const names = ['張三', '李四', '王五', '陳六', '林七', '黃八', '趙九', '周十'];
      const cities = ['台北市', '新北市', '桃園市', '台中市', '台南市', '高雄市'];
      const districts = ['中正區', '大安區', '信義區', '內湖區', '南港區', '文山區'];
      const products = ['iPhone 15', 'MacBook Pro', 'iPad Air', 'AirPods Pro', 'Apple Watch', 'Mac Mini'];
      const payments = ['信用卡', '貨到付款', 'ATM轉帳', 'LINE Pay', '街口支付'];

      const randomOrders = [];
      const currentMonth = new Date().getMonth() + 1; // 獲取當前月份 (1-12)
      
      for (let i = 1; i <= 100; i++) {
        // 隨機生成月份 (1 到當前月份)
        const month = Math.floor(Math.random() * currentMonth) + 1;
        
        // 根據月份確定該月的最大天數
        const daysInMonth = new Date(2025, month, 0).getDate();
        const day = Math.floor(Math.random() * daysInMonth) + 1;
        
        randomOrders.push({
          id: i,
          buyerName: names[Math.floor(Math.random() * names.length)],
          address: `${cities[Math.floor(Math.random() * cities.length)]}${districts[Math.floor(Math.random() * districts.length)]}${Math.floor(Math.random() * 999) + 1}號`,
          phone: `09${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`,
          items: products[Math.floor(Math.random() * products.length)],
          orderDate: `2025/${String(month).padStart(2, '0')}/${String(day).padStart(2, '0')}`,
          amount: Math.floor(Math.random() * 50000) + 5000,
          paymentMethod: payments[Math.floor(Math.random() * payments.length)],
          taxId: Math.random() > 0.7 ? Math.floor(Math.random() * 90000000 + 10000000).toString() : '-'
        });
      }
      return randomOrders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
    };

    setOrders(generateOrders());
  }, []);

  // 篩選訂單
  const filteredOrders = selectedProduct === 'all' 
    ? orders 
    : orders.filter(order => order.items === selectedProduct);

  // 計算分頁資料
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  // 處理頁面切換
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 處理每頁筆數變更
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // 重置到第一頁
  };

  // 處理商品篩選變更
  const handleProductFilterChange = (e) => {
    setSelectedProduct(e.target.value);
    setCurrentPage(1); // 重置到第一頁
  };

  // 獲取所有不重複的商品項目
  const getUniqueProducts = () => {
    const products = new Set(orders.map(order => order.items));
    return Array.from(products).sort();
  };

  // 生成頁碼數組
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    return pageNumbers;
  };

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold text-gray-800">訂單查詢</h1>
      
      <div className="flex items-center mb-6 space-x-4">
        <label className="text-sm text-gray-600">
          商品篩選：
          <select
            value={selectedProduct}
            onChange={handleProductFilterChange}
            className="px-3 py-1 ml-2 text-sm border border-gray-300 rounded filter-select focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">全部商品</option>
            {getUniqueProducts().map(product => (
              <option key={product} value={product}>{product}</option>
            ))}
          </select>
        </label>
      </div>
      
      <div className="overflow-hidden bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table id="orders-table" className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase order-header order-id-header">
                  訂單編號
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase order-header buyer-name-header">
                  買家姓名
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase order-header address-header">
                  地址
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase order-header phone-header">
                  聯絡電話
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase order-header items-header">
                  購買品項
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase order-header order-date-header">
                  購買時間
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase order-header amount-header">
                  金額
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase order-header payment-method-header">
                  付款方式
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase order-header tax-id-header">
                  統一編號
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentOrders.map((order) => (
                <tr key={order.id} className="order-row hover:bg-gray-50" data-order-id={order.id}>
                  <td className="px-6 py-4 text-sm text-gray-900 order-data order-id whitespace-nowrap">
                    #{order.id.toString().padStart(5, '0')}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 order-data buyer-name whitespace-nowrap">
                    {order.buyerName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 order-data address whitespace-nowrap">
                    {order.address}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 order-data phone whitespace-nowrap">
                    {order.phone}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 order-data items whitespace-nowrap">
                    {order.items}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 order-data order-date whitespace-nowrap">
                    {order.orderDate}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 order-data amount whitespace-nowrap">
                    NT$ {order.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 order-data payment-method whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.paymentMethod === '信用卡' 
                        ? 'bg-blue-100 text-blue-800'
                        : order.paymentMethod === '貨到付款'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {order.paymentMethod}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 order-data tax-id whitespace-nowrap">
                    {order.taxId}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <label className="text-sm text-gray-600">
              每頁顯示：
              <select
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="px-3 py-1 ml-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={10}>10 筆</option>
                <option value={20}>20 筆</option>
                <option value={50}>50 筆</option>
              </select>
            </label>
            <div className="text-sm text-gray-600">
              顯示 {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredOrders.length)} 筆，共 {filteredOrders.length} 筆訂單
            </div>
          </div>
          <div className="text-sm text-gray-600">
            總金額：NT$ {filteredOrders.reduce((sum, order) => sum + order.amount, 0).toLocaleString()}
          </div>
        </div>
        
        <div className="flex items-center justify-center space-x-1">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded text-sm ${
              currentPage === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            上一頁
          </button>
          
          {currentPage > 3 && (
            <>
              <button
                onClick={() => handlePageChange(1)}
                className="px-3 py-1 text-sm text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
              >
                1
              </button>
              {currentPage > 4 && <span className="px-2 text-gray-500">...</span>}
            </>
          )}
          
          {getPageNumbers().map(number => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              className={`px-3 py-1 rounded text-sm ${
                currentPage === number
                  ? 'bg-blue-500 text-white'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {number}
            </button>
          ))}
          
          {currentPage < totalPages - 2 && (
            <>
              {currentPage < totalPages - 3 && <span className="px-2 text-gray-500">...</span>}
              <button
                onClick={() => handlePageChange(totalPages)}
                className="px-3 py-1 text-sm text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
              >
                {totalPages}
              </button>
            </>
          )}
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded text-sm ${
              currentPage === totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            下一頁
          </button>
        </div>
      </div>
    </div>
  );
}
