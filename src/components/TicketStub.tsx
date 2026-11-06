import React from 'react';
import { Keepsake } from '../types';
import { Ticket, Receipt, Tag, Sparkles, Flower2 } from 'lucide-react';

interface TicketStubProps {
  keepsake: Keepsake;
  className?: string;
  onClick?: () => void;
}

export const TicketStub: React.FC<TicketStubProps> = ({ keepsake, className = '', onClick }) => {
  const getIcon = () => {
    switch (keepsake.type) {
      case 'ticket':
        return <Ticket className="w-4 h-4 text-scrap-cherry" />;
      case 'receipt':
        return <Receipt className="w-4 h-4 text-scrap-sepia" />;
      case 'flower':
        return <Flower2 className="w-4 h-4 text-scrap-sage" />;
      case 'tag':
        return <Tag className="w-4 h-4 text-scrap-slate" />;
      case 'matchbook':
      default:
        return <Sparkles className="w-4 h-4 text-scrap-cherry" />;
    }
  };

  const isReceipt = keepsake.type === 'receipt';
  const isTicket = keepsake.type === 'ticket';
  const isFlower = keepsake.type === 'flower';

  return (
    <div
      onClick={onClick}
      className={`relative p-3.5 rounded-sm shadow-md transition-transform duration-200 hover:-translate-y-0.5 ${
        isReceipt
          ? 'bg-[#FCFBF7] text-[#2C1E14] font-mono text-xs border border-[#E5DECF] paper-ruled'
          : isTicket
          ? 'bg-[#F9EDE0] text-[#4A3525] border-2 border-dashed border-[#C0392B]/40 ticket-edge'
          : isFlower
          ? 'bg-[#F4F7F2] text-[#283823] border border-[#CEDEC9] font-serif'
          : 'bg-[#F7EFE1] text-[#3E2B1E] border border-[#D9CDBA]'
      } ${className}`}
    >
      {/* Decorative Hole Punch for tickets */}
      {isTicket && (
        <div
          className="absolute -top-2 left-6 w-3.5 h-3.5 rounded-full bg-[#ECE3D4] border border-[#C5B8A5] shadow-inner"
          aria-hidden="true"
        />
      )}

      <div className="flex items-center justify-between gap-2 border-b border-black/10 pb-1.5 mb-2">
        <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[11px]">
          {getIcon()}
          <span>{keepsake.title}</span>
        </div>
        {keepsake.date && (
          <span className="font-mono text-[10px] opacity-70 bg-black/5 px-1.5 py-0.5 rounded">
            {keepsake.date}
          </span>
        )}
      </div>

      {keepsake.subtitle && (
        <p className="text-xs font-medium text-scrap-sepia/90 mb-1">{keepsake.subtitle}</p>
      )}

      {keepsake.details && (
        <p className="text-[11px] leading-relaxed opacity-80 break-words">{keepsake.details}</p>
      )}

      {/* Decorative Barcode on tickets & receipts */}
      {(isTicket || isReceipt) && (
        <div className="mt-2.5 pt-2 border-t border-black/10 flex items-center justify-between">
          <div className="flex items-center gap-0.5 h-3 opacity-40">
            <span className="w-1 h-full bg-black"></span>
            <span className="w-0.5 h-full bg-black"></span>
            <span className="w-1.5 h-full bg-black"></span>
            <span className="w-0.5 h-full bg-black"></span>
            <span className="w-2 h-full bg-black"></span>
            <span className="w-0.5 h-full bg-black"></span>
            <span className="w-1 h-full bg-black"></span>
            <span className="w-1.5 h-full bg-black"></span>
          </div>
          <span className="font-mono text-[9px] opacity-50 uppercase tracking-widest">
            KEEPSAKE • ARCHIVE
          </span>
        </div>
      )}
    </div>
  );
};

