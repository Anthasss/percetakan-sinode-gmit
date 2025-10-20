import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="drawer">
      <input
        id="my-drawer-2"
        type="checkbox"
        className="drawer-toggle"
      />
      <div className="drawer-content flex flex-col min-h-screen">
        <Navbar />
        {/* Page content here */}
        {children}
        <Footer />
      </div>
      <Sidebar />
    </div>
  );
}
