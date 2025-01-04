"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[516],{516:(e,t,i)=>{i.a(e,(async(e,s)=>{try{i.r(t),i.d(t,{default:()=>h});var n=i(5043),o=i(7778),r=(i(9137),i(423)),a=i(579),c=e([o]);o=(c.then?(await c)():c)[0];const h=()=>{const e=(0,n.useRef)(null),t=(0,n.useRef)(null);(0,n.useEffect)((()=>{const i=e.current;return i&&(t.current=(0,o.A)(i,{count:200,minSize:.3,maxSize:.8,gravity:0})),()=>{t.current&&(t.current.dispose(),t.current=null)}}),[]);return(0,a.jsxs)("div",{id:"hero-wrapper",children:[(0,a.jsxs)("div",{className:"hero",children:[(0,a.jsx)("h1",{className:"futuraLt",children:"Wear your"}),(0,a.jsx)("h2",{className:"futuraLt",children:"Emotions"})]}),(0,a.jsx)("div",{className:"hero-buttons",children:(0,a.jsx)("button",{type:"button",id:"colors-btn",onClick:()=>{t.current&&t.current.spheres.setColors([16777215*Math.random(),16777215*Math.random(),16777215*Math.random()])},children:(0,a.jsx)(r.Q1l,{className:"colorIcon"})})}),(0,a.jsx)("canvas",{id:"hero-canvas",ref:e})]})};s()}catch(h){s(h)}}))},9137:()=>{},7778:(e,t,i)=>{i.a(e,(async(e,s)=>{try{i.d(t,{A:()=>j});var n=i(2422),o=i(1306),r=e([n,o]);[n,o]=r.then?(await r)():r;class c{#e;canvas;camera;cameraMinAspect;cameraMaxAspect;cameraFov;maxPixelRatio;minPixelRatio;scene;renderer;#t;size={width:0,height:0,wWidth:0,wHeight:0,ratio:0,pixelRatio:0};render=this.#i;onBeforeRender=()=>{};onAfterRender=()=>{};onAfterResize=()=>{};#s=!1;#n=!1;isDisposed=!1;#o;#r;#a;#c=(()=>new n.Clock)();#h={elapsed:0,delta:0};#l;constructor(e){this.#e={...e},this.#m(),this.#d(),this.#g(),this.resize(),this.#u()}#m(){this.camera=new n.PerspectiveCamera,this.cameraFov=this.camera.fov}#d(){this.scene=new n.Scene}#g(){this.#e.canvas?this.canvas=this.#e.canvas:this.#e.id?this.canvas=document.getElementById(this.#e.id):console.error("Three: Missing canvas or id parameter"),this.canvas.style.display="block";const e={canvas:this.canvas,powerPreference:"high-performance",...this.#e.rendererOptions??{}};this.renderer=new n.WebGLRenderer(e),this.renderer.outputColorSpace=n.SRGBColorSpace}#u(){this.#e.size instanceof Object||(window.addEventListener("resize",this.#p.bind(this)),"parent"===this.#e.size&&(this.#r=new ResizeObserver(this.#p.bind(this)),this.#r.observe(this.canvas.parentNode))),this.#o=new IntersectionObserver(this.#f.bind(this),{root:null,rootMargin:"0px",threshold:0}),this.#o.observe(this.canvas),document.addEventListener("visibilitychange",this.#y.bind(this))}#v(){window.removeEventListener("resize",this.#p.bind(this)),this.#r?.disconnect(),this.#o?.disconnect(),document.removeEventListener("visibilitychange",this.#y.bind(this))}#f(e){this.#s=e[0].isIntersecting,this.#s?this.#w():this.#x()}#y(e){this.#s&&(document.hidden?this.#x():this.#w())}#p(){this.#a&&clearTimeout(this.#a),this.#a=setTimeout(this.resize.bind(this),100)}resize(){let e,t;this.#e.size instanceof Object?(e=this.#e.size.width,t=this.#e.size.height):"parent"===this.#e.size&&this.canvas.parentNode?(e=this.canvas.parentNode.offsetWidth,t=this.canvas.parentNode.offsetHeight):(e=window.innerWidth,t=window.innerHeight),this.size.width=e,this.size.height=t,this.size.ratio=e/t,this.#z(),this.#b(),this.onAfterResize(this.size)}#z(){this.camera.aspect=this.size.width/this.size.height,this.camera.isPerspectiveCamera&&this.cameraFov&&(this.cameraMinAspect&&this.camera.aspect<this.cameraMinAspect?this.#A(this.cameraMinAspect):this.cameraMaxAspect&&this.camera.aspect>this.cameraMaxAspect?this.#A(this.cameraMaxAspect):this.camera.fov=this.cameraFov),this.camera.updateProjectionMatrix(),this.updateWorldSize()}#A(e){const t=Math.tan(n.MathUtils.degToRad(this.cameraFov/2))/(this.camera.aspect/e);this.camera.fov=2*n.MathUtils.radToDeg(Math.atan(t))}updateWorldSize(){if(this.camera.isPerspectiveCamera){const e=this.camera.fov*Math.PI/180;this.size.wHeight=2*Math.tan(e/2)*this.camera.position.length(),this.size.wWidth=this.size.wHeight*this.camera.aspect}else this.camera.isOrthographicCamera&&(this.size.wHeight=this.camera.top-this.camera.bottom,this.size.wWidth=this.camera.right-this.camera.left)}#b(){this.renderer.setSize(this.size.width,this.size.height),this.#t?.setSize(this.size.width,this.size.height);let e=window.devicePixelRatio;this.maxPixelRatio&&e>this.maxPixelRatio?e=this.maxPixelRatio:this.minPixelRatio&&e<this.minPixelRatio&&(e=this.minPixelRatio),this.renderer.setPixelRatio(e),this.size.pixelRatio=e}get postprocessing(){return this.#t}set postprocessing(e){this.#t=e,this.render=e.render.bind(e)}#w(){if(this.#n)return;console.log("Start rendering");const e=()=>{this.#l=requestAnimationFrame(e),this.#h.delta=this.#c.getDelta(),this.#h.elapsed+=this.#h.delta,this.onBeforeRender(this.#h),this.render(),this.onAfterRender(this.#h)};this.#n=!0,this.#c.start(),e()}#x(){this.#n&&(console.log("Stop rendering"),cancelAnimationFrame(this.#l),this.#n=!1,this.#c.stop())}#i(){this.renderer.render(this.scene,this.camera)}clear(){this.scene.traverse((e=>{e.isMesh&&"object"==typeof e.material&&(Object.keys(e.material).forEach((t=>{const i=e.material[t];null!==i&&"object"==typeof i&&"function"==typeof i.dispose&&i.dispose()})),e.material.dispose(),e.geometry.dispose())})),this.scene.clear()}dispose(){this.#v(),this.#x(),this.clear(),this.#t?.dispose(),this.renderer.dispose(),this.isDisposed=!0}}const h=new Map,l=new n.Vector2;let m=!1;function d(e){const t={position:new n.Vector2,nPosition:new n.Vector2,hover:!1,onEnter(){},onMove(){},onClick(){},onLeave(){},...e};return function(e,t){h.has(e)||(h.set(e,t),m||(document.body.addEventListener("pointermove",g),document.body.addEventListener("pointerleave",p),document.body.addEventListener("click",u),m=!0))}(e.domElement,t),t.dispose=()=>{var t;t=e.domElement,h.delete(t),0===h.size&&(document.body.removeEventListener("pointermove",g),document.body.removeEventListener("pointerleave",p),m=!1)},t}function g(e){l.x=e.clientX,l.y=e.clientY;for(const[t,i]of h){const e=t.getBoundingClientRect();y(e)?(f(i,e),i.hover||(i.hover=!0,i.onEnter(i)),i.onMove(i)):i.hover&&(i.hover=!1,i.onLeave(i))}}function u(e){l.x=e.clientX,l.y=e.clientY;for(const[t,i]of h){const e=t.getBoundingClientRect();f(i,e),y(e)&&i.onClick(i)}}function p(){for(const e of h.values())e.hover&&(e.hover=!1,e.onLeave(e))}function f(e,t){const{position:i,nPosition:s}=e;i.x=l.x-t.left,i.y=l.y-t.top,s.x=i.x/t.width*2-1,s.y=-i.y/t.height*2+1}function y(e){const{x:t,y:i}=l,{left:s,top:n,width:o,height:r}=e;return t>=s&&t<=s+o&&i>=n&&i<=n+r}const{randFloat:v,randFloatSpread:w}=n.MathUtils,x=new n.Vector3,z=new n.Vector3,b=new n.Vector3,A=new n.Vector3,M=new n.Vector3,S=new n.Vector3,R=new n.Vector3,C=new n.Vector3,P=new n.Vector3,L=new n.Vector3;class D{constructor(e){this.config=e,this.positionData=new Float32Array(3*e.count).fill(0),this.velocityData=new Float32Array(3*e.count).fill(0),this.sizeData=new Float32Array(e.count).fill(1),this.center=new n.Vector3,this.#M(),this.setSizes()}#M(){const{config:e,positionData:t}=this;this.center.toArray(t,0);for(let i=1;i<e.count;i++){const s=3*i;t[s]=w(2*e.maxX),t[s+1]=w(2*e.maxY),t[s+2]=w(2*e.maxZ)}}setSizes(){const{config:e,sizeData:t}=this;t[0]=e.size0;for(let i=1;i<e.count;i++)t[i]=v(e.minSize,e.maxSize)}update(e){const{config:t,center:i,positionData:s,sizeData:n,velocityData:o}=this;let r=0;t.controlSphere0&&(r=1,x.fromArray(s,0),x.lerp(i,.1).toArray(s,0),A.set(0,0,0).toArray(o,0));for(let a=r;a<t.count;a++){const i=3*a;z.fromArray(s,i),M.fromArray(o,i),M.y-=e.delta*t.gravity*n[a],M.multiplyScalar(t.friction),M.clampLength(0,t.maxVelocity),z.add(M),z.toArray(s,i),M.toArray(o,i)}for(let a=r;a<t.count;a++){const e=3*a;z.fromArray(s,e),M.fromArray(o,e);const i=n[a];for(let c=a+1;c<t.count;c++){const t=3*c;b.fromArray(s,t),S.fromArray(o,t);const r=n[c];R.copy(b).sub(z);const a=R.length(),h=i+r;if(a<h){const i=h-a;C.copy(R).normalize().multiplyScalar(.5*i),P.copy(C).multiplyScalar(Math.max(M.length(),1)),L.copy(C).multiplyScalar(Math.max(S.length(),1)),z.sub(C),M.sub(P),z.toArray(s,e),M.toArray(o,e),b.add(C),S.add(L),b.toArray(s,t),S.toArray(o,t)}}if(t.controlSphere0){R.copy(x).sub(z);const e=R.length(),t=i+n[0];if(e<t){const i=t-e;C.copy(R).normalize().multiplyScalar(i),P.copy(C).multiplyScalar(Math.max(M.length(),2)),z.sub(C),M.sub(P)}}Math.abs(z.x)+i>t.maxX&&(z.x=Math.sign(z.x)*(t.maxX-i),M.x=-M.x*t.wallBounce),0===t.gravity?Math.abs(z.y)+i>t.maxY&&(z.y=Math.sign(z.y)*(t.maxY-i),M.y=-M.y*t.wallBounce):z.y-i<-t.maxY&&(z.y=-t.maxY+i,M.y=-M.y*t.wallBounce);const r=Math.max(t.maxZ,t.maxSize);Math.abs(z.z)+i>r&&(z.z=Math.sign(z.z)*(t.maxZ-i),M.z=-M.z*t.wallBounce),z.toArray(s,e),M.toArray(o,e)}}}class k extends n.MeshPhysicalMaterial{constructor(e){super(e),this.uniforms={thicknessDistortion:{value:.1},thicknessAmbient:{value:0},thicknessAttenuation:{value:.1},thicknessPower:{value:2},thicknessScale:{value:10}},this.defines.USE_UV="",this.onBeforeCompile=e=>{Object.assign(e.uniforms,this.uniforms),e.fragmentShader="\n        uniform float thicknessPower;\n        uniform float thicknessScale;\n        uniform float thicknessDistortion;\n        uniform float thicknessAmbient;\n        uniform float thicknessAttenuation;\n        uniform vec3 thicknessColor;\n      "+e.fragmentShader,e.fragmentShader=e.fragmentShader.replace("void main() {","\n        void RE_Direct_Scattering(const in IncidentLight directLight, const in vec2 uv, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, inout ReflectedLight reflectedLight) {\n          vec3 scatteringHalf = normalize(directLight.direction + (geometryNormal * thicknessDistortion));\n          float scatteringDot = pow(saturate(dot(geometryViewDir, -scatteringHalf)), thicknessPower) * thicknessScale;\n          vec3 scatteringIllu = (scatteringDot + thicknessAmbient) * vColor;\n          reflectedLight.directDiffuse += scatteringIllu * thicknessAttenuation * directLight.color;\n        }\n\n        void main() {\n      ");const t=n.ShaderChunk.lights_fragment_begin.replaceAll("RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );","\n          RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n          RE_Direct_Scattering(directLight, vUv, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, reflectedLight);\n        ");e.fragmentShader=e.fragmentShader.replace("#include <lights_fragment_begin>",t)}}}const E={count:200,colors:[255,0,16777215],ambientColor:16777215,ambientIntensity:1,lightIntensity:200,materialParams:{metalness:.5,roughness:.5,clearcoat:1,clearcoatRoughness:.15},minSize:.5,maxSize:1,size0:1,gravity:.5,friction:.9975,wallBounce:.95,maxVelocity:.15,maxX:5,maxY:5,maxZ:2,controlSphere0:!1},V=new n.Object3D;class N extends n.InstancedMesh{constructor(e){const t={...E,...arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}},i=new o.RoomEnvironment,s=new n.PMREMGenerator(e,.04).fromScene(i).texture,r=new n.SphereGeometry,a=new k({envMap:s,...t.materialParams});a.envMapRotation.x=-Math.PI/2,super(r,a,t.count),this.config=t,this.physics=new D(t),this.#S(),this.setColors(t.colors)}#S(){this.ambientLight=new n.AmbientLight(this.config.ambientColor,this.config.ambientIntensity),this.add(this.ambientLight),this.light=new n.PointLight(this.config.colors[0],this.config.lightIntensity),this.add(this.light)}setColors(e){if(Array.isArray(e)&&e.length>1){const t=function(e){let t,i;return s(e),{setColors:s,getColorAt:function(e){let s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:new n.Color;const o=Math.max(0,Math.min(1,e))*(t.length-1),r=Math.floor(o),a=i[r];if(r>=t.length-1)return a.clone();const c=o-r,h=i[r+1];return s.r=a.r+c*(h.r-a.r),s.g=a.g+c*(h.g-a.g),s.b=a.b+c*(h.b-a.b),s}};function s(e){t=e,i=[],t.forEach((e=>{const t=new n.Color(e);i.push(t)}))}}(e);for(let e=0;e<this.count;e++)this.setColorAt(e,t.getColorAt(e/this.count)),0===e&&this.light.color.copy(t.getColorAt(e/this.count));this.instanceColor.needsUpdate=!0}}update(e){this.physics.update(e);for(let t=0;t<this.count;t++)V.position.fromArray(this.physics.positionData,3*t),V.scale.setScalar(this.physics.sizeData[t]),V.updateMatrix(),this.setMatrixAt(t,V.matrix),0===t&&this.light.position.copy(V.position);this.instanceMatrix.needsUpdate=!0}}function j(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const i=new c({canvas:e,size:"parent",rendererOptions:{antialias:!0,alpha:!0}});let s;i.renderer.toneMapping=n.ACESFilmicToneMapping,i.camera.position.set(0,0,20),i.camera.lookAt(0,0,0),i.cameraMaxAspect=1.5,i.resize(),m(t);const o=new n.Raycaster,r=new n.Plane(new n.Vector3(0,0,1),0),a=new n.Vector3;let h=!1;const l=d({domElement:e,onMove(){o.setFromCamera(l.nPosition,i.camera),i.camera.getWorldDirection(r.normal),o.ray.intersectPlane(r,a),s.physics.center.copy(a),s.config.controlSphere0=!0},onLeave(){s.config.controlSphere0=!1}});function m(e){s&&(i.clear(),i.scene.remove(s)),s=new N(i.renderer,e),i.scene.add(s)}return i.onBeforeRender=e=>{h||s.update(e)},i.onAfterResize=e=>{s.config.maxX=e.wWidth/2,s.config.maxY=e.wHeight/2},{three:i,get spheres(){return s},setCount(e){m({...s.config,count:e})},togglePause(){h=!h},dispose(){l.dispose(),i.dispose()}}}s()}catch(a){s(a)}}))}}]);
//# sourceMappingURL=516.8d383133.chunk.js.map