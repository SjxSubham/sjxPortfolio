// import { useRef, useEffect, useState } from 'react';
// import { Renderer, Camera, Transform, Program, Mesh, Geometry } from 'ogl';

// const vertex = /* glsl */ `
// attribute vec2 position;
// void main(){
//   gl_Position=vec4(position,0.,1.);
// }
// `;

// const fragment = /* glsl */ `
// precision mediump float;
// uniform float iTime;
// uniform vec2  iResolution;
// uniform vec2  uOffset;
// uniform float uRotation;
// uniform float focalLength;
// uniform float speed1;
// uniform float speed2;
// uniform float dir2;
// uniform float bend1;
// uniform float bend2;
// uniform float bendAdj1;
// uniform float bendAdj2;
// uniform float uOpacity;

// const float lt   = 0.3;
// const float pi   = 3.141592653589793;
// const float pi2  = pi * 2.0;
// const float pi_2 = pi * 0.5;
// #define MAX_STEPS 15

// void mainImage(out vec4 C, in vec2 U) {
//   float t = iTime * pi;
//   float s = 1.0;
//   float d = 0.0;
//   vec2  R = iResolution;
//   vec2  m = vec2(0.0);

//   vec3 o = vec3(0.0, 0.0, -7.0);
//   vec3 u = normalize(vec3((U - 0.5 * R) / R.y, focalLength));
//   vec3 k = vec3(0.0);
//   vec3 p;

//   float t1 = t * 0.7;
//   float t2 = t * 0.9;
//   float tSpeed1 = t * speed1;
//   float tSpeed2 = t * speed2 * dir2;

//   for (int step = 0; step < MAX_STEPS; ++step) {
//     p = o + u * d;
//     p.x  -= 15.0;

//     float px = p.x;
//     float wob1 = bend1 + bendAdj1 + sin(t1 + px * 0.8) * 0.1;
//     float wob2 = bend2 + bendAdj2 + cos(t2 + px * 1.1) * 0.1;

//     float px2 = px + pi_2;
//     vec2 baseOffset = vec2(px, px2);
//     vec2 sinOffset  = sin(baseOffset + tSpeed1) * wob1;
//     vec2 cosOffset  = cos(baseOffset + tSpeed2) * wob2;

//     vec2 yz = p.yz;
//     float wSin = length(yz - sinOffset) - lt;
//     float wCos = length(yz - cosOffset) - lt;

//     k.x = max(px + lt, wSin);
//     k.y = max(px + lt, wCos);

//     float current = min(k.x, k.y);
//     s = min(s, current);
//     if (s < 0.001 || d > 400.0) break;
//     d += s * 0.7;
//   }

//   vec3 c = max(cos(d * pi2) - s * sqrt(d) - k, 0.0);
//   c.gb += 0.1;
//   if (max(c.r, max(c.g, c.b)) < 0.15) discard;
//   c = c * 0.4 + c.brg * 0.6 + c * c;
//   C = vec4(clamp(c, 0.0, 1.0), uOpacity);
// }

// void main() {
//   vec2 coord = gl_FragCoord.xy + uOffset;
//   coord -= 0.5 * iResolution;
//   float c = cos(uRotation), s = sin(uRotation);
//   coord = mat2(c, -s, s, c) * coord;
//   coord += 0.5 * iResolution;

//   vec4 color;
//   mainImage(color, coord);
//   gl_FragColor = color;
// }
// `;

// export default function PlasmaWaveV2({
//   xOffset = 0,
//   yOffset = 0,
//   rotationDeg = 0,
//   focalLength = 0.8,
//   speed1 = 0.05,
//   speed2 = 0.05,
//   dir2 = 1.0,
//   bend1 = 1,
//   bend2 = 0.5,
//   fadeInDuration = 2000,
//   pauseWhenOffscreen = true,
//   rootMargin = '200px',
//   autoPauseOnScroll = true,
//   scrollPauseThreshold = null,
//   resumeOnScrollUp = false,
//   dynamicDpr = false
// }) {
//   const [isMobile, setIsMobile] = useState(false);
//   const containerRef = useRef(null);
//   const uniformOffset = useRef(new Float32Array([xOffset, yOffset]));
//   const uniformResolution = useRef(new Float32Array([1, 1]));
//   const rendererRef = useRef(null);
//   const fadeStartTime = useRef(null);
//   const startTimeRef = useRef(0);
//   const resizeTimeoutRef = useRef(null);
//   const rafRef = useRef(null);
//   const runningRef = useRef(false);
//   const observerRef = useRef(null);
//   const permaPausedRef = useRef(false);
//   const startStopApiRef = useRef({ start: () => { }, stop: () => { } });
//   const appliedScrollThresholdRef = useRef(null);

