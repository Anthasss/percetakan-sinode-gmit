import { Link } from "react-router-dom";
import navData from "../json/navItems.json";
import SearchBar from "./SearchBar";
import { useAuthWithBackend } from '../hooks/useAuthWithBackend';

export default function Navbar() {
  const { loginWithRedirect, logout, isAuthenticated, user, isSyncing, backendUser } = useAuthWithBackend();
  
  // Filter navigation items based on authentication and user role
  const visibleNavItems = navData.navItems.filter((item) => {
    // If not authenticated, only show items that don't require auth
    if (!isAuthenticated) {
      return !item.requiresAuth;
    }
    
    // If authenticated, check if user's role is in the allowed roles
    const userRole = backendUser?.role || 'customer';
    return item.allowedRoles.includes(userRole);
  });

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
      <Link to="/">
        <div className="mx-2 px-2 font-bold flex items-center gap-2">
          <img
            src="/gmit_logo.png"
            alt="GMIT Logo"
            className="h-12 w-auto"
          />
          <div>
            <h1>GMIT</h1>
            <h1>SINODE</h1>
          </div>
        </div>
      </Link>
      <SearchBar />
      <div className="hidden lg:block">
        <ul className="menu menu-horizontal">
          {visibleNavItems.map((item) => (
            <li key={item.id}>
              <Link to={item.path}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-none ml-auto hidden lg:flex items-center gap-2">
        {isSyncing && (
          <span className="loading loading-spinner loading-sm"></span>
        )}
        {!isAuthenticated ? (
          <button className="btn btn-primary" onClick={() => loginWithRedirect()}>
            Login
          </button>
        ) : (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt={user?.name || "User"}
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "User")}`}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li className="menu-title">
                <span>{user?.name}</span>
              </li>
              <li>
                <button
                  onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
