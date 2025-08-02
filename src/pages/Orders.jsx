import { useState, useEffect } from 'react';

export default function Orders() {
  const [orders, setOrders] = useState([]);

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
      
      for (let i = 1; i <= 20; i++) {
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

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">訂單查詢</h1>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table id="orders-table" className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="order-header order-id-header px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  訂單編號
                </th>
                <th className="order-header buyer-name-header px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  買家姓名
                </th>
                <th className="order-header address-header px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  地址
                </th>
                <th className="order-header phone-header px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  聯絡電話
                </th>
                <th className="order-header items-header px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  購買品項
                </th>
                <th className="order-header order-date-header px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  購買時間
                </th>
                <th className="order-header amount-header px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  金額
                </th>
                <th className="order-header payment-method-header px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  付款方式
                </th>
                <th className="order-header tax-id-header px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  統一編號
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="order-row hover:bg-gray-50" data-order-id={order.id}>
                  <td className="order-data order-id px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    #{order.id.toString().padStart(5, '0')}
                  </td>
                  <td className="order-data buyer-name px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.buyerName}
                  </td>
                  <td className="order-data address px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.address}
                  </td>
                  <td className="order-data phone px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.phone}
                  </td>
                  <td className="order-data items px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.items}
                  </td>
                  <td className="order-data order-date px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.orderDate}
                  </td>
                  <td className="order-data amount px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    NT$ {order.amount.toLocaleString()}
                  </td>
                  <td className="order-data payment-method px-6 py-4 whitespace-nowrap text-sm text-gray-900">
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
                  <td className="order-data tax-id px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.taxId}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="mt-6 flex justify-between items-center text-sm text-gray-600">
        <div>
          顯示 1-20 筆，共 20 筆訂單
        </div>
        <div className="text-right">
          總金額：NT$ {orders.reduce((sum, order) => sum + order.amount, 0).toLocaleString()}
        </div>
      </div>
    </div>
  );
}