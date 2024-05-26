import React from 'react';

export default function input({
  variant= 'nomalInput',
  size = 'medium',
  className = '',
  ...props
}) {
  const getStyleClass = () => {
    const className = ['border', 'p-1'];

    switch(variant) {
      case 'nomalInput':
        className.push('rounded')
    }
  }
  return (
    <div>
      
    </div>
  );
}

