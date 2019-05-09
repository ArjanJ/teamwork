import React, { FunctionComponent, useEffect, useState, useRef } from 'react';

interface IDropdownProps {
  children(state: IDropdownState): React.ReactNode;
}

interface IDropdownState {
  isOpen: boolean;
  setIsOpen(val: boolean): void;
}

export const Dropdown: FunctionComponent<IDropdownProps> = ({ children }) => {
  const node: React.RefObject<any> = useRef();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (event: MouseEvent) => {
    if (node.current.contains(event.target)) {
      // Inside dropdown click.
      return null;
    }

    // Outside dropdown click.
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
