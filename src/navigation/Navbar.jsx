import { Link } from 'react-router-dom';
import navData from '../json/navItems.json';
import SearchBar from './SearchBar';

export default function Navbar() {
  return (
    <div className="navbar bg-base-300 w-full">
      <div className="flex-none lg:hidden">
        <label
          htmlFor="my-drawer-2"
          aria-label="open sidebar"
          className="btn btn-square btn-ghost"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-6 w-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      </div>
      <div className="mx-2 px-2 font-bold">
        <h1>GMIT</h1>
        <h1>SINODE</h1>
      </div>
      <SearchBar />
      <div className="hidden lg:block">
        <ul className="menu menu-horizontal">
          {navData.navItems.map((item) => (
            <li key={item.id}>
              <Link to={item.path}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
