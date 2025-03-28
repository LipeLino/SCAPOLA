"use client";
import Image from "next/image";
import Link, { LinkProps } from "next/link";
import { useEffect, useState } from "react";
import ThemeToggler from "./ThemeToggler";
import menuData from "./menuData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import AnimatedPartnerLogo from "./AnimatedPartnerLogo"; // Import the new component
import "./styles.css"; // Import the CSS file

// Interface para definir a estrutura do item de menu
interface MenuItem {
  title: string;
  path?: LinkProps["href"];
  submenu?: MenuItem[];
}

const LinkedInButton = () => {
  return (
    <Link
      href="https://www.linkedin.com/company/scapolacomunica"
      prefetch={false}
      className="flex items-center justify-center rounded-full bg-primary px-4 py-2 text-white duration-300 ease-in-out hover:bg-primaryho"
    >
      <FontAwesomeIcon icon={faLinkedin} className="mr-2 h-5 w-5" />
      LinkedIn
    </Link>
  );
};

const Header = () => {
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [dropdownTogglers, setDropdownTogglers] = useState<{
    [key: number]: boolean;
  }>({});
  const [stickyMenu, setStickyMenu] = useState(false);

  // Sticky menu
  const handleStickyMenu = () => {
    setStickyMenu(window.scrollY >= 80);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyMenu);
    return () => {
      window.removeEventListener("scroll", handleStickyMenu);
    };
  }, []);

  const toggleDropdown = (index: number) => {
    setDropdownTogglers((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const partnerLogos = [
    {
      src: "/images/brand/partners/partner_pressmanager.png",
      alt: "Logo do Parceiro PressManager",
      href: "https://www.pressmanager.com.br/",
    },
    // {
    //   src: "/images/brand/brand_aim.svg",
    //   alt: "Logo do Parceiro Exemplo 1",
    //   href: "https://www.example1.com/",
    //   Adicione mais logos conforme necessário
    // }
  ];

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full py-7 ${
        stickyMenu
          ? "bg-white !py-4 shadow transition duration-100 dark:bg-black"
          : ""
      }`}
    >
      <div className="relative mx-auto max-w-c-1390 items-center justify-between px-4 md:px-8 xl:flex 2xl:px-0">
        <div className="flex w-full items-center justify-between xl:w-1/4">
          <Link href="/">
            <div className="flex items-center">
              <Image
                src="/images/logo/logo-dark.svg"
                alt="logo"
                width={119.03}
                height={30}
                className="hidden w-full dark:block"
              />
              <Image
                src="/images/logo/logo-light.svg"
                alt="logo"
                width={119.03}
                height={30}
                className="w-full dark:hidden"
              />
            </div>
          </Link>
          {/* Hamburger Toggle BTN */}
          <button
            aria-label="Toggle navigation"
            className="block xl:hidden"
            onClick={() => setNavigationOpen(!navigationOpen)}
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="absolute right-0 block h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                    !navigationOpen ? "!w-full delay-300" : "w-0"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                    !navigationOpen ? "delay-400 !w-full" : "w-0"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                    !navigationOpen ? "!w-full delay-500" : "w-0"
                  }`}
                ></span>
              </span>
              <span className="du-block absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                    !navigationOpen ? "!h-0 delay-[0]" : "h-full"
                  }`}
                ></span>
                <span
                  className={`delay-400 top- 2.5 absolute left-0 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                    !navigationOpen ? "!h-0 delay-200" : "h-0.5"
                  }`}
                ></span>
              </span>
            </span>
          </button>
        </div>
        {/* Nav Menu Start */}
        <div
          className={`invisible h-0 w-full items-center justify-between xl:visible xl:flex xl:h-auto xl:w-full ${
            navigationOpen &&
            "navbar !visible mt-4 h-auto max-h-[400px] rounded-md bg-white p-7.5 shadow-solid-5 dark:bg-blacksection xl:h-auto xl:p-0 xl:shadow-none xl:dark:bg-transparent"
          }`}
        >
          <nav>
            <ul className="menu-list flex flex-col gap-5 xl:flex-row xl:items-center xl:gap-10">
              {menuData.map((menuItem: MenuItem, index: number) => (
                <li
                  key={index}
                  className={menuItem.submenu ? "group relative" : ""}
                >
                  {menuItem.submenu ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(index)}
                        className="flex cursor-pointer items-center justify-between gap-3 hover:text-primary"
                      >
                        <span className="menu-item">{menuItem.title}</span>
                        <span>
                          <svg
                            className="h-3 w-3 cursor-pointer fill-waterloo group-hover:fill-primary"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                          </svg>
                        </span>
                      </button>
                      <ul
                        className={`dropdown ${dropdownTogglers[index] ? "flex" : "hidden"}`}
                      >
                        {menuItem.submenu.map((item: MenuItem, key: number) => (
                          <li key={key} className="hover:text-primary">
                            <Link
                              href={item.path || "/"}
                              prefetch={false}
                              className="menu-item"
                            >
                              {item.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <Link
                      href={menuItem.path || "/"}
                      className="menu-item"
                      prefetch={false}
                    >
                      {menuItem.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          {/* Logo do Parceiro */}
          <div className="mt-4 flex items-center xl:mt-0">
            <h2 className="menu-item mr-1 text-xs">Parceria: </h2>
            <AnimatedPartnerLogo logos={partnerLogos} />
          </div>
          {/* Bloco de botões */}
          <div className="mt-7 flex items-center justify-center space-x-4 xl:mt-0">
            <ThemeToggler />
            <LinkedInButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
