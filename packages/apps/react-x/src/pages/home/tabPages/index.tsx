import React, { useEffect, useRef } from 'react'
import { NavLink, Outlet } from 'react-router-dom';

export const tabs = [
    { name: '关注', to: '/follow'},
    { name: '推荐', to: '/'},
    { name: '热榜', to: '/hot'},
    { name: '视频', to: '/zvideo'},
]

interface Props {
    onChange: (bool: boolean) => void;
}

const TabPage = (props: Props) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    // 当这个 ref 的 div 到顶的时候，我们进行切换
    // 如何判断到顶了？
    // 1. getBoundingClientRect();
    // 2. IntersectionObserver

    useEffect(() => {
        let intersectionObserver: IntersectionObserver | undefined
            = new IntersectionObserver(function(entries) {
                props?.onChange(entries[0].isIntersecting);
         });

         scrollRef.current && intersectionObserver.observe(scrollRef.current);

         return () => {
            scrollRef.current && intersectionObserver?.unobserve(scrollRef.current);
            intersectionObserver = void 0;
         }
    })
console.log('this is sdnknsds')
  return (
    <div className='w-full'>
        <div ref={scrollRef}></div>
        <nav className='flex border-b border-gray-100' id='nav'>
            {
                tabs?.map((item: INav) => <NavLink 
                key={item.to}
                to={item.to}
                className={({ isActive }) => " whitespace-nowrap py-4 px-4 text-base transition-all "
                + (isActive ? " text-blue-500": 'text-black hover:text-blue-900')
            }
                >
                    {item.name}
                </NavLink>)
            }
        </nav>

        <Outlet />
    </div>
  )
}

export default TabPage;