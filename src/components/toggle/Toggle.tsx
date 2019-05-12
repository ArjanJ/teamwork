import React, { FunctionComponent, useEffect, useState, useRef } from 'react';

interface IToggleProps {
  children(state: IToggleState): React.ReactNode;
}

interface IToggleState {
  isOpen: boolean;
  setIsOpen(val: boolean): void;
}

export const Toggle: FunctionComponent<IToggleProps> = ({ children }) => {
  const node: React.RefObject<any> = useRef();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (event: MouseEvent) => {
    if (node.current.contains(event.target)) {
      // Inside Toggle click.
      return null;
    }

    // Outside Toggle click.
    setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [isOpen]);

  return <div ref={node}>{children({ isOpen, setIsOpen })}</div>;
};
