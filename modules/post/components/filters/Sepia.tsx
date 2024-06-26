import { Shaders, Node, GLSL } from "gl-react";
import React from "react";

import mixArrays from "../utils/MixArrays";

const shaders = Shaders.create({
  sepia: {
    frag: GLSL`
      precision highp float;
      varying vec2 uv;
      uniform sampler2D t;
      uniform mat4 sepia;

      void main () {
        gl_FragColor = sepia * texture2D(t, uv);
      }
    `,
  },
});

export const DefaultValue = 0;

export default function Sepia({ factor = DefaultValue, children: t }: any) {
  const sepia = mixArrays(
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [0.3, 0.3, 0.3, 0, 0.6, 0.6, 0.6, 0, 0.1, 0.1, 0.1, 0, 0.2, 0, -0.2, 1],
    factor
  );

  return (
    <Node
      shader={shaders.sepia}
      uniforms={{
        sepia,
        t,
      }}
    />
  );
}
