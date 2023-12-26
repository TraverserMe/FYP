import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Slider({items}) {
  const [displayItems, setDisplayItems] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Randomly select 5 items once when the component is mounted
  useEffect(() => {
    if (items.length > 5) {
      let randomItems = [];
      let indices = new Set();
      while (indices.size < 5) {
        indices.add(Math.floor(Math.random() * items.length));
      }
      indices.forEach(i => randomItems.push(items[i]));
      setDisplayItems(randomItems);
    } else {
      setDisplayItems(items);
    }
  }, [items]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((activeIndex + 1) % displayItems.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [activeIndex, displayItems.length]);

  const handlePrev = () => {
    setActiveIndex((activeIndex - 1 + displayItems.length) % displayItems.length);
  };

  const handleNext = () => {
    setActiveIndex((activeIndex + 1) % displayItems.length);
  };

  return (
    <>
      <div id="default-carousel" className="relative w-full">
        <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
          {displayItems.map((item, i) => (
            <div key={i} className={i === activeIndex ? 'block duration-700 ease-in-out' : 'hidden'} data-carousel-item>
                <Link href={`/item/${item.id}`}>                
                    <Image
                        src={`https://ipfs.io/ipfs/${item.image}`}
                        alt={item.name}
                        width='0'
                        height='0'
                        sizes="50vw"
                        className="w-auto h-96 mx-auto"
                        priority={true}
                    />
                </Link>
            </div>
          ))}
        </div>
        <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" onClick={handlePrev}>
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>
        <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" onClick={handleNext}>
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg className="w-4 h-4 text-white dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1l4 4-4 4"/>
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>
    </>
  );
}

