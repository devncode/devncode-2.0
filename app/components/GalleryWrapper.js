"use client";

import dynamic from "next/dynamic";

const Gallery = dynamic(() => import("./Gallery"), {
  loading: () => (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="aspect-square bg-black/5 dark:bg-white/5 rounded-lg animate-pulse"
        />
      ))}
    </div>
  ),
  ssr: false,
});

export default function GalleryWrapper({ images }) {
  return <Gallery images={images} />;
}

