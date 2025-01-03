import { PRODUCTS } from "@/data/data";
import { create } from "zustand";
import { Product } from "@/data/data";

// interface ProductVariant {
//   id: number;
//   name: string;
//   thumbnail: string;
//   featuredImage: string;
// }

// interface Product {
//   id: number;
//   name: string;
//   price: number;
//   category: string;
//   tags: string[];
//   sizes?: string[];
//   description?: string;
//   image: string;
//   link?: string;
//   variants?: ProductVariant[];
//   variantType?: string;
//   allOfSizes?: string[];
//   status?: string;
//   rating?: string;
//   numberOfReviews?: number;
// }

interface FilterState {
  isOnSale: boolean;
  rangePrices: number[];
  categoriesState: string[];
  colorsState: string[];
  sizesState: string[];
  sortOrderStates: string;
  filterProduct: Product[];
  sortByRating: string;

  setIsOnSale: (value: boolean) => void;
  setRangePrices: (value: number[]) => void;
  setCategoriesState: (value: string[]) => void;
  setColorsState: (value: string[]) => void;
  setSizesState: (value: string[]) => void;
  setSortOrderStates: (value: string) => void;
  filterData: () => void;
  setSortByRating: (value: string) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  isOnSale: true,
  rangePrices: [0, 250],
  categoriesState: [],
  colorsState: [],
  sizesState: [],
  sortOrderStates: "",
  filterProduct: PRODUCTS,
  sortByRating: "",

  setIsOnSale: (value: boolean) => set({ isOnSale: value }),
  setRangePrices: (value: number[]) => set({ rangePrices: value }),
  setCategoriesState: (value: string[]) => set({ categoriesState: value }),
  setColorsState: (value: string[]) => set({ colorsState: value }),
  setSizesState: (value: string[]) => set({ sizesState: value }),
  setSortOrderStates: (value: string) => set({ sortOrderStates: value }),
  setSortByRating: (value: string) => set({ sortByRating: value }),

  filterData: () =>
    set((state) => {
      let filtered = PRODUCTS;

      // Filter by price range
      filtered = filtered.filter(
        (item) =>
          item.price >= state.rangePrices[0] &&
          item.price <= state.rangePrices[1]
      );

      // Filter by categories
      if (state.categoriesState.length > 0) {
        filtered = filtered.filter((item) =>
          state.categoriesState.includes(item.category)
        );
      }

      // Filter by colors (tags)
      if (state.colorsState.length > 0) {
        filtered = filtered.filter((item) =>
          item.tags.some((tag) => state.colorsState.includes(tag))
        );
      }

      // Filter by sizes
      if (state.sizesState.length > 0) {
        filtered = filtered.filter(
          (item) =>
            Array.isArray(item.sizes) &&
            item.sizes.some((size) => state.sizesState.includes(size))
        );
      }

      // Sort By New Arrival amd Most Popular
      if (state.sortOrderStates) {
        if (state.sortOrderStates === "Newest") {
          filtered = filtered.filter((item) => item.status === "Newest");
        } else if (state.sortOrderStates === "Most-Popular") {
          filtered = filtered.filter((item) => item.status === "Most Popular");
        }
      }

      // Sort By Rating
      if (state.sortOrderStates) {
        filtered = filtered.sort(
          (a, b) => parseFloat(b.rating || "0") - parseFloat(a.rating || "0")
        );
      }

      // Sort by selected order
      if (state.sortOrderStates) {
        if (state.sortOrderStates === "Price-low-hight") {
          filtered = filtered.sort((a, b) => a.price - b.price); // Low to High
        } else if (state.sortOrderStates === "Price-hight-low") {
          filtered = filtered.sort((a, b) => b.price - a.price); // High to Low
        }
      }

      return { filterProduct: filtered };
    }),
}));
