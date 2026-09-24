/* ============================================================
   FIRMMIT — suv-refraksiya effekti (WebGL).
   Kursor yurgan joyga mayda, juda ko'p suv tomchilari purkaladi;
   ular SHAFFOF bo'lib, orqadagi manzarani (rasmni) sindirib
   (refraksiya) ko'rsatadi, keyin asta bug'lanadi. TO'LQIN YO'Q.
   Fail-safe: WebGL/float yo'q bo'lsa null -> oddiy rasm qoladi.
   ============================================================ */
(function () {
  'use strict';

  function compile(gl, t, src){ var s=gl.createShader(t); gl.shaderSource(s,src); gl.compileShader(s);
    return gl.getShaderParameter(s,gl.COMPILE_STATUS)? s : null; }
  function prog(gl, vs, fs){ var v=compile(gl,gl.VERTEX_SHADER,vs), f=compile(gl,gl.FRAGMENT_SHADER,fs);
    if(!v||!f) return null; var p=gl.createProgram(); gl.attachShader(p,v); gl.attachShader(p,f); gl.linkProgram(p);
    return gl.getProgramParameter(p,gl.LINK_STATUS)? p : null; }

  var VS = 'attribute vec2 a;varying vec2 v;void main(){v=a*0.5+0.5;gl_Position=vec4(a,0.,1.);}';

  // Droplet maydoni: yumshoq tarqalish + bug'lanish + ko'p tomchi (to'lqinsiz)
  var SIM =
    'precision highp float;varying vec2 v;uniform sampler2D s;uniform vec2 r;' +
    'uniform vec2 drops[24];uniform int nd;uniform float dr;uniform float ds;' +
    'void main(){vec2 px=1.0/r;float h=texture2D(s,v).r;' +
    'float sum=texture2D(s,v+vec2(px.x,0.)).r+texture2D(s,v-vec2(px.x,0.)).r+texture2D(s,v+vec2(0.,px.y)).r+texture2D(s,v-vec2(0.,px.y)).r;' +
    'h=mix(h,sum*0.25,0.16);h*=0.955;' +
    'for(int i=0;i<24;i++){if(i>=nd)break;float d=distance(v*r,drops[i]*r);h+=ds*smoothstep(dr,0.0,d);}' +
    'gl_FragColor=vec4(h,0.,0.,1.);}';

  // Refraksiya: suv qalinligi/qiyaligiga qarab fonni sindiradi + shaffof yaltirash
  var REND =
    'precision highp float;varying vec2 v;uniform sampler2D s;uniform sampler2D img;uniform vec2 r;uniform vec2 sc;' +
    'void main(){vec2 px=1.0/r;' +
    'float hL=texture2D(s,v-vec2(px.x,0.)).r,hR=texture2D(s,v+vec2(px.x,0.)).r,hD=texture2D(s,v-vec2(0.,px.y)).r,hU=texture2D(s,v+vec2(0.,px.y)).r;' +
    'float h=texture2D(s,v).r;vec2 g=vec2(hR-hL,hU-hD);' +
    'vec2 iuv=vec2(v.x,1.0-v.y);iuv=(iuv-0.5)*sc+0.5;' +
    'vec2 refr=g*1.15;' +                                   // fonni sindirish (refraksiya)
    'vec3 col=texture2D(img,iuv+refr).rgb;' +
    'float sheen=clamp((g.x-g.y)*3.5,0.0,1.0);col+=sheen*0.16;' +   // shaffof yaltirash
    'col+=h*0.04;' +                                        // yupqa yorug'lik
    'gl_FragColor=vec4(col,1.0);}';

  function stateTex(gl,w,h,tt){ var t=gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D,t);
    gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,w,h,0,gl.RGBA,tt,null);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE); return t; }

  window.FirmmitRipple = function (canvas, imageUrl) {
    var gl = canvas.getContext('webgl',{premultipliedAlpha:false}) || canvas.getContext('experimental-webgl');
    if(!gl) return null;
    var tt=gl.FLOAT, ok = gl.getExtension('OES_texture_float') && gl.getExtension('WEBGL_color_buffer_float');
    if(!ok){ var hf=gl.getExtension('OES_texture_half_float'), cb=gl.getExtension('EXT_color_buffer_half_float');
      if(hf&&cb){ tt=hf.HALF_FLOAT_OES; } else { return null; } }

    var pSim=prog(gl,VS,SIM), pRend=prog(gl,VS,REND);
    if(!pSim||!pRend) return null;

    var quad=gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER,quad);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
    function bind(p){ var l=gl.getAttribLocation(p,'a'); gl.enableVertexAttribArray(l); gl.vertexAttribPointer(l,2,gl.FLOAT,false,0,0); }

    var SW=380, SH=380;
    var texA=stateTex(gl,SW,SH,tt), texB=stateTex(gl,SW,SH,tt), fbo=gl.createFramebuffer();

    var imgTex=gl.createTexture(), imgAspect=1, ready=false, disposed=false;
    var im=new Image(); im.crossOrigin='anonymous';
    im.onload=function(){ imgAspect=im.naturalWidth/im.naturalHeight;
      gl.bindTexture(gl.TEXTURE_2D,imgTex);
      gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,im);
      gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE); ready=true; };
    im.onerror=function(){ disposed=true; };
    im.src=imageUrl;

    var running=true, pending=[];   // pending: [u, v] (0..1)
    function resize(){ var w=canvas.clientWidth,h=canvas.clientHeight; if(!w||!h)return; canvas.width=w; canvas.height=h; }
    resize(); addEventListener('resize',resize);

    function coverScale(){ var ca=canvas.width/canvas.height;
      return (ca>imgAspect)? [1, imgAspect/ca] : [ca/imgAspect, 1]; }

    function simStep(){
      // navbatdagi tomchilarni (24 tagacha) qo'llash
      var take=pending.splice(0,24), nd=take.length, arr=new Float32Array(48);
      for(var i=0;i<nd;i++){ arr[i*2]=take[i][0]; arr[i*2+1]=take[i][1]; }
      gl.bindFramebuffer(gl.FRAMEBUFFER,fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,texB,0);
      gl.viewport(0,0,SW,SH); gl.useProgram(pSim); bind(pSim);
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D,texA);
      gl.uniform1i(gl.getUniformLocation(pSim,'s'),0);
      gl.uniform2f(gl.getUniformLocation(pSim,'r'),SW,SH);
      gl.uniform2fv(gl.getUniformLocation(pSim,'drops'),arr);
      gl.uniform1i(gl.getUniformLocation(pSim,'nd'),nd);
      gl.uniform1f(gl.getUniformLocation(pSim,'dr'),9.0);    // MAYDA tomchi radiusi
      gl.uniform1f(gl.getUniformLocation(pSim,'ds'),0.42);
      gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
      var t=texA; texA=texB; texB=t;
    }
    function render(){
      gl.bindFramebuffer(gl.FRAMEBUFFER,null); gl.viewport(0,0,canvas.width,canvas.height);
      gl.useProgram(pRend); bind(pRend);
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D,texA); gl.uniform1i(gl.getUniformLocation(pRend,'s'),0);
      gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D,imgTex); gl.uniform1i(gl.getUniformLocation(pRend,'img'),1);
      gl.uniform2f(gl.getUniformLocation(pRend,'r'),SW,SH);
      var sc=coverScale(); gl.uniform2f(gl.getUniformLocation(pRend,'sc'),sc[0],sc[1]);
      gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
    }
    function frame(){ if(disposed)return; if(running&&ready){ simStep(); render(); } requestAnimationFrame(frame); }
    requestAnimationFrame(frame);

    function spray(e){
      var rect=canvas.getBoundingClientRect();
      var cx=(e.touches?e.touches[0].clientX:e.clientX)-rect.left;
      var cy=(e.touches?e.touches[0].clientY:e.clientY)-rect.top;
      if(cx<0||cy<0||cx>rect.width||cy>rect.height) return;
      // KENG doira ichida MAYDA, JUDA KO'P tomchi
      var R=Math.min(rect.width,rect.height)*0.14;   // ta'sir doirasi (keng)
      var n=18;
      for(var i=0;i<n;i++){
        var ang=Math.random()*6.2832, rad=Math.pow(Math.random(),0.6)*R;
        var x=cx+Math.cos(ang)*rad, y=cy+Math.sin(ang)*rad;
        if(x<0||y<0||x>rect.width||y>rect.height) continue;
        pending.push([x/rect.width, 1.0-y/rect.height]);
      }
      if(pending.length>240) pending.splice(0,pending.length-240);
    }
    canvas.addEventListener('mousemove',spray,{passive:true});
    canvas.addEventListener('touchmove',spray,{passive:true});
    canvas.addEventListener('mousedown',spray,{passive:true});

    return { pause:function(){running=false;}, resume:function(){running=true;}, dispose:function(){disposed=true;} };
  };
})();
