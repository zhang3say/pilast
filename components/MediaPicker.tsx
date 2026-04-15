'use client';

import { useState, useEffect } from 'react';
import { getMedia, uploadMedia } from '@/lib/actions';
import Image from 'next/image';

interface MediaPickerProps {
  selectedUrls: string[];
  onChange: (urls: string[]) => void;
  multiple?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function MediaPicker({ 
  selectedUrls, 
  onChange, 
  multiple = true,
  isOpen: externalIsOpen,
  onClose
}: MediaPickerProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const setIsOpen = (val: boolean) => {
    if (onClose && !val) onClose();
    setInternalIsOpen(val);
  };
  const [mediaItems, setMediaItems] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchMedia();
    }
  }, [isOpen]);

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
    if (result.success && result.url) {
      if (multiple) {
        onChange([...selectedUrls, result.url]);
      } else {
        onChange([result.url]);
        setIsOpen(false);
      }
      await fetchMedia();
    }
    setIsUploading(false);
  }

  const toggleSelect = (url: string) => {
    if (multiple) {
      if (selectedUrls.includes(url)) {
        onChange(selectedUrls.filter(u => u !== url));
      } else {
        onChange([...selectedUrls, url]);
      }
    } else {
      onChange([url]);
      setIsOpen(false);
    }
  };

  const removeImage = (url: string) => {
    onChange(selectedUrls.filter(u => u !== url));
  };

  return (
    <div>
      {!externalIsOpen && (
        <div className="flex flex-wrap gap-4 mb-4 font-sans">
          {selectedUrls.map((url, index) => (
            <div key={index} className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200 group">
              <Image src={url} alt="Selected" fill className="object-cover" />
              <button 
                type="button"
                onClick={() => removeImage(url)}
                className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ))}
          <button 
            type="button"
            onClick={() => setIsOpen(true)}
            className="w-24 h-24 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:text-blue-500 transition text-gray-400"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="text-xs">添加图片</span>
          </button>
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-75 p-4 sm:p-8">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-full flex flex-col overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">选择媒体资源</h3>
              <div className="flex gap-4">
                <label className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium cursor-pointer">
                  {isUploading ? '正在上传...' : '上传新资源'}
                  <input type="file" className="hidden" onChange={handleUpload} disabled={isUploading} />
                </label>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="flex-1 p-6 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {mediaItems.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => toggleSelect(item.url)}
                  className={`relative aspect-square cursor-pointer rounded-lg overflow-hidden border-2 transition ${selectedUrls.includes(item.url) ? 'border-blue-600' : 'border-transparent'}`}
                >
                  <Image src={item.url} alt={item.filename} fill className="object-cover" />
                  {selectedUrls.includes(item.url) && (
                    <div className="absolute top-2 right-2 bg-blue-600 text-white rounded-full p-1 shadow-md">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
              {mediaItems.length === 0 && (
                <div className="col-span-full py-12 text-center text-gray-500">
                  媒体库为空，请先上传资源。
                </div>
              )}
            </div>

            <div className="p-4 border-t border-gray-200 flex justify-end">
              <button 
                onClick={() => setIsOpen(false)}
                className="bg-gray-900 text-white px-6 py-2 rounded-md font-medium hover:bg-gray-800"
              >
                确定 ({selectedUrls.length} 已选)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
