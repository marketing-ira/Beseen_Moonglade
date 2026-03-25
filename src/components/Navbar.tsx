import React from "react";
import { Link, navigate } from "gatsby";
import Button from "./common/Button";
import { NavLinks } from "../types/NavbarTypes";
import NavLogo from "../assets/images/nav-logo.svg";
import MobileMenu from "../assets/images/mobile-nav-icon.svg";
import { StaticImage } from "gatsby-plugin-image";

interface NavbarPropsType {
  setIsModalTitle: React.Dispatch<React.SetStateAction<boolean>>;
  setIsModalShow: (state: boolean) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Navbar({ setIsModalShow, setIsModalTitle, isMobileMenuOpen, setIsMobileMenuOpen }: NavbarPropsType) {

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const openModal = () => {
    setIsModalTitle(true);
    setIsModalShow(true);
  };

  const scrollToSection = (url: string) => {
    closeMobileMenu();

    if (url === "/") {
      navigate("/");
      return;
    }

    if (typeof window !== "undefined" && !document.getElementById(url)) {
      navigate(`/#${url}`);
      return;
    }

    // Scroll within same page
    const element = document.getElementById(url);
    if (element) {
      const navbarHeight =
        window.innerWidth >= 1024 ? 88 : window.innerWidth >= 640 ? 76 : 64;

      window.scrollTo({
        top: element.offsetTop - navbarHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 px-4 sm:px-[120px] bg-bgPrimary z-[999] h-[64px] sm:h-[76px] lg:h-[88px] w-full">
      <nav className="flex items-center justify-between h-full">
        <Link to="/" aria-label="Home">
          <div className="w-[118px] md:w-[237px]">
            {/* <NavLogo /> */}
            <StaticImage src="../assets/images/nav-logo.svg" alt="Beseen Moonglade" />
          </div>
        </Link>

        <div className="items-center hidden gap-10 lg:flex">
          {NavLinks.map((link) => (
            <button
              key={link.url}
              onClick={() => scrollToSection(link.url)}
              className="font-['Prata'] text-primaryText text-lg xl:text-xl 2xl:text-2xl hover:opacity-80"
            >
              {link.label}
            </button>
          ))}

          <Button onclick={openModal} label="Schedule Site Visit" />
        </div>

        <button
          onClick={toggleMobileMenu}
          className="p-2 ml-auto lg:hidden"
          aria-label="Toggle mobile menu"
        >
          <div className="w-6 h-6 sm:h-7 sm:w-7">
            {/* <MobileMenu /> */}
            <StaticImage src="../assets/images/mobile-nav-icon.svg" alt="Mobile Menu Icon" />
          </div>
        </button>
      </nav>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      <aside
        className={`fixed top-0 right-0 h-full w-80 bg-bgPrimary shadow-2xl z-[70] transform transition-transform duration-300 lg:hidden
          ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <header className="flex items-center justify-between p-6 border-b">
          <div className="h-8">
            {/* <NavLogo /> */}
            <StaticImage src="../assets/images/nav-logo.svg" alt="Beseen Moonglade" />
          </div>

          <button onClick={closeMobileMenu} aria-label="Close">
            ✕
          </button>
        </header>

        <nav className="px-6 py-8">
          <ul className="flex flex-col space-y-6">
            {NavLinks.map((link) => (
              <li key={link.url}>
                <button
                  onClick={() => scrollToSection(link.url)}
                  className="font-['Prata'] text-primaryText text-xl hover:opacity-80"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <footer className="p-6 border-t">
          <Button onclick={openModal} label="Book a site Visit" />
        </footer>
      </aside>
    </header>
  );
}

export default Navbar;
