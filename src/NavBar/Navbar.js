import { Logo } from "../Logo/Logo";
import "../NavBar/NavBar.css";

export const Navbar = ({ children }) => {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
};
