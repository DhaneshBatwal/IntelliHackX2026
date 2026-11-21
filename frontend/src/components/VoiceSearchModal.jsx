import React, { useState, useEffect, useRef } from 'react';
import { Mic, X, Volume2, Sparkles, AlertCircle, Languages } from 'lucide-react';
import { translations, INDIAN_LANGUAGES } from '../constants/translations';

export default function VoiceSearchModal({ isOpen, onClose, onResult, language = 'en' }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const recognitionRef = useRef(null);
  const t = translations[language] || translations.en;

  const currentLangMeta = INDIAN_LANGUAGES.find(l => l.code === language) || { 
    locale: 'en-IN', 
    nativeName: 'English' 
  };

  useEffect(() => {
    if (!isOpen) {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) { /* ignore */ }
      }
      setIsListening(false);
      setTranscript('');
      setErrorMsg('');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setErrorMsg("Your browser does not support Web Speech Recognition. Please use Chrome or Edge.");
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = currentLangMeta.locale;

      recognition.onstart = () => {
        setIsListening(true);
        setErrorMsg('');
      };

      recognition.onresult = (event) => {
        let currentText = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentText += event.results[i][0].transcript;
        }
        setTranscript(currentText);
      };

      recognition.onerror = (event) => {
        console.warn("Speech recognition error:", event.error);
        if (event.error === 'not-allowed') {
          setErrorMsg("Microphone permission denied. Please enable mic access in your browser bar.");
        } else if (event.error === 'no-speech') {
          setErrorMsg("No speech detected. Please speak clearly into your mic.");
        } else {
          setErrorMsg(`Voice search note: ${event.error}`);
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error("Speech init error:", err);
      setErrorMsg("Failed to start voice recognition. Please try again.");
      setIsListening(false);
    }

    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) { /* ignore */ }
      }
    };
  }, [isOpen, language, currentLangMeta.locale]);

  if (!isOpen) return null;

  const handleApply = () => {
    if (transcript.trim()) {
      onResult(transcript.trim());
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md p-6 rounded-2xl border border-gray-200 shadow-2xl bg-white space-y-6 text-center text-gray-900">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with Language Badge */}
        <div className="space-y-1 pt-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <Languages className="w-3.5 h-3.5 text-amber-600" />
            <span>Voice Assistant • {currentLangMeta.nativeName} ({currentLangMeta.locale})</span>
          </div>
          <h3 className="text-xl font-extrabold text-gray-900">
            {isListening ? `Listening in ${currentLangMeta.nativeName}...` : "Tap to Speak"}
          </h3>
          <p className="text-xs text-gray-600">
            Speak any everyday item, brand or scenario (e.g., "Tata Sampann Toor Dal", "Mixer Grinder under 3000", "Cotton Bedsheet")
          </p>
        </div>

        {/* Animated Waveform & Mic Circle */}
        <div className="relative flex items-center justify-center py-6">
          {/* Animated pulse rings */}
          {isListening && (
            <>
              <div className="absolute w-28 h-28 rounded-full bg-amber-200/50 animate-ping pointer-events-none" />
              <div className="absolute w-20 h-20 rounded-full bg-rose-200/50 animate-pulse pointer-events-none" />
            </>
          )}

          <button
            onClick={() => {
              if (isListening && recognitionRef.current) {
                recognitionRef.current.stop();
              } else if (recognitionRef.current) {
                recognitionRef.current.start();
              }
            }}
            className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
              isListening
                ? 'bg-[#FEBD69] text-gray-950 scale-110 shadow-amber-500/30'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 border border-gray-300'
            }`}
          >
            <Mic className={`w-9 h-9 ${isListening ? 'animate-bounce text-gray-950' : ''}`} />
          </button>
        </div>

        {/* Live Audio Waveform Bars Simulation */}
        {isListening && (
          <div className="flex items-center justify-center gap-1.5 h-8">
            <div className="w-1.5 bg-amber-500 rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-4" />
            <div className="w-1.5 bg-rose-500 rounded-full animate-[pulse_0.4s_ease-in-out_infinite] h-8" />
            <div className="w-1.5 bg-amber-600 rounded-full animate-[pulse_0.7s_ease-in-out_infinite] h-6" />
            <div className="w-1.5 bg-yellow-500 rounded-full animate-[pulse_0.5s_ease-in-out_infinite] h-7" />
            <div className="w-1.5 bg-rose-600 rounded-full animate-[pulse_0.65s_ease-in-out_infinite] h-5" />
          </div>
        )}

        {/* Transcript Output Box */}
        <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 min-h-[70px] flex items-center justify-center text-sm font-medium">
          {transcript ? (
            <span className="text-gray-900 font-bold text-base leading-relaxed">
              "{transcript}"
            </span>
          ) : (
            <span className="text-gray-400 italic text-xs">
              {isListening ? `Speak now in ${currentLangMeta.nativeName}...` : "Your voice query will appear here..."}
            </span>
          )}
        </div>

        {/* Error Message if any */}
        {errorMsg && (
          <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2 text-left font-medium">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs transition-colors border border-gray-300"
          >
            Cancel
          </button>
          
          <button
            onClick={handleApply}
            disabled={!transcript.trim()}
            className="flex-1 py-2.5 rounded-lg bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 border border-[#FCD200] disabled:opacity-40 disabled:cursor-not-allowed font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" />
            <span>Search 12+ Stores</span>
          </button>
        </div>

      </div>
    </div>
  );
}
