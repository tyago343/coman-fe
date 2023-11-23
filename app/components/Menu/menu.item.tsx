import { Link } from "react-router-dom";
import { RiArrowRightSLine } from 'react-icons/ri/index.js';
import type { MenuItem } from "./menu.index";
export default function MenuItem({ label, link }: MenuItem, key: string | number) {
  return (
    <li key={key} className="pl-4 py-1 border-[.5px] border-black border-b-0 last:border-b-0">
      <div className="flex items-center">
        <Link to={link}>
          {label}
        </Link>
        <RiArrowRightSLine />
      </div>
    </li>
  );
}


