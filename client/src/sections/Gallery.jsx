import React, { useEffect, useRef } from 'react';
import gal1 from "../assets/gallery-1.jpg";
import gal2 from "../assets/gallery-2.jpg";
import gal3 from "../assets/gallery-3.jpg";
import gal4 from "../assets/gallery-4.jpg";
import gal5 from "../assets/service-1.jpg";

function Gallery() {
    const carouselRef = useRef(null);

    useEffect(() => {
        const carousel = carouselRef.current;
        if (!carousel) return;

        let containerWidth = 0;
        let scrollWidth = 0;
        let posFromLeft = 0;
        let scrollPos = 0;
        let animated = null;

        const onMouseEnter = (e) => {
            containerWidth = carousel.offsetWidth;
            scrollWidth = carousel.scrollWidth;
            posFromLeft = carousel.getBoundingClientRect().left;
            const stripePos = e.pageX - posFromLeft;
            const pos = stripePos / containerWidth;
            scrollPos = (scrollWidth - containerWidth) * pos;

            carousel.style.scrollBehavior = "smooth";

            if (scrollPos < 0) scrollPos = 0;
            if (scrollPos > scrollWidth - containerWidth) scrollPos = scrollWidth - containerWidth;

            carousel.scrollLeft = scrollPos;

            carousel.style.setProperty("--scrollWidth", `${(containerWidth / scrollWidth) * 100}%`);
            carousel.style.setProperty("--scrollLeft", `${(scrollPos / scrollWidth) * 100}%`);

            clearTimeout(animated);
            animated = setTimeout(() => {
                carousel.style.scrollBehavior = "auto";
                animated = null;
            }, 200);
        };

        const onMouseMove = (e) => {
            if (animated) return;
            const stripePos = e.pageX - posFromLeft;
            const pos = stripePos / containerWidth;
            scrollPos = (scrollWidth - containerWidth) * pos;

            carousel.scrollLeft = scrollPos;

            if (scrollPos < scrollWidth - containerWidth) {
                carousel.style.setProperty("--scrollLeft", `${(scrollPos / scrollWidth) * 100}%`);
            }

            carousel.setAttribute("data-at", (scrollPos > 5 ? "left " : " ") + (scrollWidth - containerWidth - scrollPos > 5 ? "right" : ""));
        };

        const bind = () => {
            carousel.addEventListener("mouseenter", onMouseEnter);
            carousel.addEventListener("mousemove", onMouseMove);
        };

        const unbind = () => {
            carousel.removeEventListener("mouseenter", onMouseEnter);
            carousel.removeEventListener("mousemove", onMouseMove);
        };

        bind();

        return () => {
            unbind();
        };
    }, []);

    // Array of image URLs
    const images = [gal1, gal2, gal3, gal4, gal5];

    return (
        <>
        <div className='flex justify-center items-center flex-col font-serif mb-16 text-center'>
        <div>
          <p className='sm:text-2xl text-xl text-gray-700 text-center'>Gallery</p>
          <hr className='border-primary mt-2 w-[300px]' />
        </div>
        <p className='sm:text-[45px] text-[28px] font-bold mt-2'>Memories Of Saving Lives</p>
        </div>
        <div className="carousel" ref={carouselRef} style={{ overflow: "hidden", position: "relative", width: "100%", cursor: "grab" }}>
            <ul
                style={{
                    listStyle: "none",
                    display: "flex",
                    paddingBottom: 70,
                    margin: 0,
                    whiteSpace: "nowrap",
                    transition: "transform 0.2s ease",
                }}
            >
                {/* Render images */}
                {images.map((src, index) => (
                    <li key={index} style={{ display: "inline-block", flexShrink: 0 }} className='sm:mx-4 md:w-[30%] sm:w-[40%] w-[100%]'>
                        <img src={src} alt={`Carousel Item ${index + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </li>
                ))}
            </ul>
        </div>
        </>
        
    );
}

export default Gallery;
