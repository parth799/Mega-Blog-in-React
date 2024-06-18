
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6 px-4">
      <div className="container mx-auto flex flex-col gap-4 md:flex-row md:items-center">
        <p className="text-center">&copy; 2023 Your Company Name. All rights reserved.</p>
        <ul className="flex flex-wrap justify-center md:justify-end gap-4">
          <li>
            <Link to="/terms" className="hover:text-gray-300">
              Terms & Conditions
            </Link>
          </li>
          <li>
            <Link to="/privacy" className="hover:text-gray-300">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-gray-300">
              Contact Us
            </Link>
          </li>
        </ul>
        <div className="flex justify-center md:justify-end gap-4">
          <a href="#" className="hover:text-gray-300">
            <FaFacebook />
          </a>
          <a href="#" className="hover:text-gray-300">
            <FaTwitter />
          </a>
          <a href="#" className="hover:text-gray-300">
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;