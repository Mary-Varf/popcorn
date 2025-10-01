import Logo from "./Logo";
import Search from "./Search";
import NavResult from "./NavResult";

const Navbar = () => {
  return (
    <nav className="nav-bar">
      <Logo />
      <Search />
      <NavResult />
    </nav>
  );
};

export default Navbar;
