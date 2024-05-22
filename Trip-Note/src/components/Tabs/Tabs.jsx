import React, { useState } from 'react';
import Tab from './Tab';

const Tabs = ({ tabCount, tabLabels, children }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="w-80%">
      <div className="flex space-x-8 mb-4">
        {Array.from(Array(tabCount).keys()).map((index) => (
          <Tab
            key={index}
            label={tabLabels[index]}
            onClick={() => handleTabClick(index)}
            isActive={activeTab === index}
          />
        ))}
      </div>
      <div className="w-full">
        {React.Children.map(children, (child, index) => {
          return index === activeTab ? child : null;
        })}
      </div>
    </div>
  );
};

export default Tabs;
