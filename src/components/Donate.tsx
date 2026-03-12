import React, { useState } from 'react';
import DonationModal from './DonationModal';

const Donate = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="donate" className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-azul-1/40 to-azul-1/20"></div>
      <div className="absolute inset-0 bg-noise opacity-5"></div>

      <div className="section-container relative z-10 flex justify-center">
        <div className="p-6 md:p-8 bg-white/70 backdrop-blur-sm rounded-xl border border-muted shadow-sm max-w-lg w-full text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#934211] mb-3">
            Apoio
          </p>
          <h2 className="font-display font-bold text-[#1A3A6B] text-2xl md:text-3xl mb-4">
            Apoie a Casa da Alquimia
          </h2>
          <p className="text-foreground/70 mb-8">
            Sua contribuição mantém vivos os rituais, os ensinamentos e o espaço de cura da Casa da Alquimia.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full px-6 py-3 bg-azul-2 text-white rounded-full font-medium hover:bg-azul-2/90 transition-all"
          >
            Quero apoiar
          </button>
        </div>
      </div>

      <DonationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default Donate;