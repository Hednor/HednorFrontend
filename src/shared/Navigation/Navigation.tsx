// import React from "react";
// import NavigationItem from "./NavigationItem";
// import { NAVIGATION_DEMO_2 } from "@/data/navigation";

// function Navigation() {
//   return (
//     <ul className="nc-Navigation flex items-center w-full justify-center gap-x-8 bg-gradient-to-r from-[#F0C27B] via-[#FFD700] to-[#FFB347] ">
//       {NAVIGATION_DEMO_2.map((item) => (
//         <NavigationItem key={item.id} menuItem={item} />
//       ))}
//     </ul>
//   );
// }

// export default Navigation;

// Navigation.tsx
// import React, { useState } from "react";
// import NavigationItem from "./NavigationItem";
// import { NAVIGATION_DEMO_2 } from "@/data/navigation";

// const Navigation = () => {
//   const [activeIndex, setActiveIndex] = useState<number | null>(null); // Track active index

//   const handleClick = (index: number) => {
//     setActiveIndex(index); // Set the active item index
//   };

//   return (
//     <ul className="nc-Navigation flex items-center w-full justify-center gap-x-8 bg-gradient-to-r from-black via-gray-700 to-gray-500 ">
//       {NAVIGATION_DEMO_2.map((item, index) => (
//         <li
//           key={item.id}
//           className={`cursor-pointer ${activeIndex === index ? "text-red-500" : ""}`} // Apply underline if active
//           onClick={() => handleClick(index)} // Handle click event
//         >
//           <NavigationItem menuItem={item} />
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default Navigation;

import React, { useState } from "react";
import NavigationItem from "./NavigationItem";
import { NAVIGATION_DEMO_2 } from "@/data/navigation";

const Navigation = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null); // Track active index

  const handleClick = (index: number) => {
    setActiveIndex(index); // Set the active item index
  };

  return (
    // <ul className="nc-Navigation flex items-center w-full justify-center gap-x-8 bg-gradient-to-r from-black via-gray-700 to-gray-500">
    <ul style={{ backgroundColor: 'rgba(237, 198, 79, 1)' }} className="nc-Navigation flex items-center w-full justify-center gap-x-8 ">

      {NAVIGATION_DEMO_2.map((item, index) => (
        <li
          key={item.id}
         
          onClick={() => handleClick(index)} // Handle click event
        >
          <NavigationItem menuItem={item} />
        </li>
      ))}
    </ul>
  );
};

export default Navigation;
