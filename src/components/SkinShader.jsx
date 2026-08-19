import { useEffect, useRef } from "react";

export default function SkinShader({ className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;

    if (!canvas) return;

    const gl =
      canvas.getContext("webgl", {
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
      }) || canvas.getContext("experimental-webgl");

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
      const shader = gl.createShader(type);

      if (!shader) return null;

      gl.shaderSource(shader, src);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(
          "SkinShader compile error:",
          gl.getShaderInfoLog(shader)
        );

        gl.deleteShader(shader);
        return null;
      }

      return shader;
    };

    const vertexShader = compile(gl.VERTEX_SHADER, vs);
    const fragmentShader = compile(gl.FRAGMENT_SHADER, fs);

    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();

    if (!program) return;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(
        "SkinShader program link error:",
        gl.getProgramInfoLog(program)
      );

      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);

      return;
    }

    const buffer = gl.createBuffer();

    if (!buffer) {
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);

      return;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

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

    const positionLocation = gl.getAttribLocation(
      program,
      "p"
    );

    const timeLocation = gl.getUniformLocation(
      program,
      "t"
    );

    const resolutionLocation = gl.getUniformLocation(
      program,
      "r"
    );

    const mouseLocation = gl.getUniformLocation(
      program,
      "m"
    );

    let mx = 0;
    let my = 0;
    let raf = null;

    let isVisible = true;
    let isRunning = false;
    let destroyed = false;

    const resize = () => {
      if (destroyed) return;

      const d = Math.min(window.devicePixelRatio || 1, 1.5);

      const width = Math.floor(
        canvas.clientWidth * d
      );

      const height = Math.floor(
        canvas.clientHeight * d
      );

      if (
        width > 0 &&
        height > 0 &&
        (canvas.width !== width ||
          canvas.height !== height)
      ) {
        canvas.width = width;
        canvas.height = height;
      }
    };

    const move = (e) => {
      if (!isVisible) return;

      const b = canvas.getBoundingClientRect();

      if (!b.width || !b.height) return;

      mx =
        (e.clientX - b.left) / b.width - 0.5;

      my =
        0.5 -
        (e.clientY - b.top) / b.height;
    };

    const start = performance.now();

    const draw = (now) => {
      if (destroyed || !isVisible) {
        isRunning = false;
        raf = null;
        return;
      }

      resize();

      gl.viewport(
        0,
        0,
        canvas.width,
        canvas.height
      );

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);

      gl.bindBuffer(
        gl.ARRAY_BUFFER,
        buffer
      );

      gl.enableVertexAttribArray(
        positionLocation
      );

      gl.vertexAttribPointer(
        positionLocation,
        2,
        gl.FLOAT,
        false,
        0,
        0
      );

      gl.uniform1f(
        timeLocation,
        (now - start) / 1000
      );

      gl.uniform2f(
        resolutionLocation,
        canvas.width,
        canvas.height
      );

      gl.uniform2f(
        mouseLocation,
        mx,
        my
      );

      gl.drawArrays(
        gl.TRIANGLES,
        0,
        6
      );

      raf = requestAnimationFrame(draw);
    };

    const startRendering = () => {
      if (
        destroyed ||
        !isVisible ||
        isRunning
      ) {
        return;
      }

      isRunning = true;
      raf = requestAnimationFrame(draw);
    };

    const stopRendering = () => {
      if (raf !== null) {
        cancelAnimationFrame(raf);
        raf = null;
      }

      isRunning = false;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;

        if (isVisible) {
          resize();
          startRendering();
        } else {
          stopRendering();
        }
      },
      {
        threshold: 0.01,
      }
    );

    observer.observe(canvas);

    canvas.addEventListener(
      "pointermove",
      move
    );

    window.addEventListener(
      "resize",
      resize
    );

    resize();

    startRendering();

    return () => {
      destroyed = true;

      stopRendering();

      observer.disconnect();

      canvas.removeEventListener(
        "pointermove",
        move
      );

      window.removeEventListener(
        "resize",
        resize
      );

      if (buffer) {
        gl.deleteBuffer(buffer);
      }

      if (program) {
        gl.deleteProgram(program);
      }

      if (vertexShader) {
        gl.deleteShader(vertexShader);
      }

      if (fragmentShader) {
        gl.deleteShader(fragmentShader);
      }
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className={className}
    />
  );
}