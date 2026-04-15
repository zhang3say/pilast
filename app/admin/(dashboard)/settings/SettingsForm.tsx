'use client';

import { useState } from 'react';
import { updateSettingsWithLogo } from '@/lib/actions';
import Image from 'next/image';

export default function SettingsForm({ initialData }: { initialData: Record<string, string> }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [preview, setPreview] = useState(initialData.site_logo || '');

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setMessage('');
    try {
      await updateSettingsWithLogo(formData);
      setMessage('设置已保存成功！');
    } catch (error) {
      console.error(error);
      setMessage('保存失败，请重试。');
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      {message && (
        <div className={`p-4 rounded-md ${message.includes('成功') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          {message}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">网站名称 (Site Name)</label>
        <input type="text" name="site_name" defaultValue={initialData.site_name} className="w-full px-4 py-2 border border-gray-300 rounded-md" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">网站Logo (Site Logo)</label>
        {preview && (
          <div className="mb-4">
            <Image src={preview} alt="Logo Preview" width={150} height={40} className="object-contain h-10 w-auto bg-gray-100 p-2 rounded" />
          </div>
        )}
        <input 
          type="file" 
          name="site_logo_file" 
          accept="image/*" 
          onChange={handleFileChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md" 
        />
        <p className="text-sm text-gray-500 mt-1">上传新的Logo图片将覆盖现有Logo。留空则保持不变。</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">电话 (Phone)</label>
        <input type="text" name="phone" defaultValue={initialData.phone} className="w-full px-4 py-2 border border-gray-300 rounded-md" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
        <input type="text" name="whatsapp" defaultValue={initialData.whatsapp} className="w-full px-4 py-2 border border-gray-300 rounded-md" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">电子邮箱 (Email)</label>
        <input type="email" name="email" defaultValue={initialData.email} className="w-full px-4 py-2 border border-gray-300 rounded-md" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">公司地址 (Address)</label>
        <textarea name="address" rows={3} defaultValue={initialData.address} className="w-full px-4 py-2 border border-gray-300 rounded-md"></textarea>
      </div>

      <div className="pt-6 border-t border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">SEO 优化设置 (SEO Settings)</h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">站点生产域名 Base URL <span className="text-gray-400 text-xs">(用于 Canonical 及 Sitemap，结尾不带斜杠)</span></label>
            <input type="url" name="seo_base_url" placeholder="https://www.pilast.com" defaultValue={initialData.seo_base_url} className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm font-mono" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">全局 SEO 标题后缀 (Title Suffix)</label>
            <input type="text" name="seo_title_suffix" placeholder=" | Pilast - Professional Pilates Equipment" defaultValue={initialData.seo_title_suffix} className="w-full px-4 py-2 border border-gray-300 rounded-md" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">全局 SEO 关键词 (Default Meta Keywords) <span className="text-gray-400 text-xs">(用英文逗号分隔)</span></label>
            <input type="text" name="seo_keywords" placeholder="Commercial Pilates Reformer, Wholesale Pilates Equipment, Home Pilates Machines" defaultValue={initialData.seo_keywords} className="w-full px-4 py-2 border border-gray-300 rounded-md" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">全局 SEO 描述 (Default Meta Description)</label>
            <textarea name="seo_description" rows={3} placeholder="Full Range of Commercial & Home Pilates Machines | Factory Direct | CE Certified | On-Time Delivery" defaultValue={initialData.seo_description} className="w-full px-4 py-2 border border-gray-300 rounded-md"></textarea>
          </div>
        </div>
      </div>

      <div>
        <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50">
          {isSubmitting ? '保存中...' : '保存设置'}
        </button>
      </div>
    </form>
  );
}
