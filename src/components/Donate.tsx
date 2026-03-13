import React, { useState } from 'react';
import DonationModal from './DonationModal';

const Donate = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="donate" className="py-10 md:py-14 relative overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-5"></div>

      <div className="section-container relative z-10 flex justify-center">
        <div className="p-6 md:p-8 bg-white border border-terra-1/20 rounded-sm max-w-lg w-full text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#934211] mb-3">
            Apoio
          </p>
          <h2 className="font-display font-bold text-terra-2 text-2xl md:text-3xl mb-4">
            Apoie a Casa da Alquimia
          </h2>
          <p className="text-foreground/70 mb-8">
            Sua contribuição mantém vivos os rituais, os ensinamentos e o espaço de cura da Casa da Alquimia.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-primary text-white rounded-sm px-6 py-3 transition-colors duration-200 hover:bg-primary-dark font-medium"
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