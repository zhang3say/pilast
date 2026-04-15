import CategoryForm from '../CategoryForm';

export default function NewCategoryPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">添加新分类</h1>
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
        <CategoryForm />
      </div>
    </div>
  );
}
