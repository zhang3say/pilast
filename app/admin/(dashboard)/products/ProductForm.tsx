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
        image_url: selectedImages[0] || '',
        images: JSON.stringify(selectedImages),
        details_html: detailsHtml,
        seo_keywords: formData.get('seo_keywords'),
        seo_description: formData.get('seo_description'),
      };

      if (initialData) {
        await updateProduct(initialData.id, data);
      } else {
        await createProduct(data);
      }
      router.push('/admin/products');
    } catch (error) {
      console.error(error);
      alert('保存失败，请检查输入内容或 Slug 是否已被其他产品使用。');
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

      {/* SEO Settings */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8 font-sans">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          高级 SEO 优化 (SEO & Search)
        </h2>
        <p className="text-sm text-gray-500 mb-4">自定义此产品的 SEO 关键词和描述片断，有助于提高 Google 在该独立品类上的收录率。如留空，将自动使用网站全局默认配置。</p>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">SEO 专属关键词 (Meta Keywords)</label>
            <input 
              type="text" 
              name="seo_keywords" 
              defaultValue={initialData?.seo_keywords || ''}
              placeholder="例如: Foldable Pilates Reformer, Aluminum Pilates Bed"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition" 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">SEO 搜索短描 (Meta Description)</label>
            <textarea 
              name="seo_description" 
              rows={3} 
              defaultValue={initialData?.seo_description || ''}
              placeholder="建议用150字概况提炼这个产品的核心卖点（如用什么材质，什么认证），显示在Google搜索结果下方。"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition line-clamp-3"
            ></textarea>
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
