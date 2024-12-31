import { PRODUCTS } from '@/data/data';
import {create} from 'zustand';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  tags: string[];
  sizes?: string[];
}

interface FilterState {
  isOnSale: boolean;
  rangePrices: number[];
  categoriesState: string[];
  colorsState: string[];
  sizesState: string[];
  sortOrderStates: string;
  filterProduct: Product[];
  setIsOnSale: (value: boolean) => void;
  setRangePrices: (value: number[]) => void;
  setCategoriesState: (value: string[]) => void;
  setColorsState: (value: string[]) => void;
  setSizesState: (value: string[]) => void;
  setSortOrderStates: (value: string) => void;
  filterData: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  isOnSale: true,
  rangePrices: [0, 200],
  categoriesState: [],
  colorsState: [],
  sizesState: [],
  sortOrderStates: '',
  filterProduct: PRODUCTS,
  setIsOnSale: (value:boolean) => set({ isOnSale: value }),
  setRangePrices: (value:number[]) => set({ rangePrices: value }),
  setCategoriesState: (value:string[]) => set({ categoriesState: value }),
  setColorsState: (value:string[]) => set({ colorsState: value }),
  setSizesState: (value:string[]) => set({ sizesState: value }),
  setSortOrderStates: (value:any) => set({ sortOrderStates: value }),
  filterData: () => set((state:any) => {
    let filtered = PRODUCTS;

    // Filter by price range
    filtered = filtered.filter(item =>
      item.price >= state.rangePrices[0] && item.price <= state.rangePrices[1]
    );

    // Filter by categories
    if (state.categoriesState.length > 0) {
      filtered = filtered.filter(item =>
        state.categoriesState.includes(item.category)
      );
    }

    // Filter by colors
    if (state.colorsState.length > 0) {
      filtered = filtered.filter(item =>
        item.tags.some(tag => state.colorsState.includes(tag))
      );
    }

    // Filter by sizes
    if (state.sizesState.length > 0) {
  filtered = filtered.filter(item =>
    Array.isArray(item.sizes) && item.sizes.some(size => state.sizesState.includes(size))
  );
}

    // Sort by selected order
    if (state.sortOrderStates) {
      if (state.sortOrderStates === 'price-asc') {
        filtered = filtered.sort((a, b) => a.price - b.price);
      } else if (state.sortOrderStates === 'price-desc') {
        filtered = filtered.sort((a, b) => b.price - a.price);
      }
    }

    return { filterProduct: filtered };
  }),
}));
