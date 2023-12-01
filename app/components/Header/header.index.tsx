import React from "react";
import Menu from "../Menu/menu.index";
interface HeaderProps {
  title: string;
  menu?: React.FC;
  userMenu?: React.FC;
}
const Header: React.FC<HeaderProps> = ({ title = "Default title" }) => {
  return (
    <div className="w-[--site-max-width] m-auto my-0 justify-between flex items-center bg-gray-100 px-8">
      <Menu items={[
        { label: "Home", link: "/" },
        { label: "Add book", link: "/book/create" },
        { label: "Contact", link: "/contact" },
      ]} />
      <h1>{title}</h1>
      <div>
        Foto
      </div>
    </div>
  );
};

export default Header;
