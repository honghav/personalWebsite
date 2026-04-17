// components/Footer.tsx
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-500 text-sm">
              © {currentYear} Your Name. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <a href="https://github.com" className="text-gray-400 hover:text-gray-900 transition-colors">
              GitHub
            </a>
            <a href="https://linkedin.com" className="text-gray-400 hover:text-gray-900 transition-colors">
              LinkedIn
            </a>
            <a href="https://twitter.com" className="text-gray-400 hover:text-gray-900 transition-colors">
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;