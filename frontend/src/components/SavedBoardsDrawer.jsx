import React from 'react';
import { X, Bookmark, Trash2, ArrowRight, Sparkles, Calendar } from 'lucide-react';

export default function SavedBoardsDrawer({
  isOpen,
  onClose,
  savedBoards,
  onLoadBoard,
  onDeleteBoard,
  plainLanguage
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md h-full bg-white border-l border-gray-200 shadow-2xl flex flex-col justify-between p-6 overflow-hidden text-gray-900">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#FEBD69] text-gray-950 flex items-center justify-center font-bold">
              <Bookmark className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-gray-900 text-lg">
                {plainLanguage ? 'Saved Outfits' : 'Saved Capsule Boards'}
              </h2>
              <p className="text-xs text-gray-500">
                {savedBoards.length} boards saved in Supabase
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3.5 pr-1">
          {savedBoards.length === 0 ? (
            <div className="py-16 text-center text-gray-500 text-xs">
              No boards saved yet. When you find items or a look you love, click "Save Board"!
            </div>
          ) : (
            savedBoards.map((board) => (
              <div
                key={board.id}
                className="p-4 rounded-xl bg-gray-50 border border-gray-200 hover:border-gray-300 transition-all space-y-3 group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">
                      {board.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-1 italic">
                      "{board.scenario_prompt}"
                    </p>
                  </div>

                  <button
                    onClick={() => onDeleteBoard(board.id)}
                    className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-rose-50 text-gray-400 hover:text-rose-600 transition-all shrink-0"
                    title="Delete board"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs pt-1 border-t border-gray-200">
                  <span className="font-extrabold text-gray-900 font-mono">
                    ₹{Math.round(board.total_price || 0).toLocaleString('en-IN')}
                  </span>

                  <button
                    onClick={() => {
                      onLoadBoard(board);
                      onClose();
                    }}
                    className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-bold"
                  >
                    <span>View Capsule</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 pt-4">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold transition-colors border border-gray-300"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
