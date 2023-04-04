import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import { ModalWindow } from "./Modal";

function AuthModal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <ModalWindow></ModalWindow>
    </>
  );
}

export default AuthModal;
