import Vue from "vue";
import TWEEN from "@tweenjs/tween.js";
import * as THREE from "three";
import { RenderPass, EffectComposer, OutlinePass } from "three-outlinepass";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer";
import dbStorage from "./indexedDB";
import store from "@/store/index.js";
CSS2DObject;
const cameraViewerTransfrom = (
  camera,
  toStatus,
  complete,
  start = false,
  time = 2500
) => {
  let update = (data) => {
    camera.position.set(data.x, data.y, data.z);
  };
  return twAnimation(camera.position, toStatus, time, update, complete, start);
};

const twAnimation = (
  curStatus,
  toStatus,
  time,
  update,
  complete,
  start = true
) => {
  let tween = new TWEEN.Tween(curStatus);
  tween.to(toStatus, time);
  tween.onUpdate(function(object) {
    update && update(object);
  });
  tween.onComplete(function() {
    complete && complete();
  });
  tween.easing(TWEEN.Easing.Sinusoidal.InOut); // Back Quadratic Cubic Circular Sinusoidal
  start && tween.start();
  return tween;
};

const onPointerClick = (event, obj, global) => {
  const [w, h] = [window.innerWidth, window.innerHeight];
  const mouse = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();
  mouse.x = (event.clientX / w) * 2 - 1;
  mouse.y = -(event.clientY / h) * 2 + 1;
  raycaster.setFromCamera(mouse, global.camera);
  const intersects = raycaster.intersectObject(obj, true);
  if (intersects.length <= 0) return false;
  const selectedObject = intersects[0].object;
  if (selectedObject.isMesh) {
    outline([selectedObject]);
    return selectedObject;
  }
  const outline = (selectedObjects, color = "#15c5e8") => {
    const { renderer, camera, scene } = global;
    const [w, h] = [window.innerWidth, window.innerHeight];
    var compose = new EffectComposer(renderer);
    var renderPass = new RenderPass(scene, camera);
    var outlinePass = new OutlinePass(
      new THREE.Vector2(w, h),
      scene,
      camera,
      selectedObjects
    );
    outlinePass.renderToScreen = true;
    outlinePass.selectedObjects = selectedObjects;
    compose.addPass(renderPass);
    compose.addPass(outlinePass);
    const params = {
      edgeStrength: 10,
      edgeGlow: 0,
      edgeThickness: 50.0,
      pulsePeriod: 1,
      usePatternTexture: false,
    };
    outlinePass.edgeStrength = params.edgeStrength;
    outlinePass.edgeGlow = params.edgeGlow;
    outlinePass.visibleEdgeColor.set(color);
    outlinePass.hiddenEdgeColor.set(color);
    // compose.render(scene, camera);
    this.$set(this.global, "compose", compose);
  };
};

const playAnimationByName = (model, animationName) => {
  const animations = model.animations;
  const mixer = new THREE.AnimationMixer(model.scene);
  const clip = THREE.AnimationClip.findByName(animations, animationName);
  if (clip) {
    const action = mixer.clipAction(clip);
    action.play();
    this.global.mixers.set(animationName, mixer);
  } else {
    this.global.mixers.delete(animationName);
  }
};

const loadModel = (options) => {
  const key = `${options.url}`;
  let loader;
  dbStorage.getItem(key.split("/").pop()).then((res) => {
    if (res) {
      THREE.Cache.add(key, res);
      const manager = new THREE.LoadingManager();
      manager.onLoad = function() {
        if (options.data.onprogress) {
          console.log("Loading complete!");
          store.state.model.loadingComplete = true;
        }
      };
      // manager.onProgress = (url, itemsLoaded, itemsTotal) => {
      //   console.log(
      //     "Loading file: " +
      //       url +
      //       ".\nLoaded " +
      //       itemsLoaded +
      //       " of " +
      //       itemsTotal +
      //       " files."
      //   );
      // };
      loader = new GLTFLoader(manager);
    } else {
      loader = new GLTFLoader();
    }
    if (options.draco) {
      let dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath(`${process.env.BASE_URL}draco/gltf/`);
      dracoLoader.setDecoderConfig({ type: "js" });
      dracoLoader.preload();
      loader.setDRACOLoader(dracoLoader);
    }
    loader.load(
      `${process.env.BASE_URL}${options.url}`,
      options.complete,
      options.onprocess
    );
  });
};

const panelHandle = (showList = []) => {
  const { panel } = store.state || {};
  const panelList = Object.keys(panel);
  panelList.map((item) => {
    if (item != "header") panel[item] = false;
  });
  showList.map((item) => {
    panel[item] = true;
  });
};

const onProgress = (xhr, callback) => {
  if (xhr.loaded == xhr.total) {
    dbStorage.setItem(
      xhr.currentTarget.responseURL.split("/").pop(),
      xhr.currentTarget.response
    );
    store.state.model.loadingComplete = true;
  }
  callback && callback(xhr);
};

export {
  cameraViewerTransfrom,
  twAnimation,
  onPointerClick,
  playAnimationByName,
  loadModel,
  panelHandle,
  onProgress,
};