//   const propsRef = useRef({});
//   propsRef.current = { xOffset, yOffset, rotationDeg, focalLength, speed1, speed2, dir2, bend1, bend2, fadeInDuration };

//   useEffect(() => {
//     const f = () => setIsMobile(window.innerWidth <= 768);
//     f();
//     window.addEventListener('resize', f);
//     return () => window.removeEventListener('resize', f);
//   }, []);

//   useEffect(() => {
//     if (isMobile) return;

//     const renderer = new Renderer({
//       alpha: true,
//       dpr: Math.min(window.devicePixelRatio, 1),
//       antialias: false,
//       depth: false,
//       stencil: false,
//       powerPreference: 'high-performance',
//     });
//     rendererRef.current = renderer;

//     const gl = renderer.gl;
//     gl.clearColor(0, 0, 0, 0);
//     containerRef.current.appendChild(gl.canvas);

//     const camera = new Camera(gl);
//     const scene = new Transform();

//     const geometry = new Geometry(gl, { position: { size: 2, data: new Float32Array([-1, -1, 3, -1, -1, 3]) } });

//     const program = new Program(gl, {
//       vertex,
//       fragment,
//       uniforms: {
//         iTime: { value: 0 },
//         iResolution: { value: uniformResolution.current },
//         uOffset: { value: uniformOffset.current },
//         uRotation: { value: 0 },
//         focalLength: { value: focalLength },
//         speed1: { value: speed1 },
//         speed2: { value: speed2 },
//         dir2: { value: dir2 },
//         bend1: { value: bend1 },
//         bend2: { value: bend2 },
//         bendAdj1: { value: 0 },
//         bendAdj2: { value: 0 },
//         uOpacity: { value: 0 },
//       },
//     });
//     new Mesh(gl, { geometry, program }).setParent(scene);

//     const applySize = () => {
//       const el = containerRef.current; if (!el) return; const { width, height } = el.getBoundingClientRect();
//       const rw = width * renderer.dpr, rh = height * renderer.dpr;
//       if (rw === uniformResolution.current[0] && rh === uniformResolution.current[1]) return;
//       renderer.setSize(width, height);
//       uniformResolution.current[0] = rw; uniformResolution.current[1] = rh;
//       gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
//     };

//     applySize();

//     const resize = () => { if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current); resizeTimeoutRef.current = setTimeout(() => { applySize(); resizeTimeoutRef.current = null; }, 150); };
//     const ro = new ResizeObserver(resize);
//     ro.observe(containerRef.current);

//     startTimeRef.current = performance.now();

//     const loop = now => {
//       const {
//         xOffset: xOff,
//         yOffset: yOff,
//         rotationDeg: rot,
//         focalLength: fLen,
//         fadeInDuration: fadeDur,
//       } = propsRef.current;
//       const t = (now - startTimeRef.current) * 0.001;
//       if (fadeStartTime.current === null && t > 0.1) fadeStartTime.current = now;
//       let opacity = 0;
//       if (fadeStartTime.current !== null) { const fe = now - fadeStartTime.current; opacity = Math.min(fe / fadeDur, 1); opacity = 1 - Math.pow(1 - opacity, 3); }
//       uniformOffset.current[0] = xOff;
//       uniformOffset.current[1] = yOff;
//       program.uniforms.iTime.value = t;
//       program.uniforms.uRotation.value = rot * Math.PI / 180;
//       program.uniforms.focalLength.value = fLen;
//       program.uniforms.uOpacity.value = opacity;
//       renderer.render({ scene, camera });
//       if (runningRef.current) rafRef.current = requestAnimationFrame(loop);
//     };
//     const start = () => { if (runningRef.current || permaPausedRef.current) return; runningRef.current = true; startTimeRef.current = performance.now() - program.uniforms.iTime.value * 1000; if (dynamicDpr) { const target = Math.min(window.devicePixelRatio, 1); if (renderer.dpr !== target) renderer.dpr = target; } renderer.render({ scene, camera }); rafRef.current = requestAnimationFrame(loop); };
//     const stop = () => { runningRef.current = false; if (rafRef.current) cancelAnimationFrame(rafRef.current); };
//     startStopApiRef.current = { start, stop };

