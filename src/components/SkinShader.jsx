import { useEffect, useRef } from "react";

export default function SkinShader({ className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const gl = canvas?.getContext("webgl");

    if (!gl) return;

    const vs = `
      attribute vec2 p;

      void main() {
        gl_Position = vec4(p, 0., 1.);
      }
    `;

    const fs = `
      precision highp float;

      uniform float t;
      uniform vec2 r;
      uniform vec2 m;

      float h(vec2 p) {
        p = fract(p * vec2(127.1, 311.7));
        p += dot(p, p + 34.7);

        return fract(p.x * p.y);
      }

      float n(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);

        f = f * f * (3. - 2. * f);

        float a = h(i);
        float b = h(i + vec2(1, 0));
        float c = h(i + vec2(0, 1));
        float d = h(i + 1.);

        return mix(
          mix(a, b, f.x),
          mix(c, d, f.x),
          f.y
        );
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / r;
        vec2 q = uv - .5;

        q.x *= r.x / r.y;

        float d = length(q);

        float s =
          n(uv * 7. + t * .025) +
          .45 * n(uv * 22. - t * .012);

        float lines = smoothstep(
          .02,
          0.,
          abs(sin(s * 16. - d * 13.))
        );

        float glow = smoothstep(.75, .05, d);
        float cursor = exp(-length(q - m) * 18.);

        vec3 base =
          vec3(.25, .19, .15) +
          vec3(.17, .09, .06) * s;

        base +=
          vec3(.20, .12, .08) * lines * glow +
          vec3(.18, .08, .04) * cursor;

        float alpha = glow * .88;

        gl_FragColor = vec4(base, alpha);
      }
    `;

    const compile = (type, src) => {
      const s = gl.createShader(type);

      gl.shaderSource(s, src);
      gl.compileShader(s);

      return s;
    };

    const p = gl.createProgram();

    gl.attachShader(
      p,
      compile(gl.VERTEX_SHADER, vs)
    );

    gl.attachShader(
      p,
      compile(gl.FRAGMENT_SHADER, fs)
    );

    gl.linkProgram(p);

    const buf = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, buf);

    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1, -1,
         1, -1,
        -1,  1,
        -1,  1,
         1, -1,
         1,  1,
      ]),
      gl.STATIC_DRAW
    );

    const loc = gl.getAttribLocation(p, "p");
    const t = gl.getUniformLocation(p, "t");
    const r = gl.getUniformLocation(p, "r");
    const m = gl.getUniformLocation(p, "m");

    let mx = 0;
    let my = 0;
    let raf;

    const resize = () => {
      const d = Math.min(devicePixelRatio, 2);
      const w = canvas.clientWidth * d;
      const h = canvas.clientHeight * d;

      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };

    const move = (e) => {
      const b = canvas.getBoundingClientRect();

      mx = (e.clientX - b.left) / b.width - 0.5;
      my = 0.5 - (e.clientY - b.top) / b.height;
    };

    canvas.addEventListener("pointermove", move);

    const start = performance.now();

    const draw = (now) => {
      resize();

      gl.viewport(
        0,
        0,
        canvas.width,
        canvas.height
      );

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(p);

      gl.enableVertexAttribArray(loc);

      gl.bindBuffer(gl.ARRAY_BUFFER, buf);

      gl.vertexAttribPointer(
        loc,
        2,
        gl.FLOAT,
        false,
        0,
        0
      );

      gl.uniform1f(
        t,
        (now - start) / 1000
      );

      gl.uniform2f(
        r,
        canvas.width,
        canvas.height
      );

      gl.uniform2f(m, mx, my);

      gl.drawArrays(
        gl.TRIANGLES,
        0,
        6
      );

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);

      canvas.removeEventListener(
        "pointermove",
        move
      );

      window.removeEventListener(
        "resize",
        resize
      );
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className={className}
    />
  );
}