"use client";
import React, { useState } from 'react';

interface BlogCarouselProps {
    images: string[];
    title: string;
}

const BlogCarousel = ({ images, title }: BlogCarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const hasMultipleImages = images.length > 1;

    const handlePrev = (e: React.MouseEvent) => {
        e.preventDefault(); // Stop click from bubbling up to link anchors
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = (e: React.MouseEvent) => {
        e.preventDefault();
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="relative aspect-[16/10] w-full bg-stone-900 overflow-hidden group/carousel select-none">
            
            {/* Dynamic Counter Indicator Badge */}
            {hasMultipleImages && (
                <div className="absolute top-3 right-3 z-10 bg-stone-950/70 backdrop-blur-md text-[10px] font-mono font-bold text-stone-200 px-2 py-0.5 rounded-full border border-stone-800 tracking-wider">
                    {currentIndex + 1} / {images.length}
                </div>
            )}

            {/* Slider Track Canvas */}
            <div 
                className="w-full h-full flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {images.map((imgUrl, i) => (
                    <div key={i} className="w-full h-full shrink-0 relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                            src={imgUrl} 
                            alt={`${title} - asset view ${i + 1}`}
                            className="w-full h-full object-cover group-hover/carousel:scale-105 transition-transform duration-700 ease-out"
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>

            {/* Sleek Action Controls Overlay Panel */}
            {hasMultipleImages && (
                <>
                    {/* Direction Arrow Targets */}
                    <div className="absolute inset-0 flex items-center justify-between p-2 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-200 pointer-events-none">
                        <button
                            onClick={handlePrev}
                            className="w-7 h-7 flex items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm pointer-events-auto border border-stone-200 hover:bg-orange-600 hover:text-white transition-colors text-stone-800 font-bold text-xs"
                            aria-label="Previous image"
                        >
                            ‹
                        </button>
                        <button
                            onClick={handleNext}
                            className="w-7 h-7 flex items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm pointer-events-auto border border-stone-200 hover:bg-orange-600 hover:text-white transition-colors text-stone-800 font-bold text-xs"
                            aria-label="Next image"
                        >
                            ›
                        </button>
                    </div>

                    {/* Minimalist Bottom Indicator Dot Array */}
                    <div className="absolute bottom-3 inset-x-0 flex items-center justify-center gap-1.5 z-10">
                        {images.map((_, i) => (
                            <button
                                key={i}
                                onClick={(e) => { e.preventDefault(); setCurrentIndex(i); }}
                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                    currentIndex === i 
                                        ? "w-4 bg-orange-500" 
                                        : "w-1.5 bg-white/50 hover:bg-white"
                                }`}
                                aria-label={`Go to slide ${i + 1}`}
                            />
                        ))}
                    </div>
                </>
            )}

            {/* Corner Subtle Overlay Depth Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/20 via-transparent to-transparent opacity-60 pointer-events-none" />
        </div>
    );
};

export default BlogCarousel;