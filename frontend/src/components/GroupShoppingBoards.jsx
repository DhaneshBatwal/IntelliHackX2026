import React, { useState } from 'react';
import { 
  Users, 
  Share2, 
  ThumbsUp, 
  ThumbsDown, 
  MessageSquare, 
  Copy, 
  Check, 
  Sparkles, 
  Plus, 
  ExternalLink,
  Lock,
  Globe2,
  Trash2
} from 'lucide-react';
import { translations } from '../constants/translations';

const DEFAULT_GROUP_BOARDS = [
  {
    id: "board_1",
    title: "Goa Beach Wedding & Reception Look",
    occasion: "Friend's Destination Wedding in South Goa",
    is_public: true,
    total_price: 7897,
    items: [
      {
        id: "b1_it1",
        name: "Single-Breasted Notch Lapel Smart Blazer",
        category: "Outerwear",
        price: 2899,
        image_url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80",
        buyVotes: 5,
        skipVotes: 1
      },
      {
        id: "b1_it2",
        name: "Sage Green Embroidered Linen-Cotton Nehru Kurta",
        category: "Top",
        price: 2499,
        image_url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80",
        buyVotes: 7,
        skipVotes: 0
      },
      {
        id: "b1_it3",
        name: "Flat-Front Slim Tapered Stretch Trousers",
        category: "Bottom",
        price: 1999,
        image_url: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80",
        buyVotes: 4,
        skipVotes: 2
      }
    ],
    comments: [
      { id: "c1", author: "Pooja (Sister)", text: "The Sage Green Kurta color is gorgeous for the daytime haldi event! Definitely buy that one.", timestamp: "2 hours ago" },
      { id: "c2", author: "Rohan (Friend)", text: "Make sure the blazer fabric isn't too heavy for Goa humidity; linen kurta is a safer bet.", timestamp: "5 hours ago" }
    ]
  },
  {
    id: "board_2",
    title: "Executive Desk Audio & Workstation Setup",
    occasion: "Home Office Tech Refresh",
    is_public: false,
    total_price: 31985,
    items: [
      {
        id: "b2_it1",
        name: "Sony WH-1000XM5 Wireless ANC Headphones",
        category: "Electronics",
        price: 26990,
        image_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
        buyVotes: 4,
        skipVotes: 1
      },
      {
        id: "b2_it2",
        name: "Minimalist Ultra-Thin Silver Mesh Watch",
        category: "Accessory",
        price: 4995,
        image_url: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=80",
        buyVotes: 3,
        skipVotes: 3
      }
    ],
    comments: [
      { id: "c3", author: "Aarav", text: "Sony XM5 at ₹26,990 on Croma is the lowest price all year. Solid grab for noise cancelation.", timestamp: "1 day ago" }
    ]
  }
];

