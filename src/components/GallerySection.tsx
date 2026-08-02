import React, { useState } from 'react';
import { GALLERY } from '../data/clinicData';
import { GalleryItem } from '../types';
import { Image, Maximize2, X, Sparkles, CheckCircle2 } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Exterior', 'Reception', 'Consultation', 'Diagnostics', 'Equipment'];

  const filteredGallery = selectedCategory === 'All'
    ? GALLERY
    : GALLERY.filter(g => g.category === selectedCategory);

  return (
    <section id="gallery" className="py-16 lg:py-24 bg-slate-900 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/10 text-teal-300 text-xs font-bold uppercase tracking-wider border border-teal-500/30">
            <Image className="w-3.5 h-3.5 text-teal-400" />
            <span>4K CLINIC INFRASTRUCTURE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
            Take a Virtual Tour of Our Facility
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Clean, air-conditioned, patient-centered spaces designed to ensure maximum comfort, privacy, and hygiene in Bagaluru.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-teal-500 text-slate-950 font-bold shadow-lg shadow-teal-500/20'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveLightboxItem(item)}
              className="group relative rounded-2xl overflow-hidden bg-slate-800 border border-slate-700/80 cursor-pointer shadow-md hover:shadow-2xl hover:border-teal-400 transition-all duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden bg-slate-950">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Overlay Content */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity p-5 flex flex-col justify-end">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="px-2.5 py-0.5 bg-teal-500/20 text-teal-300 border border-teal-500/40 text-[10px] font-bold rounded uppercase">
                      {item.category}
                    </span>
                    <h3 className="text-base font-bold text-white mt-1 group-hover:text-teal-300 transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-teal-500/20 text-teal-300 flex items-center justify-center group-hover:bg-teal-500 group-hover:text-slate-950 transition-colors">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeLightboxItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-slate-900 rounded-3xl border border-slate-700 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex justify-between items-center">
              <div>
                <span className="px-2.5 py-0.5 bg-teal-500/20 text-teal-300 border border-teal-500/40 text-[10px] font-bold rounded uppercase">
                  {activeLightboxItem.category}
                </span>
                <h3 className="text-lg font-bold text-white font-display mt-0.5">
                  {activeLightboxItem.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveLightboxItem(null)}
                className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-black flex items-center justify-center overflow-hidden flex-1">
              <img
                src={activeLightboxItem.imageUrl}
                alt={activeLightboxItem.title}
                className="max-h-[60vh] w-auto object-contain rounded-xl"
              />
            </div>

            <div className="p-6 bg-slate-900 border-t border-slate-800">
              <p className="text-sm text-slate-300 leading-relaxed">
                {activeLightboxItem.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
