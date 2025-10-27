import { Link } from 'react-router-dom';
import navData from '../json/navItems.json';
import { useAuthWithBackend } from '../hooks/useAuthWithBackend';

export default function Sidebar() {
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
    <div className="drawer-side">
      <label
        htmlFor="my-drawer-2"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul className="menu bg-base-200 min-h-full w-80 p-4">
        {/* Navigation Items */}
        {visibleNavItems.map((item) => (
          <li key={item.id}>
            <Link to={item.path}>{item.label}</Link>
          </li>
        ))}

        {/* Auth Section - Only visible on small screens */}
        <li className="lg:hidden mt-auto">
          {!isAuthenticated ? (
            <button className="btn btn-primary" onClick={() => loginWithRedirect()}>
              Login
            </button>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 p-2 bg-base-300 rounded-lg">
                <div className="avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt={user?.name || "User"}
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "User")}`}
                    />
                  </div>
                </div>
                <span className="font-medium">{user?.name}</span>
              </div>
              <button
                className="btn btn-outline btn-error btn-sm"
                onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
              >
                Logout
              </button>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
}
