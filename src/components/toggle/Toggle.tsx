import React, { FunctionComponent, useEffect, useState, useRef } from 'react';

interface IToggleProps {
  children(state: IToggleState): React.ReactNode;
}

interface IToggleState {
  isOpen: boolean;
  toggle(): void;
}

export const Toggle: FunctionComponent<IToggleProps> = ({ children }) => {
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
