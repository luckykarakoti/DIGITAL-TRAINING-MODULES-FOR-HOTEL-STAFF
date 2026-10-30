import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { 
  ShieldAlert, 
  Flame, 
  HeartPulse, 
  Sparkles, 
  EyeOff, 
  Search, 
  PhoneCall, 
  AlertTriangle 
} from 'lucide-react';

export const EmergencyCardsView = () => {
  const [cards, setCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.getQuickCards();
        if (res.success && res.cards) {
          setCards(res.cards);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const iconMap = {
    Flame: Flame,
    HeartPulse: HeartPulse,
    Sparkles: Sparkles,
    EyeOff: EyeOff
  };

  const filteredCards = cards.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.steps.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 hotel-shadow flex flex-wrap items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-700 mb-1">
            <ShieldAlert className="w-4 h-4" />
            <span>Floor Staff Immediate Reference</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-sans font-bold text-slate-900">
            Emergency Standard Operating Pocket Guides
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl">
            Critical life-safety protocols, fire evacuation action sequences, CPR resuscitation, and hotel security codes for shift reference.
          </p>
        </div>

        {/* Emergency Dispatch Box */}
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-rose-600 text-white flex items-center justify-center font-bold">
            <PhoneCall className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-rose-700 font-bold">
              Hotel Security Dispatch
            </div>
            <div className="text-base font-bold font-mono text-slate-900">
              Ext. 5555 / 911 Liaison
            </div>
          </div>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 hotel-shadow flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search code (e.g. Code Red, Code Blue, L.A.S.T.)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900"
          />
        </div>
        <span className="text-xs text-slate-500">
          Showing {filteredCards.length} quick-action reference cards
        </span>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCards.map((card) => {
          const Icon = iconMap[card.icon] || AlertTriangle;

          let colorStyles = {
            border: 'border-rose-200 bg-rose-50/20',
            badge: 'bg-rose-100 text-rose-800 border-rose-200',
            iconBg: 'bg-rose-600 text-white'
          };

          if (card.color === 'blue') {
            colorStyles = {
              border: 'border-blue-200 bg-blue-50/20',
              badge: 'bg-blue-100 text-blue-800 border-blue-200',
              iconBg: 'bg-blue-600 text-white'
            };
          } else if (card.color === 'amber') {
            colorStyles = {
              border: 'border-amber-200 bg-amber-50/20',
              badge: 'bg-amber-100 text-amber-800 border-amber-200',
              iconBg: 'bg-amber-600 text-white'
            };
          } else if (card.color === 'indigo') {
            colorStyles = {
              border: 'border-indigo-200 bg-indigo-50/20',
              badge: 'bg-indigo-100 text-indigo-800 border-indigo-200',
              iconBg: 'bg-indigo-600 text-white'
            };
          }

          return (
            <div
              key={card.id}
              className={`rounded-2xl border p-6 hotel-shadow bg-white ${colorStyles.border}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm ${colorStyles.iconBg}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                      {card.title}
                    </h3>
                    <div className="text-[11px] text-slate-500">
                      Target: {card.department || 'All Floor Associates'}
                    </div>
                  </div>
                </div>

                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${colorStyles.badge}`}>
                  {card.code}
                </span>
              </div>

              {/* Step Checklist */}
              <div className="space-y-2 pt-2">
                {card.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 text-xs text-slate-700 flex items-start gap-3"
                  >
                    <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5 font-mono">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
