import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-display text-2xl mb-4">Ruh Al Oud</h3>
            <p className="text-sm opacity-90">
             "Scents Crafted to Your Taste."
            </p>
          </div>

          <div>
            <h4 className="font-display text-lg mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/" className="block text-sm hover:text-accent transition-colors">
                Home
              </Link>
              <Link to="/about" className="block text-sm hover:text-accent transition-colors">
                About Us
              </Link>
              <Link to="/contact" className="block text-sm hover:text-accent transition-colors">
                Contact
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/_ruh_al_oud._" className="hover:text-accent transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              {/* <a href="#" className="hover:text-accent transition-colors">
                <Facebook className="h-5 w-5" />
              </a> */}
              <a href="mailto:ruhaloud123@gmail.com" className="hover:text-accent transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-primary-foreground/10 text-center text-sm opacity-75">
          <p>&copy; {new Date().getFullYear()} Ruh Al Oud. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
