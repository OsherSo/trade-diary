import { Link } from "react-router-dom";
import Logo from "./Logo";
import LogoutContainer from "./LogoutContainer";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link
              to="/dashboard"
              className="flex-shrink-0 flex items-center ml-4"
            >
              <Logo />
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <LogoutContainer />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
