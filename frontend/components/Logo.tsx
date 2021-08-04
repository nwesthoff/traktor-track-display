import React, { ReactElement } from "react";
import Image from "next/image";
import svgLogo from "../public/assets/logo-ampersand.svg";

interface Props {}

export default function Logo({}: Props): ReactElement {
  return (
    <div
      style={{
        position: "absolute",
        zIndex: 10,
        top: "24px",
        left: "5%",
        width: "80px",
      }}
    >
      <Image layout="responsive" src={svgLogo} />
    </div>
  );
}
