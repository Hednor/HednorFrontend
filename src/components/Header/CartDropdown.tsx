"use client";

import { Popover, Transition } from "@/app/headlessui";
import Prices from "@/components/Prices";
import { Product, PRODUCTS } from "@/data/data";
import { Fragment } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import Image from "next/image";
import Link from "next/link";

export default function CartDropdown() {
  const renderProduct = (item: Product, index: number, close: () => void) => {
    const { name, price, image } = item;
    return (
      <div key={index} className="flex py-5 last:pb-0">
        <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <Image
            fill
            src={image}
            alt={name}
            className="h-full w-full object-contain object-center"
          />
          <Link
            onClick={close}
            className="absolute inset-0"
            href={"/product-detail"}
          />
        </div>

        <div className="ml-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between ">
              <div>
                <h3 className="text-base font-medium ">
                  <Link onClick={close} href={"/product-detail"}>
                    {name}
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  <span>{`Natural`}</span>
                  <span className="mx-2 border-l border-slate-200 dark:border-slate-700 h-4"></span>
                  <span>{"XL"}</span>
                </p>
              </div>
              <Prices price={price} className="mt-0.5" />
            </div>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <p className="text-gray-500 dark:text-slate-400">{`Qty 1`}</p>

            <div className="flex">
              <button
                type="button"
                className="font-medium text-primary-6000 dark:text-primary-500 ">
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Popover className="relative">
      {({ open, close }) => (
        <>
          <Popover.Button
            className={`
                ${open ? "" : "text-opacity-90"}
                 group flex-col w-10 h-10 sm:w-16 sm:h-16 rounded-full inline-flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 relative`}>
            <div>
              <div className="w-3.5 h-3.5 flex items-center justify-center bg-primary-500 absolute sm:top-1.5 right-1 sm:right-3 rounded-full text-[10px] leading-none text-white font-medium">
                <span className="mt-[1px]">3</span>
              </div>
              <div className="h-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
              </div>
            </div>
            <br />
            <p className="text-xs font-medium">Cart</p>

            <Link className="block md:hidden absolute inset-0" href={"/cart"} />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1">
            <Popover.Panel className="hidden md:block absolute z-10 w-screen max-w-xs sm:max-w-md px-4 mt-3.5 -right-28 sm:right-0 sm:px-0">
              <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 dark:ring-white/10">
                <div className="relative bg-white dark:bg-neutral-800">
                  <div className="max-h-[60vh] p-5 overflow-y-auto hiddenScrollbar">
                    <h3 className="text-xl font-semibold">Shopping cart</h3>
                    <div className="divide-y divide-slate-100 dark:divide-slate-700">
                      {[PRODUCTS[0], PRODUCTS[1], PRODUCTS[2]].map(
                        (item, index) => renderProduct(item, index, close)
                      )}
                    </div>
                  </div>
                  <div className="bg-neutral-50 dark:bg-slate-900 p-5">
                    <p className="flex justify-between font-semibold text-slate-900 dark:text-slate-100">
                      <span>
                        <span>Subtotal</span>
                        <span className="block text-sm text-slate-500 dark:text-slate-400 font-normal">
                          Shipping and taxes calculated at checkout.
                        </span>
                      </span>
                      <span className="">₹299.00</span>
                    </p>
                    <div className="flex space-x-2 mt-5">
                      <ButtonSecondary
                        href="/cart"
                        className="flex-1 border border-slate-200 dark:border-slate-700"
                        onClick={close}>
                        View cart
                      </ButtonSecondary>
                      <ButtonPrimary
                        href="/checkout"
                        onClick={close}
                        className="flex-1">
                        Check out
                      </ButtonPrimary>
                    </div>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
