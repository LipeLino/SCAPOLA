'use client';

import { useTheme } from "next-themes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastifyContainer = () => {
  const { theme } = useTheme(); // Só vai rodar no cliente

  return (
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss={false}
      draggable={false}
      pauseOnHover
      theme={theme}  // Aplica o tema atual
    />
  );
};

export default ToastifyContainer;