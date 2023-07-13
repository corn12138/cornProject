import React, { FC } from 'react'
import { INav } from '../';
import { NavLink } from 'react-router-dom';



interface IProps {
    navs: Array<INav>;
}

const NavTab: FC<IProps> = ({ navs }) => {
  return (
    <div className=' mx-6 box-border'>
        {
            navs?.map((item: INav) => <NavLink 
            key={item.to}
            to={item.to}
            className={({ isActive }) => "hover:text-black mx-4 h-full py-4 text-gray-400 transition-all "
            + (isActive ? "font-extrabold text-black border-b-4 border-blue-500": '')
        }
            >
                {item.name}
            </NavLink>)
        }
    </div>
  )
}

export default NavTab