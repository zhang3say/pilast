'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProduct, updateProduct } from '@/lib/actions';

export default function ProductForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    try {
      const data = {
        name: formData.get('name'),
        slug: formData.get('slug'),
        category: formData.get('category'),
        overview: formData.get('overview'),
        features: formData.get('features'),
        parameters: formData.get('parameters'),
        image_url: formData.get('image_url'),
      };

      if (initialData) {
        await updateProduct(initialData.id, data);
      } else {
        await createProduct(data);
      }
      router.push('/admin/products');
    } catch (error) {
      console.error(error);
      alert('保存失败，请检查Slug是否重复。');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">产品名称 (Name)</label>
          <input type="text" name="name" required defaultValue={initialData?.name} className="w-full px-4 py-2 border border-gray-300 rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">URL别名 (Slug) - 必须唯一</label>
          <input type="text" name="slug" required defaultValue={initialData?.slug} className="w-full px-4 py-2 border border-gray-300 rounded-md" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">分类 (Category)</label>
          <input type="text" name="category" required defaultValue={initialData?.category} className="w-full px-4 py-2 border border-gray-300 rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">图片URL (Image URL)</label>
          <input type="text" name="image_url" defaultValue={initialData?.image_url} className="w-full px-4 py-2 border border-gray-300 rounded-md" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">产品概述 (Overview)</label>
        <textarea name="overview" rows={4} defaultValue={initialData?.overview} className="w-full px-4 py-2 border border-gray-300 rounded-md"></textarea>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">产品特点 (Features) - 每行一个</label>
        <textarea name="features" rows={6} defaultValue={initialData?.features} className="w-full px-4 py-2 border border-gray-300 rounded-md"></textarea>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">产品参数 (Parameters) - 格式: &quot;属性: 值&quot;, 每行一个</label>
        <textarea name="parameters" rows={6} defaultValue={initialData?.parameters} className="w-full px-4 py-2 border border-gray-300 rounded-md"></textarea>
      </div>

      <div className="flex justify-end space-x-4">
        <button type="button" onClick={() => router.back()} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
          取消
        </button>
        <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50">
          {isSubmitting ? '保存中...' : '保存'}
        </button>
      </div>
    </form>
  );
}
