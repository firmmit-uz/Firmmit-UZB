/* ============================================================
   FIRMMIT — suv-ripple effekti (WebGL). Kursor rasm yuzasida
   barmoq suvda harakatlangandek to'lqin/ip qoldiradi.
   Fail-safe: WebGL yo'q bo'lsa null qaytaradi -> chaqiruvchi
   oddiy rasmni ko'rsatib qolaveradi. Mobil/touch'da ham ishlaydi.
   ============================================================ */
(function () {
  'use strict';

  function compile(gl, type, src) {
    var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { return null; }
    return s;
  }
  function program(gl, vs, fs) {
    var v = compile(gl, gl.VERTEX_SHADER, vs), f = compile(gl, gl.FRAGMENT_SHADER, fs);
    if (!v || !f) return null;
    var p = gl.createProgram(); gl.attachShader(p, v); gl.attachShader(p, f); gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) return null;
    return p;
  }

  var VS = 'attribute vec2 a;varying vec2 v;void main(){v=a*0.5+0.5;gl_Position=vec4(a,0.,1.);}';

  var SIM =
    'precision highp float;varying vec2 v;uniform sampler2D s;uniform vec2 r;uniform vec2 d;uniform float ds;uniform float dm;' +
    'void main(){vec2 px=1.0/r;vec4 c=texture2D(s,v);float h=c.r,vel=c.g;' +
    'float sum=texture2D(s,v+vec2(px.x,0.)).r+texture2D(s,v-vec2(px.x,0.)).r+texture2D(s,v+vec2(0.,px.y)).r+texture2D(s,v-vec2(0.,px.y)).r;' +
    'vel+=(sum*0.25-h);vel*=dm;h+=vel;' +
    'if(d.x>=0.0){float dist=distance(v*r,d*r);h+=ds*smoothstep(14.0,0.0,dist);}' +
    'gl_FragColor=vec4(h,vel,0.,1.);}';

  var REND =
    'precision highp float;varying vec2 v;uniform sampler2D s;uniform sampler2D img;uniform vec2 r;uniform vec2 sc;' +
    'void main(){vec2 px=1.0/r;' +
    'float hL=texture2D(s,v-vec2(px.x,0.)).r,hR=texture2D(s,v+vec2(px.x,0.)).r,hD=texture2D(s,v-vec2(0.,px.y)).r,hU=texture2D(s,v+vec2(0.,px.y)).r;' +
    'vec2 g=vec2(hR-hL,hU-hD);' +
    'vec2 iuv=vec2(v.x,1.0-v.y);iuv=(iuv-0.5)*sc+0.5;' +
    'vec3 col=texture2D(img,iuv+g*0.45).rgb;' +
    'float spec=clamp((g.x-g.y)*2.0,0.0,1.0);col+=spec*0.22;' +
    'col-=length(g)*0.15;' +
    'gl_FragColor=vec4(col,1.0);}';

  function makeStateTex(gl, w, h, texType) {
    var t = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, t);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, texType, null);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    return t;
  }

  window.FirmmitRipple = function (canvas, imageUrl) {
    var gl = canvas.getContext('webgl', { premultipliedAlpha: false }) ||
             canvas.getContext('experimental-webgl');
    if (!gl) return null;

    var texType = gl.FLOAT, ext = gl.getExtension('OES_texture_float');
    var cbf = gl.getExtension('WEBGL_color_buffer_float');
    if (!ext || !cbf) {
      var hf = gl.getExtension('OES_texture_half_float');
      var cbhf = gl.getExtension('EXT_color_buffer_half_float');
      if (hf && cbhf) { texType = hf.HALF_FLOAT_OES; }
      else { return null; }  // float FBO yo'q -> fallback
    }
    gl.getExtension('OES_texture_float_linear');

    var pSim = program(gl, VS, SIM), pRend = program(gl, VS, REND);
    if (!pSim || !pRend) return null;

    var quad = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    function bindQuad(p) { var l = gl.getAttribLocation(p, 'a'); gl.enableVertexAttribArray(l); gl.vertexAttribPointer(l, 2, gl.FLOAT, false, 0, 0); }

    var SW = 320, SH = 320;           // simulyatsiya o'lchami
    var texA = makeStateTex(gl, SW, SH, texType), texB = makeStateTex(gl, SW, SH, texType);
    var fbo = gl.createFramebuffer();

    // Rasm teksturasi
    var imgTex = gl.createTexture();
    var imgAspect = 1, ready = false, disposed = false;
    var img = new Image(); img.crossOrigin = 'anonymous';
    img.onload = function () {
      imgAspect = img.naturalWidth / img.naturalHeight;
      gl.bindTexture(gl.TEXTURE_2D, imgTex);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      ready = true;
    };
    img.onerror = function () { disposed = true; };
    img.src = imageUrl;

    var drop = [-1, -1], damp = 0.985;
    var running = true;

    function resize() {
      var w = canvas.clientWidth, h = canvas.clientHeight;
      if (!w || !h) return;
      canvas.width = w; canvas.height = h;
    }
    resize();
    window.addEventListener('resize', resize);

    function coverScale() {
      var canvasAspect = canvas.width / canvas.height;
      // (iuv-0.5)*sc+0.5 uchun: cover
      if (canvasAspect > imgAspect) return [1, imgAspect / canvasAspect];
      return [canvasAspect / imgAspect, 1];
    }

    function simStep() {
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texB, 0);
      gl.viewport(0, 0, SW, SH);
      gl.useProgram(pSim); bindQuad(pSim);
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, texA);
      gl.uniform1i(gl.getUniformLocation(pSim, 's'), 0);
      gl.uniform2f(gl.getUniformLocation(pSim, 'r'), SW, SH);
      gl.uniform2f(gl.getUniformLocation(pSim, 'd'), drop[0], drop[1]);
      gl.uniform1f(gl.getUniformLocation(pSim, 'ds'), 0.55);
      gl.uniform1f(gl.getUniformLocation(pSim, 'dm'), damp);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      var tmp = texA; texA = texB; texB = tmp;
      drop = [-1, -1];
    }

    function render() {
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.useProgram(pRend); bindQuad(pRend);
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, texA);
      gl.uniform1i(gl.getUniformLocation(pRend, 's'), 0);
      gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, imgTex);
      gl.uniform1i(gl.getUniformLocation(pRend, 'img'), 1);
      gl.uniform2f(gl.getUniformLocation(pRend, 'r'), SW, SH);
      var sc = coverScale();
      gl.uniform2f(gl.getUniformLocation(pRend, 'sc'), sc[0], sc[1]);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    function frame() {
      if (disposed) return;
      if (running && ready) { simStep(); simStep(); render(); }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);

    function addDropFromEvent(e) {
      var rect = canvas.getBoundingClientRect();
      var cx = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
      var cy = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
      if (cx < 0 || cy < 0 || cx > rect.width || cy > rect.height) return;
      drop = [cx / rect.width, 1.0 - cy / rect.height];
    }
    canvas.addEventListener('mousemove', addDropFromEvent, { passive: true });
    canvas.addEventListener('touchmove', addDropFromEvent, { passive: true });
    canvas.addEventListener('mousedown', addDropFromEvent, { passive: true });

    return {
      pause: function () { running = false; },
      resume: function () { running = true; },
      dispose: function () { disposed = true; }
    };
  };
})();
