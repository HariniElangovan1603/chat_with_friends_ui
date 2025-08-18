import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
export default function Footer() {
  return (
    <footer className="bg-dark text-light py-5 mt-auto">
      <div className="container text-center">
        <h5 className="mb-4">Follow Us</h5>
        <div className="d-flex justify-content-center gap-4 mb-4">
          <a href="https://facebook.com" className="text-light" target="_blank" rel="noopener noreferrer">
            <FaFacebook size={32} />
          </a>
          <a href="https://twitter.com" className="text-light" target="_blank" rel="noopener noreferrer">
            <FaTwitter size={32} />
          </a>
          <a href="https://instagram.com" className="text-light" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={32} />
          </a>
          <a href="https://linkedin.com" className="text-light" target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={32} />
          </a>
        </div>

        <div className="mb-3">
          <a href="/about" className="text-light mx-3 text-decoration-none">About</a>
          <a href="/contact" className="text-light mx-3 text-decoration-none">Contact</a>
          <a href="/privacy" className="text-light mx-3 text-decoration-none">Privacy</a>
        </div>

        <p className="mb-0">&copy; {new Date().getFullYear()} Altalya Solutions. All rights reserved.</p>
      </div>
    </footer>
  );
}
