import CategoryForm from '../CategoryForm';
import { getCategoryById } from '@/lib/actions';
import { notFound } from 'next/navigation';

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const category = await getCategoryById(parseInt(id));

  if (!category) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">编辑分类</h1>
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
        <CategoryForm initialData={category} />
      </div>
    </div>
  );
}
