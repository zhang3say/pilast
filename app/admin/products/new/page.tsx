import ProductForm from '../ProductForm';

export default function NewProductPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">添加新产品</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <ProductForm />
      </div>
    </div>
  );
}
