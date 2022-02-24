import React, { ReactElement, useEffect, useRef } from "react";
import { Noise } from "noisejs";

const noise = new Noise(Math.random());
const basePercentage = 1 / 6; // 16.66%

class RainbowPiece {
  constructor(color, baseX, noiseX, invert) {
    this.color = color;
    // this.baseX = baseX * basePercentage;
    this.noiseX = noiseX;
    this.invert = invert;
    // this.x = 0;
    this.width = basePercentage;
  }

  width: number;
  invert: boolean;
  noiseX: any;
  color: string;
  x: number;

  update(now, prevPiece) {
    let n = noise.simplex2(this.noiseX, now / 7500) / 4 + 0.5;
    n = this.invert ? 1 - n : n;
    this.width = basePercentage * n;

    this.x = prevPiece ? prevPiece.x + prevPiece.width : 0;
  }
}

interface Props {
  colors?: string[];
  thiccness?: string;
}

export default function Rainbow({
  colors = ["#DB3938", "#EA9840", "#F6EF55", "#579752", "#375FAA", "#623174"],
  thiccness = "16px",
}: Props): ReactElement {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");

    const canvasWidth = canvas.getBoundingClientRect().width;
    const canvasHeight = canvas.getBoundingClientRect().height;

    let width = canvasWidth * (window.devicePixelRatio || 1);
    let height = canvasHeight * (window.devicePixelRatio || 1);

    canvas.width = width;
    canvas.height = height;

    window.requestAnimationFrame(draw);

    const rainbow = [
      new RainbowPiece(colors[0], 0, 0, false),
      new RainbowPiece(colors[1], 1, 10, false),
      new RainbowPiece(colors[2], 2, 20, false),
      new RainbowPiece(colors[3], 3, 10, true),
      new RainbowPiece(colors[4], 4, 0, true),
      new RainbowPiece(colors[5], 5, 20, true),
    ];

    if (colors.length !== 6) {
      throw new Error("Rainbow needs 6 colors");
    }

    function draw(now) {
      ctx.clearRect(0, 0, width, height);

      rainbow.forEach((piece, i) => {
        const prevPiece = rainbow[i - 1];
        piece.update(now, prevPiece);

        ctx.fillStyle = piece.color;

        ctx.fillRect(piece.x * width * 2, 0, piece.width * width * 2, height);
      });

      window.requestAnimationFrame(draw);
    }
  }, []);

  return (
    <canvas
      style={{
        width: "100%",
        height: thiccness,
      }}
      ref={ref}
    />
  );
}