//     start();

//     const containerEl = containerRef.current;
//     if (pauseWhenOffscreen && 'IntersectionObserver' in window) {
//       observerRef.current = new IntersectionObserver(e => { const n = e[0]; if (!n) return; if (n.isIntersecting) start(); else stop(); }, { root: null, rootMargin, threshold: 0 });
//       if (containerEl) observerRef.current.observe(containerEl);
//     }

//     return () => {
//       runningRef.current = false;
//       if (rafRef.current) cancelAnimationFrame(rafRef.current);
//       ro.disconnect();
//       if (resizeTimeoutRef.current) {
//         clearTimeout(resizeTimeoutRef.current);
//         resizeTimeoutRef.current = null;
//       }
//       if (observerRef.current && containerEl) { if (typeof observerRef.current.unobserve === 'function') observerRef.current.unobserve(containerEl); observerRef.current.disconnect(); observerRef.current = null; }
//       renderer.gl.canvas.remove();
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [isMobile]);

//   useEffect(() => {
//     if (isMobile || !autoPauseOnScroll) return;
//     if (!appliedScrollThresholdRef.current) appliedScrollThresholdRef.current = scrollPauseThreshold ?? Math.round(window.innerHeight * 1.2);
//     const limit = appliedScrollThresholdRef.current;
//     const onScroll = () => { const y = window.scrollY || window.pageYOffset; if (!permaPausedRef.current && y > limit) { startStopApiRef.current.stop(); if (!resumeOnScrollUp) permaPausedRef.current = true; } else if (resumeOnScrollUp && y <= limit && !permaPausedRef.current) { startStopApiRef.current.start(); } };
//     window.addEventListener('scroll', onScroll, { passive: true });
//     onScroll();
//     return () => window.removeEventListener('scroll', onScroll);
//   }, [isMobile, autoPauseOnScroll, scrollPauseThreshold, resumeOnScrollUp]);

//   if (isMobile) return null;

//   return (
//     <div ref={containerRef} style={{ position: 'absolute', inset: 0, overflow: 'hidden', width: '100vw', height: '100vh', pointerEvents: 'none', willChange: 'opacity' }}>
//       <div
//         style={{
//           position: 'absolute',
//           bottom: 0,
//           left: 0,
//           right: 0,
//           height: 200,
//           background: 'linear-gradient(to top, #060010, transparent)',
//           pointerEvents: 'none',
//           zIndex: 1,
//         }}
//       />
//     </div>
//   );
// }


import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle, Vec3 } from "ogl";

