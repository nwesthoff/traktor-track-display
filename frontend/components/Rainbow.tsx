import React, { ReactElement } from "react";

interface Props {}

const colors = [
  "#DB3938",
  "#EA9840",
  "#F6EF55",
  "#579752",
  "#375FAA",
  "#623174",
];

export default function Rainbow({}: Props): ReactElement {
  return (
    <div style={{ width: "100%", display: "flex" }}>
      {colors.map((color) => (
        <div
          key={color}
          style={{
            height: "15px",
            background: color,
            width: 100 / colors.length + "%",
            marginBottom: "1.2rem",
          }}
        />
      ))}
    </div>
  );
}
