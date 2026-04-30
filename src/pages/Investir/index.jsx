import { useState } from 'react';
import OfferTabs from '../../components/sections/OfferTabs/OfferTabs';
import Calculator from '../../components/sections/Calculator/Calculator';
import BookingCTA from '../../components/sections/BookingCTA/BookingCTA';
import Modal from '../../components/ui/Modal/Modal';
import AuthForm from '../../components/sections/AuthForm/AuthForm';
import styles from './Investir.module.css';

export default function Investir() {
  const [authModal, setAuthModal] = useState(false);

  return (
    <div className={styles.page}>
      <OfferTabs onCTAClick={() => setAuthModal(true)} />
      <Calculator onCTAClick={() => setAuthModal(true)} />
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
    </div>
  );
}
