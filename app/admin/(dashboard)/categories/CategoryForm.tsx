'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createCategory, updateCategory } from '@/lib/actions';

export default function CategoryForm({ initialData }: { initialData?: { id: number, name: string, remarks?: string } }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    const name = formData.get('name') as string;
    const remarks = formData.get('remarks') as string;
    
    try {
      if (initialData) {
        await updateCategory(initialData.id, name, remarks);
      } else {
        await createCategory(name, remarks);
      }
      router.push('/admin/categories');
    } catch (error) {
      console.error(error);
      alert('保存失败。');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">分类名称 (Category Name)</label>
        <input 
          type="text" 
          name="name" 
          required 
          defaultValue={initialData?.name} 
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
          placeholder="例如: Pilates Reformers"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">备注 (Remarks)</label>
        <textarea 
          name="remarks" 
          rows={3}
          defaultValue={initialData?.remarks} 
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
          placeholder="例如: 该分类下的产品主要用于商用瑜伽馆"
        ></textarea>
      </div>

      <div className="flex justify-end space-x-4">
        <button 
          type="button" 
          onClick={() => router.back()} 
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
        >
          取消
        </button>
        <button 
          type="submit" 
          disabled={isSubmitting} 
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition"
        >
          {isSubmitting ? '保存中...' : '保存分类'}
        </button>
      </div>
    </form>
  );
}
