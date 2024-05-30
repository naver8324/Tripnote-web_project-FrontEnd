import React, { forwardRef } from 'react';

function ButtonComponent(
  { variant = 'nomalButton', size = 'medium', className = '', ...props },
  ref,
) {
  const getStyleClass = () => {
    const classNames = ['border', 'p-1', 'text-title'];

    switch (variant) {
      case 'roundButton':
        classNames.push('rounded-full');
        break;
      case 'nomalButton':
        classNames.push('rounded');
        break;
      default:
        break;
    }

    switch (size) {
      case 'small':
        classNames.push('px-1', 'text-sm');
        break;
      case 'medium':
        classNames.push('px-2', 'py-1');
        break;
      case 'large':
        classNames.push('px-4', 'py-2');
        break;
      default:
        break;
    }

    return classNames.join(' ') + ' ' + className;
  };

  return (
    <button ref={ref} className={getStyleClass()} {...props}>
      {props.children}
    </button>
  );
}

const Button = forwardRef(ButtonComponent);

export default Button;
