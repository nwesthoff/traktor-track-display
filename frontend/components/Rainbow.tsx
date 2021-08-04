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

export default function Rainbow(): ReactElement {
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
      new RainbowPiece("#DB3938", 0, 0, false),
      new RainbowPiece("#EA9840", 1, 10, false),
      new RainbowPiece("#F6EF55", 2, 20, false),
      new RainbowPiece("#579752", 3, 10, true),
      new RainbowPiece("#375FAA", 4, 0, true),
      new RainbowPiece("#623174", 5, 20, true),
    ];

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
        height: "16px",
      }}
      ref={ref}
    />
  );
}
