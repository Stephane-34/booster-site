import { useState } from 'react';
import Hero from '../../components/sections/Hero/Hero';
import OfferTabs from '../../components/sections/OfferTabs/OfferTabs';
import FlipCards from '../../components/sections/FlipCards/FlipCards';
import Calculator from '../../components/sections/Calculator/Calculator';
import Testimonials from '../../components/sections/Testimonials/Testimonials';
import AcademyPreview from '../../components/sections/AcademyPreview/AcademyPreview';
import BookingCTA from '../../components/sections/BookingCTA/BookingCTA';
import Modal from '../../components/ui/Modal/Modal';
import AuthForm from '../../components/sections/AuthForm/AuthForm';

export default function Home() {
  const [authModal, setAuthModal] = useState(false);

  return (
    <>
      <Hero onCTAClick={() => setAuthModal(true)} />
      <OfferTabs onCTAClick={() => setAuthModal(true)} />
      <FlipCards />
      <Calculator onCTAClick={() => setAuthModal(true)} />
      <Testimonials />
      <AcademyPreview />
      <BookingCTA />

      <Modal
        isOpen={authModal}
        onClose={() => setAuthModal(false)}
        title="Créer mon compte gratuit"
      >
        <AuthForm
          defaultTab="signup"
          onSuccess={() => setAuthModal(false)}
        />
      </Modal>
    </>
  );
}
