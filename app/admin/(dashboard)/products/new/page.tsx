import ProductForm from '../ProductForm';
import { getCategories } from '@/lib/actions';

export default async function NewProductPage() {
  const categories = await getCategories();
  
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">添加新产品</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <ProductForm categories={categories} />
      </div>
    </div>
  );
}
