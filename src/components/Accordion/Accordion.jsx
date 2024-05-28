import React from 'react';
import classNames from 'classnames';
import './Accordion.css';

export default function Accordion({ children, isOpen }) {
  return (
    <div className={classNames('accordion-content w-1/5', { open: isOpen })}>
      {children}
    </div>
  );
}
