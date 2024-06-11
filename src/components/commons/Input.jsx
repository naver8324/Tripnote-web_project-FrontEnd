import React, { forwardRef } from 'react';
import { GoSearch } from 'react-icons/go';

function InputComponent(
  { variant = 'nomalInput', size = 'medium', className = '', ...props },
  ref,
) {
  const getStyleClass = () => {
    const classNames = ['border', 'p-1', 'border-gray-300'];

    switch (variant) {
      case 'nomalInput':
        classNames.push('rounded');
        break;
      case 'searchInput':
        classNames.push(
          'px-8',
          'py-1',
          'rounded-full',
          'focus:outline-none',
          'focus:ring-1',
          'focus:ring-prime',
        );
        break;
      default:
        break;
    }

    return classNames.join(' ') + ' ' + className;
  };

  return (
    <>
      {variant === 'searchInput' ? (
        <div className="relative">
          <input className={getStyleClass()} {...props} ref={ref} />
          <button type="submit" className="absolute top-0 bottom-0 right-2">
            <GoSearch />
          </button>
        </div>
      ) : (
        <input className={getStyleClass()} {...props} ref={ref} />
      )}
    </>
  );
}

const Input = forwardRef(InputComponent);

export default Input;
