import React, { useState } from 'react';
import Tab from './Tab';

const Tabs = ({ tabCount, tabLabels }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="flex justify-center space-x-8 mb-4">
      {Array.from(Array(tabCount).keys()).map((index) => (
        <Tab
          key={index}
          label={tabLabels[index]}
          onClick={() => handleTabClick(index)}
          isActive={activeTab === index}
        />
      ))}
    </div>
  );
};

export default Tabs;
