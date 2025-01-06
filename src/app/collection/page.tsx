"use client"

import React, { FC, useEffect, useState } from "react";
import SectionSliderCollections from "@/components/SectionSliderLargeProduct";
import SectionPromo1 from "@/components/SectionPromo1";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS, SPORT_PRODUCTS } from "@/data/data";
import SidebarFilters from "@/components/SidebarFilters";
import TabFilters from "@/components/TabFilters";
import imageRightPng from "@/images/hero-right-banner-1.jpg";
import Image from "next/image";
import { useFilterStore } from "@/store/Products";
import PaginationSection from "@/components/PaginationSection/PaginationSection";

const PageCollection = ({ }) => {

  // const { filterProduct } = UserState();

  const filterProduct = useFilterStore((state) => state.filterProduct);



  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 9;

  // Calculate the current products to display
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filterProduct.concat(SPORT_PRODUCTS).slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );



  const totalPages = Math.ceil(filterProduct.concat(SPORT_PRODUCTS).length / productsPerPage);


  console.log(`This is Total Products`, totalPages);

  // Handle pagination
  const handlePageChange = (page: number): void => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };


  console.log(`this is Product`, filterProduct.concat(SPORT_PRODUCTS))
  return (
    <div className={`nc-PageCollection`}>
      <div className="container py-10 lg:pb-28 lg:pt-20 space-y-16 sm:space-y-20 lg:space-y-28">
        <div className="space-y-10 lg:space-y-14">
          {/* HEADING */}
          <div className="max-w-screen-sm">
            <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
              Man collection
            </h2>
            {/* <Image
              src={imageRightPng}
              alt="collection"
              width={1260}
              height={750}
              className="w-full rounded-xl object-fill"
            /> */}
            <span className="block mt-4 text-neutral-500 dark:text-neutral-400 text-sm sm:text-base">
              We not only help you design exceptional products, but also make it
              easy for you to share your designs with more like-minded people.
            </span>
          </div>

          <hr className="border-slate-200 dark:border-slate-700" />
          <main>
            {/* LOOP ITEMS */}
            <TabFilters />
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/3 xl:w-1/4 pr-4 hidden lg:block">
                <SidebarFilters />
              </div>
              <div className="flex-shrink-0 mb-10 lg:mb-0 lg:mx-4 border-t lg:border-t-0"></div>
              <div className="flex-1 ">
                <div className="flex-1 grid grid-cols-2 xl:grid-cols-3 gap-x-2 gap-y-4 lg:gap-x-8 lg:gap-y-10 ">
                  {currentProducts.map((item, index) => (
                    <ProductCard data={item} key={index} />
                  ))}
                </div>
                <div className="w-full ">
                  <PaginationSection
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              </div>
            </div>
          </main>
        </div>

        {/* === SECTION 5 === */}
        <hr className="border-slate-200 dark:border-slate-700" />

        <SectionSliderCollections />
        <hr className="border-slate-200 dark:border-slate-700" />

        {/* SUBCRIBES */}
        <SectionPromo1 />
      </div>
    </div>
  );
};

export default PageCollection;
