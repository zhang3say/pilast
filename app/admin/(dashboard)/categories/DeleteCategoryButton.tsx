'use client';

import { deleteCategory } from '@/lib/actions';

export default function DeleteCategoryButton({ id }: { id: number }) {
  async function action() {
    if (confirm('确定要删除这个分类吗？这不会删除关联的产品，但产品分类可能会显示不正确。')) {
      await deleteCategory(id);
    }
  }

  return (
    <form action={action} className="inline-block">
      <button 
        type="submit" 
        className="text-red-600 hover:text-red-900 font-semibold"
      >
        删除
      </button>
    </form>
  );
}
