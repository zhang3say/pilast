import { getInquiries } from '@/lib/actions';

export default async function AdminInquiries() {
  const inquiries = await getInquiries();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">询盘记录</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">时间</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">联系人</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">意向产品</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">详情</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {inquiries.map((inquiry) => (
              <tr key={inquiry.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(inquiry.created_at).toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{inquiry.name}</div>
                  <div className="text-sm text-gray-500">{inquiry.email}</div>
                  {inquiry.company && <div className="text-xs text-gray-400">{inquiry.company}</div>}
                  {inquiry.country && <div className="text-xs text-gray-400">{inquiry.country}</div>}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{inquiry.product_interested || '-'}</div>
                  <div className="text-sm text-gray-500">数量: {inquiry.quantity || '-'}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                  {inquiry.message || '-'}
                </td>
              </tr>
            ))}
            {inquiries.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">暂无询盘记录</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
