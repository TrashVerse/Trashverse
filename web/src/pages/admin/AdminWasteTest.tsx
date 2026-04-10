import AdminLayout from '../../components/AdminLayout';

export default function AdminWasteTest() {
  return (
    <AdminLayout>
      <div className="p-8 bg-white rounded-lg shadow">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          ✅ Admin Waste Page is Loading!
        </h1>
        <p className="text-gray-700 mb-4">
          If you can see this message, the routing and AdminLayout are working correctly.
        </p>
        <div className="bg-blue-50 border border-blue-200 p-4 rounded">
          <p className="text-sm text-blue-800">
            <strong>Test successful!</strong> The issue is likely with the data loading, not the routing.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}
