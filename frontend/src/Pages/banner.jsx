import React, { useEffect, useRef, useState } from "react";
import dfd from '../Assets/dfd.jpg';
import dvdf from '../Assets/dvdf.jpg';

const dummyBanners = [
  {
    id: 1,
    title: "Premium One Gram Gold",
    subtitle: "Elegant jewellery for every occasion",
    image:
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d",
  },
  {
    id: 2,
    title: "",
    subtitle: "",
    image:
      dfd,
  },
  {
    id: 3,
    title: "Bridal Collection",
    subtitle: "Luxury that completes you",
    image:
      dvdf,
  },
];

const BannerCarousel = () => {
  const [current, setCurrent] = useState(0);
  const startX = useRef(0);

  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % dummyBanners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  
  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    if (startX.current - endX > 50) {
      setCurrent((prev) => (prev + 1) % dummyBanners.length);
    } else if (endX - startX.current > 50) {
      setCurrent(
        (prev) => (prev - 1 + dummyBanners.length) % dummyBanners.length
      );
    }
  };

  return (
    <div className="relative w-full mt-14 px-4 pt-4 ">
      <div
        className="
          relative w-full
          h-[22vh] sm:h-[26vh] md:h-[70vh]
          rounded-xl overflow-hidden
          shadow-md
        "
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {dummyBanners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${banner.image})` }}
            >
            
              {(banner.title || banner.subtitle) && (
                <div className="absolute inset-0 bg-black/45 flex items-end">
                  <div className="p-4 flex flex-col gap-2 max-w-[80%]">
                    {banner.title && (
                      <h2 className="text-lg sm:text-xl md:text-4xl font-semibold text-yellow-400 leading-tight">
                        {banner.title}
                      </h2>
                    )}

                    {banner.subtitle && (
                      <p className="text-xs sm:text-sm md:text-lg text-gray-200">
                        {banner.subtitle}
                      </p>
                    )}

                    <button
                      className="
                        mt-1
                        w-fit
                        px-4 py-1.5
                        rounded-full
                        bg-yellow-400 text-black
                        text-xs md:text-base
                        font-semibold
                        hover:bg-yellow-500 transition
                      "
                    >
                      Shop Now
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

     
        <div className="absolute bottom-3 right-4 flex gap-2">
          {dummyBanners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-1.5 w-1.5 rounded-full transition ${
                current === index ? "bg-yellow-400 scale-125" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerCarousel;
