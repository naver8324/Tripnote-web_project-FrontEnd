import React, { useEffect, useRef, useState } from 'react';

export default function Navigation({ routes, defaultIndex = 0, children, onTabChange }) {
  const [navIndex, setNavIndex] = useState(defaultIndex);
  const activeTabLine = useRef();
  const activeTab = useRef();

  const changePage = (btn, i) => {
    const { offsetWidth, offsetLeft } = btn;

    activeTabLine.current.style.width = offsetWidth + 'px';
    activeTabLine.current.style.left = offsetLeft + 'px';
    
    setNavIndex(i);
    if (onTabChange) {
      onTabChange(routes[i]);
    }
  };

  useEffect(() => {
    changePage(activeTab.current, defaultIndex);
  }, []);

  return (
    <>
      <div className="relative mt-8 mb-8 bg-white border-b border-grey flex flex-nowrap overflow-x-auto">
        {routes.map((route, i) => {
          return (
            <button
              ref={i === defaultIndex ? activeTab : null}
              key={`${route}-${i}`}
              className={
                'p-4 px-5 ' +
                (navIndex === i ? 'text-title font-semibold' : 'text-gray-300')
              }
              onClick={(e) => {changePage(e.target, i)}}
            >
              {route}
            </button>
          );
        })}
        <hr ref={activeTabLine} className='absolute bottom-0 duration-300 border-title'/>
      </div>
      { Array.isArray(children) ? children[navIndex] : children }
    </>
  );
}