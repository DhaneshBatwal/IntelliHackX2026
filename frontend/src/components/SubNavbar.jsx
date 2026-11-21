import React from 'react';
import { 
  Flame, 
  ShoppingBag, 
  Smartphone, 
  Shirt, 
  Footprints, 
  UtensilsCrossed, 
  Sparkles, 
  Dumbbell, 
  Armchair, 
  BookOpen, 
  Heart, 
  Tag 
} from 'lucide-react';
import { translations } from '../constants/translations';

const EVERYDAY_CATEGORIES = [
  { id: "all", labelKey: "catAll", icon: Flame, color: "text-rose-400" },
  { id: "grocery", labelKey: "catDailyGrocery", icon: ShoppingBag, color: "text-emerald-400" },
  { id: "mobilesLaptops", labelKey: "catMobilesLaptops", icon: Smartphone, color: "text-blue-400" },
  { id: "fashion", labelKey: "catFashion", icon: Shirt, color: "text-amber-400" },
  { id: "footwear", labelKey: "catFootwear", icon: Footprints, color: "text-purple-400" },
  { id: "homeKitchen", labelKey: "catHomeKitchen", icon: UtensilsCrossed, color: "text-orange-400" },
  { id: "beautyPersonalCare", labelKey: "catBeautyPersonalCare", icon: Sparkles, color: "text-pink-400" },
  { id: "healthFitness", labelKey: "catHealthFitness", icon: Dumbbell, color: "text-cyan-400" },
  { id: "homeDecor", labelKey: "catHomeDecor", icon: Armchair, color: "text-teal-400" },
  { id: "booksStationery", labelKey: "catBooksStationery", icon: BookOpen, color: "text-indigo-400" },
  { id: "babyPet", labelKey: "catBabyPet", icon: Heart, color: "text-rose-300" },
  { id: "under999", labelKey: "catUnder999", icon: Tag, color: "text-yellow-400" },
];

export default function SubNavbar({
  activeCategoryKey,
  onSelectCategory,
  language = 'en'
}) {
  const t = translations[language] || translations.en;

  return (
    <div className="w-full bg-[#232F3E] border-b border-gray-700 overflow-x-auto scrollbar-none py-2 px-3 sm:px-6 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs min-w-max">
        {EVERYDAY_CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategoryKey === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all text-xs font-semibold whitespace-nowrap active:scale-95 ${
                isActive
                  ? 'bg-[#FEBD69] text-gray-950 font-black shadow-sm ring-1 ring-white/20'
                  : 'text-gray-200 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/20'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-gray-950 stroke-[2.5]' : 'text-gray-300'}`} />
              <span>{t[cat.labelKey] || cat.id}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
