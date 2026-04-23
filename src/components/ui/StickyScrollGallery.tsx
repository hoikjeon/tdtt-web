'use client';

interface StickyScrollGalleryProps {
  images: string[];
  fallback: string;
}

export default function StickyScrollGallery({ images, fallback }: StickyScrollGalleryProps) {
  const img = (index: number) => images[index % images.length] || fallback;

  return (
    <div className="relative z-30 w-full bg-white">
      <div className="grid grid-cols-12 gap-2 px-2">
        {/* Left column — scrolls normally */}
        <div className="grid gap-2 col-span-4">
          {[0, 1, 2, 3, 4].map((i) => (
            <figure key={i} className="w-full">
              <img
                src={img(i)}
                alt=""
                className="w-full h-72 object-cover"
              />
            </figure>
          ))}
        </div>

        {/* Center column — sticky */}
        <div className="sticky top-0 h-screen w-full col-span-4 gap-2 grid grid-rows-3">
          {[5, 6, 7].map((i) => (
            <figure key={i} className="w-full h-full">
              <img
                src={img(i)}
                alt=""
                className="h-full w-full object-cover"
              />
            </figure>
          ))}
        </div>

        {/* Right column — scrolls normally */}
        <div className="grid gap-2 col-span-4">
          {[8, 9, 10, 11, 3].map((i) => (
            <figure key={i} className="w-full">
              <img
                src={img(i)}
                alt=""
                className="w-full h-72 object-cover"
              />
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
