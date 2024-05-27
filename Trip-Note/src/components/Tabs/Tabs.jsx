import React from 'react';
import useTabStore from '../../store/useTabStore';

// Zustand 스토어 생성

const Tabs = ({ children }) => {
  const validChildren = React.Children.toArray(children).filter((child) => {
    return child.type === Tab || child.type === TabContent;
  });

  return <div className="tabs">{validChildren}</div>;
};

const Tab = ({ index, children }) => {
  const { activeIndex, setActiveIndex } = useTabStore();

  return (
    <button
      className={`text-lg font-medium py-3 px-4 text-gray-600 hover:text-gray-900 ${
        activeIndex === index ? 'border-b-2 border-prime' : ''
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
