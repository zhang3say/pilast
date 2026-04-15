'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProduct, updateProduct } from '@/lib/actions';
import MediaPicker from '@/components/MediaPicker';
import RichTextEditor from '@/components/RichTextEditor';

export default function ProductForm({ initialData, categories = [] }: { initialData?: any, categories?: string[] }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [selectedImages, setSelectedImages] = useState<string[]>(() => {
    if (initialData?.images && initialData.images !== '[]') {
      try {
        return JSON.parse(initialData.images);
      } catch (e) {}
    }
    return initialData?.image_url ? [initialData.image_url] : [];
  });
  
  const [detailsHtml, setDetailsHtml] = useState(initialData?.details_html || '');

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
        image_url: selectedImages[0] || '', // Maintain compatibility
        images: JSON.stringify(selectedImages),
        details_html: detailsHtml,
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
    <form action={handleSubmit} className="space-y-8 max-w-5xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-4">基本信息</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">产品名称 (Name)</label>
            <input type="text" name="name" required defaultValue={initialData?.name} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">URL别名 (Slug) - 必须唯一</label>
            <input type="text" name="slug" required defaultValue={initialData?.slug} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">分类 (Category)</label>
            <select name="category" required defaultValue={initialData?.category || ''} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
              <option value="" disabled>选择分类</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-4">产品媒体 (Images)</h2>
        <MediaPicker selectedUrls={selectedImages} onChange={setSelectedImages} />
        <p className="text-sm text-gray-500 mt-2">第一张图片将作为缩略图展示。</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-4">产品详情 (Rich Text)</h2>
        <RichTextEditor content={detailsHtml} onChange={setDetailsHtml} />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-4">规格参数</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">产品简述 (Overview)</label>
            <textarea name="overview" rows={3} defaultValue={initialData?.overview} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">产品特点 (Features) - 每行一个</label>
              <textarea name="features" rows={8} defaultValue={initialData?.features} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">产品参数 (Parameters) - 格式: &quot;属性: 值&quot;, 每行一个</label>
              <textarea name="parameters" rows={8} defaultValue={initialData?.parameters} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"></textarea>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4 sticky bottom-8 bg-white/80 backdrop-blur p-4 rounded-lg shadow-lg border border-gray-200 z-10">
        <button type="button" onClick={() => router.back()} className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium">
          取消
        </button>
        <button type="submit" disabled={isSubmitting} className="px-8 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 font-bold shadow-md">
          {isSubmitting ? '正在保存...' : '保存产品信息'}
        </button>
      </div>
    </form>
  );
}
