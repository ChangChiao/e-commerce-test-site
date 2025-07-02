export default function Welcome() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">歡迎來到電商後台管理系統</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">系統功能</h2>
          <ul className="space-y-2 text-gray-600">
            <li>• 使用者管理：新增、修改、刪除使用者</li>
            <li>• 訂單查詢：查看所有訂單詳細資訊</li>
            <li>• 即時資料更新</li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">快速統計</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">總訂單數：</span>
              <span className="font-semibold">20</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">使用者數：</span>
              <span className="font-semibold">5</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">今日訂單：</span>
              <span className="font-semibold">3</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">提示</h3>
        <p className="text-blue-700">
          使用左側選單導航到不同功能頁面。本系統為模擬資料，不連接真實 API。
        </p>
      </div>
    </div>
  );
}