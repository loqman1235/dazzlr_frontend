import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full flex items-center justify-center">
      <ul className="flex items-center justify-center flex-wrap">
        <li>
          <Link to="/" className="footer-item">
            Terms of Service
          </Link>
        </li>
        <li>
          <Link to="/" className="footer-item">
            Privacy Policy
          </Link>
        </li>
        <li>
          <Link to="/" className="footer-item">
            Cookie Policy
          </Link>
        </li>
        <li>
          <Link to="/" className="footer-item">
            Accessibility
          </Link>
        </li>
        <li>
          <Link to="/" className="footer-item">
            Help Center
          </Link>
        </li>
        <li>
          <p className="footer-copyrights">&copy; 2023 Dazzlr.</p>
        </li>
      </ul>
    </footer>
  );
};
export default Footer;