export default function GroupShoppingBoards({
  language = 'en',
  onSelectBoardForCapsule
}) {
  const [boards, setBoards] = useState(DEFAULT_GROUP_BOARDS);
  const [copiedBoardId, setCopiedBoardId] = useState(null);
  const [newCommentText, setNewCommentText] = useState({});
  const t = translations[language] || translations.en;

  const togglePublic = (boardId) => {
    setBoards(prev => prev.map(b => 
      b.id === boardId ? { ...b, is_public: !b.is_public } : b
    ));
  };

  const handleCopyLink = (boardId) => {
    const url = `https://vibecart.ai/board/${boardId}?ref=family_share`;
    navigator.clipboard.writeText(url);
    setCopiedBoardId(boardId);
    setTimeout(() => setCopiedBoardId(null), 2500);
  };

  const handleVote = (boardId, itemId, voteType) => {
    setBoards(prev => prev.map(b => {
      if (b.id !== boardId) return b;
      return {
        ...b,
        items: b.items.map(it => {
          if (it.id !== itemId) return it;
          return {
            ...it,
            buyVotes: voteType === 'buy' ? (it.buyVotes || 0) + 1 : it.buyVotes,
            skipVotes: voteType === 'skip' ? (it.skipVotes || 0) + 1 : it.skipVotes
          };
        })
      };
    }));
  };

  const handleAddComment = (boardId) => {
    const text = newCommentText[boardId]?.trim();
    if (!text) return;

    setBoards(prev => prev.map(b => {
      if (b.id !== boardId) return b;
      return {
        ...b,
        comments: [
          ...b.comments,
          {
            id: `c_${Date.now()}`,
            author: "You (Reviewer)",
            text,
            timestamp: "Just now"
          }
        ]
      };
    }));

    setNewCommentText(prev => ({ ...prev, [boardId]: '' }));
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-6 space-y-8 animate-fade-in text-gray-900">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl border border-gray-200 bg-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border border-amber-200">
              <Users className="w-3.5 h-3.5 text-amber-600" />
              <span>{t.groupBoardsTitle}</span>
            </span>
            <span className="text-xs text-gray-500">Collaborative Supabase Boards</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Collaborative Group & Family Boards
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 max-w-xl">
            {t.groupBoardsDesc}
          </p>
        </div>
      </div>

      {/* Boards List */}
      <div className="space-y-6">
        {boards.map((board) => (
          <div 
            key={board.id}
            className="p-6 rounded-2xl bg-white border border-gray-200 space-y-5 shadow-sm"
          >
            {/* Top Board Meta Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                    {board.title}
                  </h3>
                  <button
                    onClick={() => togglePublic(board.id)}
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 transition-all ${
                      board.is_public
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                        : 'bg-gray-100 text-gray-600 border border-gray-300'
                    }`}
                  >
                    {board.is_public ? (
                      <>
                        <Globe2 className="w-3 h-3 text-emerald-600" />
                        <span>{t.boardPublicBadge}</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-3 h-3 text-gray-500" />
                        <span>{t.boardPrivateBadge}</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">
                  Occasion: <strong className="text-gray-800">{board.occasion}</strong> • Estimated Total: <strong className="text-emerald-700 font-bold">₹{board.total_price.toLocaleString('en-IN')}</strong>
                </p>
              </div>

              {/* Share Button */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyLink(board.id)}
                  className="px-3.5 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-gray-300"
                >
                  {copiedBoardId === board.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-bold">{t.linkCopiedAlert?.slice(0, 15) || "Copied!"}</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5 text-amber-600" />
                      <span>{t.copyShareLink}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Items Grid with Voting */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {board.items.map((item) => (
                <div 
                  key={item.id}
                  className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg border border-gray-200 shrink-0 bg-white"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-mono uppercase text-gray-500 font-bold">
                        {item.category}
                      </span>
                      <h4 className="text-xs font-bold text-gray-900 truncate mt-0.5">
                        {item.name}
                      </h4>
                      <span className="text-xs font-extrabold text-gray-900 font-mono block mt-1">
                        ₹{item.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Interactive Buy / Skip Voting Buttons */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                    <span className="text-[10px] text-gray-500 uppercase font-mono tracking-wider font-semibold">
                      Family Vote:
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleVote(board.id, item.id, 'buy')}
                        className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1 border border-emerald-300 transition-all active:scale-95"
                        title="Vote to Buy"
                      >
                        <ThumbsUp className="w-3 h-3 text-emerald-600" />
                        <span>{item.buyVotes}</span>
                      </button>

                      <button
                        onClick={() => handleVote(board.id, item.id, 'skip')}
                        className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs font-bold flex items-center gap-1 border border-rose-300 transition-all active:scale-95"
                        title="Vote to Skip"
                      >
                        <ThumbsDown className="w-3 h-3 text-rose-600" />
                        <span>{item.skipVotes}</span>
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>

            {/* Comments & Family Advice Section */}
            <div className="pt-3 border-t border-gray-200 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-900">
                <MessageSquare className="w-3.5 h-3.5 text-amber-600" />
                <span>{t.familyFeedback} ({board.comments.length})</span>
              </div>

              <div className="space-y-2">
                {board.comments.map((comment) => (
                  <div key={comment.id} className="p-2.5 rounded-lg bg-gray-50 border border-gray-200 text-xs space-y-0.5">
                    <div className="flex items-center justify-between text-[10px] text-gray-500">
                      <span className="font-bold text-gray-900">{comment.author}</span>
                      <span>{comment.timestamp}</span>
                    </div>
                    <p className="text-gray-700 text-xs font-medium">{comment.text}</p>
                  </div>
                ))}
              </div>

              {/* Add Comment Input */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="text"
                  value={newCommentText[board.id] || ''}
                  onChange={(e) => setNewCommentText(prev => ({ ...prev, [board.id]: e.target.value }))}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddComment(board.id)}
                  placeholder={t.addFeedbackPlaceholder}
                  className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-amber-500"
                />
                <button
                  onClick={() => handleAddComment(board.id)}
                  className="px-4 py-2 rounded-lg bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 font-bold text-xs shrink-0 transition-colors border border-[#FCD200]"
                >
                  {t.postFeedback}
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
