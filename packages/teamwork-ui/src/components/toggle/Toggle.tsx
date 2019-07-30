import React, { FunctionComponent, useEffect, useRef, useState } from 'react';

interface ToggleProps {
  children(state: ToggleState): React.ReactNode;
}

interface ToggleState {
  isOpen: boolean;
  toggle(): void;
}

export const Toggle: FunctionComponent<ToggleProps> = ({ children }) => {
  const node: React.RefObject<any> = useRef();
  const [isOpen, setIsOpen] = useState(false);

  const handleDocClick = (event: MouseEvent) => {
    if (node.current.contains(event.target)) {
      // Inside Toggle click.
      return null;
    }

    // Outside Toggle click.
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleDocClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleDocClick);
    };
  }, [isOpen]);

  const handleToggleClick = () => setIsOpen(!isOpen);

  return (
    <div ref={node}>{children({ isOpen, toggle: handleToggleClick })}</div>
  );
};
