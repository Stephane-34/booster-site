import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TonProjet() {
  const navigate = useNavigate();
  useEffect(() => { navigate('/investir', { replace: true }); }, [navigate]);
  return null;
}
