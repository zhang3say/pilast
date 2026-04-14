import ProductForm from '../ProductForm';
import { getProductById } from '@/lib/actions';
import { notFound } from 'next/navigation';

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProductById(parseInt(id));

  if (!product) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">编辑产品</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <ProductForm initialData={product} />
      </div>
    </div>
  );
}
