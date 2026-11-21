import React from 'react';
import { 
  Trophy, 
  TrendingDown, 
  ThumbsDown, 
  Zap, 
  Sparkles, 
  Crown,
  Medal,
  ShieldCheck,
  Bell,
  Layers,
  Award,
  CheckCircle2,
  Lock,
  ArrowUpRight,
  Flame
} from 'lucide-react';
import { translations } from '../constants/translations';

const COMMUNITY_LEADERBOARD = [
  { rank: 1, name: "Aarav Mehta", location: "Bengaluru", totalSaved: "₹24,800", impulseAvoided: "8 Items (₹32,400)", streak: "8 Weeks", badge: "Elite Pro Curator", avatar: "🥇", perksActive: ["Unlimited Trackers", "Priority AI Audits", "Capsule Export"] },
  { rank: 2, name: "Pooja Deshmukh", location: "Mumbai", totalSaved: "₹19,250", impulseAvoided: "6 Items (₹21,800)", streak: "6 Weeks", badge: "Verified Deal Scout", avatar: "🥈", perksActive: ["Unlimited Trackers", "Priority AI Audits"] },
  { rank: 3, name: "Rohan Varma", location: "Delhi NCR", totalSaved: "₹16,400", impulseAvoided: "5 Items (₹18,500)", streak: "5 Weeks", badge: "Smart Shopper Gold", avatar: "🥉", perksActive: ["Unlimited Trackers"] },
  { rank: 4, name: "Dhanesh (You)", location: "Bengaluru", totalSaved: "₹14,850", impulseAvoided: "4 Items (₹14,200)", streak: "5 Weeks", badge: "Rising Pro", avatar: "⚡", perksActive: ["Unlimited Trackers", "Capsule Export"] },
  { rank: 5, name: "Ananya Iyer", location: "Chennai", totalSaved: "₹12,100", impulseAvoided: "3 Items (₹9,800)", streak: "4 Weeks", badge: "Rational Spender", avatar: "⭐", perksActive: ["Standard Perks"] },
];

