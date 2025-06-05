// import Image from 'next/image'
// import React from 'react'

// const HeroSection = () => {
//   return (
//     <div>
//       <main
//     className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-0 mt-12 md:mt-20 relative z-10"
//   >
//     <section className="md:w-1/2 flex flex-col items-start">
//       <h1
//         className="text-orange-500 font-extrabold text-3xl md:text-4xl leading-tight mb-4 max-w-xs md:max-w-sm"
//       >
//         Keto Snack Shouldn’t Be So Hard
//       </h1>
//       <p className="text-black text-xs md:text-sm font-normal mb-6 max-w-xs md:max-w-sm">
//         Keto Bars may melt a bit in transit, especially if you live in a warmer
//         climate. This happens because we don’t use any gums or filler
//         ingredients like dextrin or inulin.
//       </p>
//       <button
//         className="bg-black text-white text-xs md:text-sm font-normal px-6 py-2 rounded shadow-md hover:shadow-lg transition-shadow duration-300"
//       >
//         Learn More
//       </button>
//     </section>
//     <section
//       className="md:w-1/2 relative flex justify-center md:justify-end items-center"
//     >
//      <Image
//       src="/product_1.png"
//       width={500}
//       height={500}
//       alt="Picture of the author"
//     />
//     <Image
//       src="/product_2.png"
//       width={500}
//       height={500}
//       alt="Picture of the author"
//     />
//     <Image
//       src="/product_3.png"
//       width={500}
//       height={500}
//       alt="Picture of the author"
//     />
//     </section>
//     </main>
//     </div>
//   )
// }

// export default HeroSection

"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative bg-white overflow-hidden">
         <div aria-hidden="true" className="wave-lines-container">
    <div className="wave-line"></div>
    <div className="wave-line"></div>
    <div className="wave-line"></div>
    <div className="wave-line"></div>
    <div className="wave-line"></div>
    <div className="wave-line"></div>
    <div className="wave-line"></div>
    <div className="wave-line"></div>
    <div className="wave-line"></div>
    <div className="wave-line"></div>
  </div>
      <div className="container mx-auto px-6 py-20 flex flex-col md:flex-row items-center">
        {/* Text */}
        <div className="w-full md:w-1/2 mb-12 md:mb-0">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            <span className="text-orange-500">Banibaizabeh Snack</span> <br />
            <span>Shouldn’t Be So Hard</span>
          </h1>
          <p className="text-gray-600 mb-6">
            Keto Bars may melt a bit in transit, especially if you live in a
            warmer climate. This happens because we dont use any gums or filler
            ingredients like dextrin or inulin.
          </p>
          <button className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition">
            Learn More
          </button>
        </div>

        {/* Image */}
        <div className="w-full md:w-1/2 flex justify-center relative h-[220px]">
          {/* Kartu 1 */}
          <div className="absolute left-1/2 -translate-x-[120%] rotate-[-10deg] z-10 overflow-hidden">
            <Image
              src="/product_1_copy.png"
              alt="Keto Bar 1"
              width={200}
              height={270}
              className="object-contain"
            />
          </div>

          {/* Kartu 2 (paling depan) */}
          <div className="absolute left-1/2 -translate-x-1/2 rotate-0 z-20 overflow-hidden">
            <Image
              src="/product_2_copy.png"
              alt="banibaizebeh 1"
              width={200}
              height={270}
              className="object-contain"
            />
          </div>

          {/* Kartu 3 */}
          <div className="absolute left-1/2 -translate-x-[-20%] rotate-[10deg] z-10 overflow-hidden">
            <Image
              src="/product_3_copy.png"
              alt="banibaizebeh 3"
               width={200}
               height={270}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
