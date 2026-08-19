import type { Metadata } from "next";
import { Image as ImageIcon } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Gallery | Fatima Overseas",
  description: "Browse our collection of pictures from Umrah, Hajj, and our various travel groups.",
};

export const revalidate = 60; // Revalidate cache every 60 seconds

export default async function GalleryPage() {
  // Fetch active gallery images
  const images = await prisma.galleryImage.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#f0f9ff]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-dark via-brand-secondary to-brand-primary text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl z-0" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-flex items-center justify-center gap-2 px-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-brand-muted text-sm font-semibold mb-6 uppercase tracking-widest">
            <ImageIcon size={16} /> Photo Gallery
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            Memories from <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-muted to-white">Holy Journeys</span>
          </h1>
          <p className="text-sky-200 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            A glimpse into the spiritual experiences of our pilgrims. Browse moments captured during Umrah, Hajj, and Ziyarat.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {images.length > 0 ? (
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
              {images.map((img) => (
                <div key={img.id} className="break-inside-avoid relative group rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all">
                  <img 
                    src={img.imageUrl} 
                    alt={img.title} 
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-6">
                      <p className="text-white font-medium leading-snug drop-shadow-md">
                        {img.title}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-16 text-center border border-sky-100 shadow-sm max-w-2xl mx-auto">
              <ImageIcon className="w-16 h-16 text-sky-200 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-brand-dark mb-2">No photos yet</h2>
              <p className="text-sky-600">Our gallery is currently empty. Check back later for new pictures!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
