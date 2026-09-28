"use client";

import React from "react";
import PageWrapper from "../context/PageWrapper";
import CustomCursor from "./CustomCursor";
import WhatsappButtton from "./WhatsappButtton";
import useLenis from "../hooks/SmoothscrollLenis";

export default function ClientProviders({ children }) {
  useLenis(); // Smooth scroll applied here

  return (
    <>
      <WhatsappButtton />
      <CustomCursor />
      <PageWrapper>{children}</PageWrapper>
    </>
  );
}
