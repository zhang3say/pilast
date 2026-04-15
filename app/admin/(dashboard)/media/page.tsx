'use client';

import { useState, useEffect } from 'react';
import { getMedia, uploadMedia, deleteMedia } from '@/lib/actions';
import Image from 'next/image';

export default function MediaLibrary() {
  const [mediaItems, setMediaItems] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchMedia();
  }, []);

  async function fetchMedia() {
    const items = await getMedia();
    setMediaItems(items);
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    const result = await uploadMedia(formData);
    if (result.success) {
      await fetchMedia();
    } else {
      alert('上传失败');
    }
    setIsUploading(false);
  }

  async function handleDelete(id: number, url: string) {
    if (confirm('确定要删除这个资源吗？这将无法撤回。')) {
      await deleteMedia(id, url);
      await fetchMedia();
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">媒体库</h1>
        <label className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium cursor-pointer transition">
          {isUploading ? '上传中...' : '上传新文件'}
          <input type="file" className="hidden" onChange={handleUpload} disabled={isUploading} />
        </label>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {mediaItems.map((item) => (
          <div key={item.id} className="group relative bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden aspect-square">
            <Image 
              src={item.url} 
              alt={item.filename} 
              fill 
              className="object-cover" 
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
              <button 
                onClick={() => handleDelete(item.id, item.url)}
                className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        ))}
        {mediaItems.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500">
            暂无资源，请点击右上角上传。
          </div>
        )}
      </div>
    </div>
  );
}
