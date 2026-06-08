import { useState, useRef } from "react";

const BlogCarousel = ({ images, title }: { images: string[]; title: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const nextSlide = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Mobile Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      // Swiped Left -> Next Slide
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }
    if (touchStartX.current - touchEndX.current < -50) {
      // Swiped Right -> Previous Slide
      setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }
  };

  return (
    <div 
      className="relative w-full aspect-video bg-stone-100 border-b border-stone-100 overflow-hidden group"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Images Track wrapper */}
      <div 
        className="w-full h-full flex transition-transform duration-300 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((imgUrl, index) => (
          <div key={index} className="w-full h-full flex-shrink-0 relative">
            <img
              src={imgUrl}
              alt={`${title} view ${index + 1}`}
              className="w-full h-full object-cover select-none"
              draggable="false"
            />
          </div>
        ))}
      </div>

      {/* Navigation Buttons (Visible always on mobile, reveal on hover for desktop) */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white w-7 h-7 rounded-full flex items-center justify-center text-xs backdrop-blur-sm transition-all md:opacity-0 md:group-hover:opacity-100 z-10"
            aria-label="Previous image"
          >
            &#10094;
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white w-7 h-7 rounded-full flex items-center justify-center text-xs backdrop-blur-sm transition-all md:opacity-0 md:group-hover:opacity-100 z-10"
            aria-label="Next image"
          >
            &#10095;
          </button>
        </>
      )}

      {/* Navigation Indicators (...) at Bottom Center */}
      {images.length > 1 && (
        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => { e.preventDefault(); setCurrentIndex(index); }}
              className={`h-1.5 rounded-full transition-all duration-200 ${
                currentIndex === index ? "w-4 bg-orange-500" : "w-1.5 bg-white/60 hover:bg-white"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogCarousel;