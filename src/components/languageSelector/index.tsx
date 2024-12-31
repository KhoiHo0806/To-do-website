import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to handle language change
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setIsMenuOpen(false); // Close menu after language change
  };

  return (
    <div className="relative">
      {/* Hamburger Icon for smaller screens */}
      <button
        className="sm:hidden p-2 bg-gray-200 rounded-md"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6 text-gray-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Language Dropdown */}
      {isMenuOpen && (
        <div className="absolute right-0 mt-2 bg-white shadow-md rounded-md w-36 p-2">
          <button
            onClick={() => changeLanguage("en")}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
          >
            English
          </button>
          <button
            onClick={() => changeLanguage("fr")}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
          >
            Français
          </button>
        </div>
      )}

      {/* Desktop Dropdown */}
      <div className="hidden sm:block">
        <select
          onChange={(e) => changeLanguage(e.target.value)}
          className="border p-2 rounded-md"
        >
          <option value="en">English</option>
          <option value="fr">Français</option>
        </select>
      </div>
    </div>
  );
};

export default LanguageSelector;
