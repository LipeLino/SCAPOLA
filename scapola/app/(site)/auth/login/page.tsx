import Signin from "@/components/Auth/Signin";
import { Metadata } from "next";
import "react-toastify/dist/ReactToastify.css";
import ToastifyContainer from "@/components/Toastify/ToastifyContainer";

export const metadata: Metadata = {
  title: "Login - Painel de Controle",
  description: "",
  // other metadata
};

const SigninPage = () => {
  return (
    <>
      <Signin />
      <ToastifyContainer/>
    </>
  );
};

export default SigninPage;
