import React, { createContext, useContext, useState } from 'react';

// Context 생성
const TabsContext = createContext();

// Context Provider 컴포넌트
export function TabsProvider({ children }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <TabsContext.Provider value={{ activeIndex, setActiveIndex }}>
      {children}
    </TabsContext.Provider>
  );
}

// Context 사용을 위한 커스텀 훅
export function useTabs() {
  return useContext(TabsContext);
}
