import React from 'react';
import useTabStore from '../../store/useTabStore';


const Tabs = ({ children, className }) => {
  const validChildren = React.Children.toArray(children).filter((child) => {
    return child.type === Tab || child.type === TabContent;
  });

  return <div className={`tabs ${className}`}>{validChildren}</div>;
};

const Tab = ({ index, children, className }) => {
  const { activeIndex, setActiveIndex } = useTabStore();

  return (
      <button
          className={`text-lg font-medium py-3 px-4 text-gray-600 hover:text-gray-900 ${className} ${        activeIndex === index ? 'border-b-2 border-prime' : ''
          }`}
          onClick={() => setActiveIndex(index)}
      >
        {children}
      </button>
  );
};

const TabContent = ({ index, children }) => {
  const { activeIndex } = useTabStore();

  return activeIndex === index ? (
      <div className="tab-content">{children}</div>
  ) : null;
};

Tabs.Tab = Tab;
Tabs.TabContent = TabContent;

export default Tabs;
