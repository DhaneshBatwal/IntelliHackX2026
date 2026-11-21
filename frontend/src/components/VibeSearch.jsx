import React, { useState, useRef } from 'react';
import { Search, Image as ImageIcon, Sparkles, X, UploadCloud, IndianRupee, Loader2 } from 'lucide-react';

const SUGGESTED_VIBES = [
  { label: 'Goa Monsoon Wedding under ₹8,000', prompt: 'Outfit for a monsoon wedding in Goa under ₹8,000', budget: 8000 },
  { label: 'Indiranagar Tech Mixer & Brunch', prompt: 'Smart-casual streetwear for a tech mixer and Sunday brunch in Indiranagar Bengaluru under ₹7,000', budget: 7000 },
  { label: 'Mumbai Humid Gallery Opening', prompt: 'Breezy minimalist linen aesthetic for a gallery opening in humid coastal Mumbai under ₹6,500', budget: 6500 },
  { label: 'Cocktail Rooftop Lounge Evening', prompt: 'Sharp contemporary night-out outfit with sleek monochrome styling under ₹9,000', budget: 9000 },
];

export default function VibeSearch({ onSearch, isLoading, plainLanguage }) {
  const [prompt, setPrompt] = useState('');
  const [budget, setBudget] = useState('8000');
  const [imagePreview, setImagePreview] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
      setImageBase64(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const clearImage = () => {
    setImagePreview(null);
    setImageBase64(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!prompt.trim() && !imageBase64) return;
    onSearch(prompt, imageBase64, budget);
  };

  const applyPreset = (preset) => {
    setPrompt(preset.prompt);
    setBudget(String(preset.budget));
    onSearch(preset.prompt, imageBase64, preset.budget);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-6 px-4">
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl relative overflow-hidden">
        
        {/* Glow ambient background accents */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-vibe-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Heading */}
        <div className="text-center mb-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vibe-500/10 border border-vibe-500/20 text-vibe-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            {plainLanguage ? 'Step 1: Describe What You Need' : 'Vibe-to-Cart Multimodal Discovery'}
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Shop by <span className="bg-gradient-to-r from-vibe-400 via-purple-300 to-indigo-300 bg-clip-text text-transparent">Scenario & Vibe</span>, Not Keywords
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-2xl mx-auto">
            {plainLanguage
              ? 'Type where you are going or drop an outfit picture. Our AI builds a 3-piece look and finds real stores.'
              : 'Type an occasion, climate condition, or budget constraint. Gemini AI builds a cohesive 3-item capsule with live shopping links & buy buttons.'}
          </p>
        </div>

        {/* Search & Prompt Form */}
        <form onSubmit={handleSubmit} className="relative z-10 space-y-4">
          
          <div className="relative">
            <div className="flex items-center bg-darkbg-800/80 rounded-2xl border border-white/15 focus-within:border-vibe-500 focus-within:ring-2 focus-within:ring-vibe-500/20 transition-all p-2 sm:p-2.5">
              <Search className="w-5 h-5 text-slate-400 ml-2.5 shrink-0" />
              
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={plainLanguage ? "e.g., Goa wedding outfit in rain under ₹8,000" : "Describe your scenario e.g., 'Outfit for a monsoon wedding in Goa under ₹8,000'..."}
                className="w-full bg-transparent border-none text-white text-sm sm:text-base px-3 py-2 focus:outline-none placeholder-slate-500"
              />

              {/* Upload Image Button Trigger */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                title="Upload inspiration photo"
                className={`p-2 rounded-xl transition-all shrink-0 flex items-center gap-1.5 text-xs font-medium ${
                  imagePreview
                    ? 'bg-vibe-500/20 text-vibe-300 border border-vibe-500/40'
                    : 'text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span className="hidden sm:inline">{imagePreview ? 'Photo Added' : 'Add Photo'}</span>
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
                className="hidden"
              />

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || (!prompt.trim() && !imageBase64)}
                className="ml-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-vibe-600 to-purple-600 hover:from-vibe-500 hover:to-purple-500 text-white font-semibold text-sm shadow-lg shadow-vibe-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed shrink-0 flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{plainLanguage ? 'Thinking...' : 'Curating Capsule...'}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>{plainLanguage ? 'Build Outfit' : 'Curate 3-Item Capsule'}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Image Preview & Dragzone Drop Area */}
          {imagePreview ? (
            <div className="flex items-center gap-3 p-3 bg-white/5 border border-vibe-500/30 rounded-2xl relative">
              <img
                src={imagePreview}
                alt="Inspiration Preview"
                className="w-14 h-14 object-cover rounded-xl border border-white/20 shadow-md"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-vibe-300 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Visual Inspiration Attached
                </p>
                <p className="text-xs text-slate-400 truncate">
                  Gemini multimodal vision will harmonize clothing colors & textures to this image.
                </p>
              </div>
              <button
                type="button"
                onClick={clearImage}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 transition-colors"
                title="Remove image"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border border-dashed rounded-2xl py-3 px-4 text-center cursor-pointer transition-all ${
                isDragging
                  ? 'border-vibe-400 bg-vibe-500/10'
                  : 'border-white/10 hover:border-white/20 bg-white/[0.02]'
              }`}
            >
              <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                <UploadCloud className="w-4 h-4 text-vibe-400" />
                <span>
                  Optional: Drop an outfit inspiration image (or click to browse) for multimodal styling
                </span>
              </div>
            </div>
          )}

          {/* Target Budget & Preset Prompts */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            
            {/* Budget Input */}
            <div className="flex items-center gap-2 text-slate-300">
              <span className="text-slate-400 flex items-center gap-1">
                <IndianRupee className="w-3.5 h-3.5 text-vibe-400" />
                {plainLanguage ? 'Max Budget:' : 'Target Capsule Cap:'}
              </span>
              <div className="flex items-center bg-darkbg-800 rounded-lg border border-white/10 px-2 py-1">
                <span className="text-slate-500 mr-1">₹</span>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-20 bg-transparent text-white font-mono text-xs focus:outline-none"
                  step="500"
                  min="2000"
                />
              </div>
            </div>

            {/* Quick Scenario Chips */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-slate-500 mr-1 hidden lg:inline">Try scenario:</span>
              {SUGGESTED_VIBES.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => applyPreset(preset)}
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-vibe-500/40 text-[11px] text-slate-300 hover:text-white transition-all text-left"
                >
                  {preset.label}
                </button>
              ))}
            </div>

          </div>

        </form>

      </div>
    </div>
  );
}
