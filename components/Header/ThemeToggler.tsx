import { useTheme } from "next-themes";
import Image from "next/image";

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      aria-label="theme toggler"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
    >
      <Image
        src="/images/icon/icon-moon.svg"
        alt="Dark mode"
        width={20}
        height={20}
        className="dark:hidden"
      />
      <Image
        src="/images/icon/icon-sun.svg"
        alt="Light mode"
        width={20}
        height={20}
        className="hidden dark:block"
      />
    </button>
  );
};

export default ThemeToggler;