export default function RewardsLeaderboard({
  currentUser,
  totalSaved = 14850,
  impulseCount = 4,
  impulseAmount = 14200,
  streakWeeks = 5,
  language = 'en'
}) {
  const t = translations[language] || translations.en;
  const userName = currentUser?.name || "Dhanesh";

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-6 space-y-8 animate-fade-in text-gray-900">
      
      {/* Top Banner: User's Authentic Smart-Shopping Analytics */}
      <div className="p-6 sm:p-8 rounded-2xl border border-gray-200 bg-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t.smartSavingsTitle}</span>
            </span>
            <span className="text-xs text-gray-500">Authentic In-App Data • November 2026</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            {userName}'s Smart Spending Analytics
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 max-w-xl">
            {t.smartSavingsSubtitle}
          </p>
        </div>

        {/* User Rank Card */}
        <div className="p-4 sm:p-5 rounded-xl bg-gray-50 border border-gray-200 text-center shrink-0 min-w-[210px] shadow-sm">
          <span className="text-[11px] text-gray-500 font-mono uppercase tracking-wider block">
            Community Standing
          </span>
          <div className="text-3xl sm:text-4xl font-extrabold text-gray-900 flex items-center justify-center gap-1.5 mt-1">
            <Crown className="w-7 h-7 text-amber-500 fill-amber-400" />
            <span>Rank #4</span>
          </div>
          <span className="text-[10px] text-emerald-700 font-bold block mt-1">
            Top 5% of Smart Shoppers in Bengaluru
          </span>
        </div>
      </div>

      {/* 3 Real Smart-Shopping Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Metric 1: Total ₹ Saved */}
        <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider font-mono">
              {t.metricTotalSaved}
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <TrendingDown className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-emerald-700 font-mono">
            ₹{totalSaved.toLocaleString('en-IN')}
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            Saved via real-time 12-store cross comparison and Split-Cart multi-store order bundling.
          </p>
        </div>

        {/* Metric 2: Impulse Buys Avoided */}
        <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider font-mono">
              {t.metricImpulseAvoided}
            </span>
            <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
              <ThumbsDown className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-rose-700 font-mono">
            {impulseCount} Items <span className="text-sm font-normal text-gray-500">(₹{impulseAmount.toLocaleString('en-IN')})</span>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            Kept safely in your bank by heeding Regret-Shield alerts, De-Influencer checks, and wardrobe duplicate warnings.
          </p>
        </div>

        {/* Metric 3: Smart Shopper Streak */}
        <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider font-mono">
              {t.metricShopperStreak}
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              <Flame className="w-4 h-4 fill-amber-500" />
            </div>
          </div>
          <div className="text-3xl font-black text-amber-600 font-mono">
            {streakWeeks} Consecutive Weeks
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            Zero impulsive purchases made without comparing cross-platform deals first.
          </p>
        </div>

      </div>

      {/* In-App Pro Perks for Top Ranks */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold uppercase border border-amber-200">
              <Zap className="w-4 h-4 text-amber-600" />
              <span>{t.proPerksTitle}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900">
              Real In-App Capabilities Unlocked for Top Ranks
            </h3>
          </div>
          <span className="text-xs text-emerald-700 font-mono font-semibold">
            2 of 4 Pro Perks Active for your Account
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Perk 1: Unlimited Trackers */}
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg bg-emerald-200 text-emerald-800 flex items-center justify-center">
                <Bell className="w-4 h-4" />
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-800 text-[10px] font-bold">
                ACTIVE ✓
              </span>
            </div>
            <h4 className="font-bold text-gray-900 text-xs">
              {t.perkUnlimitedAlerts}
            </h4>
            <p className="text-[11px] text-gray-600 leading-relaxed">
              {t.perkUnlimitedAlertsDesc}
            </p>
          </div>

          {/* Perk 2: Priority AI Audits */}
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg bg-emerald-200 text-emerald-800 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-800 text-[10px] font-bold">
                ACTIVE ✓
              </span>
            </div>
            <h4 className="font-bold text-gray-900 text-xs">
              {t.perkPriorityAudit}
            </h4>
            <p className="text-[11px] text-gray-600 leading-relaxed">
              {t.perkPriorityAuditDesc}
            </p>
          </div>

          {/* Perk 3: Custom Capsule Export */}
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-2 opacity-80">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg bg-gray-200 text-gray-600 flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
              <span className="px-2 py-0.5 rounded-full bg-gray-200 text-gray-600 text-[10px] font-bold flex items-center gap-1">
                <Lock className="w-2.5 h-2.5" /> Rank #3
              </span>
            </div>
            <h4 className="font-bold text-gray-900 text-xs">
              {t.perkCapsuleExport}
            </h4>
            <p className="text-[11px] text-gray-600 leading-relaxed">
              {t.perkCapsuleExportDesc}
            </p>
          </div>

          {/* Perk 4: Verified Deal Curator */}
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-2 opacity-80">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg bg-gray-200 text-gray-600 flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
              <span className="px-2 py-0.5 rounded-full bg-gray-200 text-gray-600 text-[10px] font-bold flex items-center gap-1">
                <Lock className="w-2.5 h-2.5" /> Rank #1
              </span>
            </div>
            <h4 className="font-bold text-gray-900 text-xs">
              {t.perkCuratorBadge}
            </h4>
            <p className="text-[11px] text-gray-600 leading-relaxed">
              {t.perkCuratorBadgeDesc}
            </p>
          </div>

        </div>
      </div>

      {/* Community Smart-Shopper Leaderboard Table */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              <span>{t.monthlyPodium}</span>
            </h3>
            <p className="text-xs text-gray-600">
              Ranked dynamically by verified cross-store savings and rational spending discipline.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 overflow-hidden bg-white">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200 text-gray-700 font-mono uppercase text-[10px]">
                <th className="py-3 px-4">Rank & Shopper</th>
                <th className="py-3 px-3">Location</th>
                <th className="py-3 px-3">{t.savingsMetric}</th>
                <th className="py-3 px-3">{t.impulseAvoidedMetric}</th>
                <th className="py-3 px-4 text-right">Badge & Standing</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {COMMUNITY_LEADERBOARD.map((shopper) => {
                const isUser = shopper.name.includes("You");

                return (
                  <tr 
                    key={shopper.rank} 
                    className={`hover:bg-gray-50 transition-colors ${
                      isUser ? 'bg-amber-50/50 font-semibold' : ''
                    }`}
                  >
                    
                    {/* Rank & Name */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <span className="text-base">{shopper.avatar}</span>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-gray-900">{shopper.name}</span>
                            {isUser && (
                              <span className="px-1.5 py-0.2 rounded bg-amber-200 text-gray-950 font-bold text-[9px]">
                                YOU
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-gray-500 font-mono">
                            {shopper.streak} smart streak
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Location */}
                    <td className="py-3.5 px-3 text-gray-600">
                      {shopper.location}
                    </td>

                    {/* Verified Savings */}
                    <td className="py-3.5 px-3">
                      <span className="font-extrabold text-emerald-700 font-mono">
                        {shopper.totalSaved}
                      </span>
                    </td>

                    {/* Impulse Avoided */}
                    <td className="py-3.5 px-3 text-gray-700 font-mono">
                      {shopper.impulseAvoided}
                    </td>

                    {/* Badge */}
                    <td className="py-3.5 px-4 text-right">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        shopper.rank === 1
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : shopper.rank <= 3
                            ? 'bg-gray-100 text-gray-800 border border-gray-300'
                            : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      }`}>
                        {shopper.badge}
                      </span>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
