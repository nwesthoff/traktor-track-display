import React, { HTMLAttributes, ReactElement } from "react";
import Image from "next/image";
import svgLogo from "../public/assets/logo-ampersand.svg";

export default function Logo({
  ...props
}: HTMLAttributes<HTMLDivElement>): ReactElement {
  return (
    <div
      style={{
        position: "absolute",
        zIndex: 10,
        top: "24px",
        left: "5%",
        width: "80px",
      }}
      {...props}
    >
      <Image layout="responsive" src={svgLogo} />
    </div>
  );
}
