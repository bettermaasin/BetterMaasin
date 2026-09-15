import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GlobalShortcuts: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        const target = e.target as HTMLElement | null;
        const isTyping =
          target?.tagName === 'INPUT' ||
          target?.tagName === 'TEXTAREA' ||
          target?.isContentEditable;
        if (isTyping) return;
        e.preventDefault();
        navigate('/search', { state: { focusSearch: true } });
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [navigate]);

  return null;
};

export default GlobalShortcuts;