export default function Orb({
  hue = 0,
  hoverIntensity = 0.2,
  rotateOnHover = true,
  forceHoverState = false,
}) {
  const ctnDom = useRef(null);

  const vert = /* glsl */ `
    precision highp float;
    attribute vec2 position;
    attribute vec2 uv;
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `;

  const frag = /* glsl */ `
    precision highp float;

    uniform float iTime;
    uniform vec3 iResolution;
    uniform float hue;
    uniform float hover;
    uniform float rot;
    uniform float hoverIntensity;
    varying vec2 vUv;

    vec3 rgb2yiq(vec3 c) {
      float y = dot(c, vec3(0.299, 0.587, 0.114));
      float i = dot(c, vec3(0.596, -0.274, -0.322));
      float q = dot(c, vec3(0.211, -0.523, 0.312));
      return vec3(y, i, q);
    }
    
    vec3 yiq2rgb(vec3 c) {
      float r = c.x + 0.956 * c.y + 0.621 * c.z;
      float g = c.x - 0.272 * c.y - 0.647 * c.z;
      float b = c.x - 1.106 * c.y + 1.703 * c.z;
      return vec3(r, g, b);
    }
    
    vec3 adjustHue(vec3 color, float hueDeg) {
      float hueRad = hueDeg * 3.14159265 / 180.0;
      vec3 yiq = rgb2yiq(color);
      float cosA = cos(hueRad);
      float sinA = sin(hueRad);
      float i = yiq.y * cosA - yiq.z * sinA;
      float q = yiq.y * sinA + yiq.z * cosA;
      yiq.y = i;
      yiq.z = q;
      return yiq2rgb(yiq);
    }

    vec3 hash33(vec3 p3) {
      p3 = fract(p3 * vec3(0.1031, 0.11369, 0.13787));
      p3 += dot(p3, p3.yxz + 19.19);
      return -1.0 + 2.0 * fract(vec3(
        p3.x + p3.y,
        p3.x + p3.z,
        p3.y + p3.z
      ) * p3.zyx);
    }

    float snoise3(vec3 p) {
      const float K1 = 0.333333333;
      const float K2 = 0.166666667;
      vec3 i = floor(p + (p.x + p.y + p.z) * K1);
      vec3 d0 = p - (i - (i.x + i.y + i.z) * K2);
      vec3 e = step(vec3(0.0), d0 - d0.yzx);
      vec3 i1 = e * (1.0 - e.zxy);
      vec3 i2 = 1.0 - e.zxy * (1.0 - e);
      vec3 d1 = d0 - (i1 - K2);
      vec3 d2 = d0 - (i2 - K1);
      vec3 d3 = d0 - 0.5;
      vec4 h = max(0.6 - vec4(
        dot(d0, d0),
        dot(d1, d1),
        dot(d2, d2),
        dot(d3, d3)
      ), 0.0);
      vec4 n = h * h * h * h * vec4(
        dot(d0, hash33(i)),
        dot(d1, hash33(i + i1)),
        dot(d2, hash33(i + i2)),
        dot(d3, hash33(i + 1.0))
      );
      return dot(vec4(31.316), n);
    }

    vec4 extractAlpha(vec3 colorIn) {
      float a = max(max(colorIn.r, colorIn.g), colorIn.b);
      return vec4(colorIn.rgb / (a + 1e-5), a);
    }

    const vec3 baseColor1 = vec3(0.611765, 0.262745, 0.996078);
    const vec3 baseColor2 = vec3(0.298039, 0.760784, 0.913725);
    const vec3 baseColor3 = vec3(0.062745, 0.078431, 0.600000);
    const float innerRadius = 0.6;
    const float noiseScale = 0.65;

    float light1(float intensity, float attenuation, float dist) {
      return intensity / (1.0 + dist * attenuation);
    }
    float light2(float intensity, float attenuation, float dist) {
      return intensity / (1.0 + dist * dist * attenuation);
    }

    vec4 draw(vec2 uv) {
      vec3 color1 = adjustHue(baseColor1, hue);
      vec3 color2 = adjustHue(baseColor2, hue);
      vec3 color3 = adjustHue(baseColor3, hue);
      
      float ang = atan(uv.y, uv.x);
      float len = length(uv);
      float invLen = len > 0.0 ? 1.0 / len : 0.0;
      
      float n0 = snoise3(vec3(uv * noiseScale, iTime * 0.5)) * 0.5 + 0.5;
      float r0 = mix(mix(innerRadius, 1.0, 0.4), mix(innerRadius, 1.0, 0.6), n0);
      float d0 = distance(uv, (r0 * invLen) * uv);
      float v0 = light1(1.0, 10.0, d0);
      v0 *= smoothstep(r0 * 1.05, r0, len);
      float cl = cos(ang + iTime * 2.0) * 0.5 + 0.5;
      
      float a = iTime * -1.0;
      vec2 pos = vec2(cos(a), sin(a)) * r0;
      float d = distance(uv, pos);
      float v1 = light2(1.5, 5.0, d);
      v1 *= light1(1.0, 50.0, d0);
      
      float v2 = smoothstep(1.0, mix(innerRadius, 1.0, n0 * 0.5), len);
      float v3 = smoothstep(innerRadius, mix(innerRadius, 1.0, 0.5), len);
      
      vec3 col = mix(color1, color2, cl);
      col = mix(color3, col, v0);
      col = (col + v1) * v2 * v3;
      col = clamp(col, 0.0, 1.0);
      
      return extractAlpha(col);
    }

    vec4 mainImage(vec2 fragCoord) {
      vec2 center = iResolution.xy * 0.5;
      float size = min(iResolution.x, iResolution.y);
      vec2 uv = (fragCoord - center) / size * 2.0;
      
      float angle = rot;
      float s = sin(angle);
      float c = cos(angle);
      uv = vec2(c * uv.x - s * uv.y, s * uv.x + c * uv.y);
      
      uv.x += hover * hoverIntensity * 0.1 * sin(uv.y * 10.0 + iTime);
      uv.y += hover * hoverIntensity * 0.1 * sin(uv.x * 10.0 + iTime);
      
      return draw(uv);
    }

    void main() {
      vec2 fragCoord = vUv * iResolution.xy;
      vec4 col = mainImage(fragCoord);
      gl_FragColor = vec4(col.rgb * col.a, col.a);
    }
  `;

  useEffect(() => {
    const container = ctnDom.current;
    if (!container) return;

    const renderer = new Renderer({ alpha: true, premultipliedAlpha: false });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    container.appendChild(gl.canvas);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: vert,
      fragment: frag,
      uniforms: {
        iTime: { value: 0 },
        iResolution: {
          value: new Vec3(
            gl.canvas.width,
            gl.canvas.height,
            gl.canvas.width / gl.canvas.height
          ),
        },
        hue: { value: hue },
        hover: { value: 0 },
        rot: { value: 0 },
        hoverIntensity: { value: hoverIntensity },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    function resize() {
      if (!container) return;
      const dpr = window.devicePixelRatio || 1;
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width * dpr, height * dpr);
      gl.canvas.style.width = width + "px";
      gl.canvas.style.height = height + "px";
      program.uniforms.iResolution.value.set(
        gl.canvas.width,
        gl.canvas.height,
        gl.canvas.width / gl.canvas.height
      );
    }
    window.addEventListener("resize", resize);
    resize();

    let targetHover = 0;
    let lastTime = 0;
    let currentRot = 0;
    const rotationSpeed = 0.3;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const width = rect.width;
      const height = rect.height;
      const size = Math.min(width, height);
      const centerX = width / 2;
      const centerY = height / 2;
      const uvX = ((x - centerX) / size) * 2.0;
      const uvY = ((y - centerY) / size) * 2.0;

      if (Math.sqrt(uvX * uvX + uvY * uvY) < 0.8) {
        targetHover = 1;
      } else {
        targetHover = 0;
      }
    };

    const handleMouseLeave = () => {
      targetHover = 0;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    let rafId;
    const update = (t) => {
      rafId = requestAnimationFrame(update);
      const dt = (t - lastTime) * 0.001;
      lastTime = t;
      program.uniforms.iTime.value = t * 0.001;
      program.uniforms.hue.value = hue;
      program.uniforms.hoverIntensity.value = hoverIntensity;

      const effectiveHover = forceHoverState ? 1 : targetHover;
      program.uniforms.hover.value += (effectiveHover - program.uniforms.hover.value) * 0.1;

      if (rotateOnHover && effectiveHover > 0.5) {
        currentRot += dt * rotationSpeed;
      }
      program.uniforms.rot.value = currentRot;

      renderer.render({ scene: mesh });
    };
    rafId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeChild(gl.canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hue, hoverIntensity, rotateOnHover, forceHoverState]);

  return <div ref={ctnDom} className="w-full h-full" />;
}
