import { Link } from "@remix-run/react";
import React, { useState } from "react";

interface MenuItem {
  label: string;
  link: string;
}

interface MenuProps {
  items: MenuItem[];
}

const Menu: React.FC<MenuProps> = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const handleOutsideClick = (event: React.MouseEvent<HTMLOListElement>) => {
    if (event.target === event.currentTarget) {
      setIsOpen(false);
    }
  };

  return (
    <div className="bg-gray-100 w-16 flex flex-col justify-center relative">
      <div className="relative py-3 sm:max-w-xl mx-auto">
        <nav>
          <button
            className="text-gray-500 w-10 h-10 relative focus:outline-none bg-white"
            onClick={handleClick}
          >
            <span className="sr-only">Open main menu</span>
            <div className="block w-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span
                aria-hidden="true"
                className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${isOpen ? 'rotate-45' : '-translate-y-1.5'}`}
              ></span>
              <span
                aria-hidden="true"
                className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${isOpen ? 'opacity-0' : ''}`}
              ></span>
              <span
                aria-hidden="true"
                className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${isOpen ? '-rotate-45 ' : 'translate-y-1.5'}`}
              ></span>
            </div>
          </button>
        </nav>
      </div>
      <ol className={`absolute bg-gray-100 min-w-[200px] transition-all duration-300  border-b-[.5px] border-black ${isOpen ? "top-16" : "bottom-[1000rem]"}`} onClick={handleOutsideClick}>
        {items.map((item, index) => (
          <li key={index} className="pl-4 py-1 border-[.5px] border-black border-b-0 last:border-b-0">
            <Link to={item.link} onClick={handleLinkClick}>
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Menu;
