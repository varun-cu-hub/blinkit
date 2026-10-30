import React from 'react';
import { CATEGORIES } from '../data/mockData';

interface CategoryNavProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  selectedCategory,
  onSelectCategory
}) => {
  return (
    <nav aria-label="Explore product categories" className="bg-white border-b border-neutral-100 px-3 py-2.5 shadow-2xs">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-xs font-extrabold text-neutral-900">Explore Categories</h2>
        <span className="text-[10px] font-semibold text-neutral-500">Browse all products</span>
      </div>
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-0.5">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              aria-pressed={isSelected}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
