import Vue from "vue";
import TWEEN from "@tweenjs/tween.js";
import * as THREE from "three";
import { RenderPass, EffectComposer, OutlinePass } from "three-outlinepass";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import dbStorage from "./indexedDB";
import store from "@/store/index.js";
let selectedObject = null;
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

const stopTwAnimation = (cb) => {
  TWEEN.removeAll();
  cb && cb();
};

const outline = (selectedObjects, global, color = "#15c5e8") => {
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
  // this.$set(global, "compose", compose);
};

const modelClick = (event, obj, global, dom) => {
  event.preventDefault();
  // const [w, h] = [window.innerWidth, window.innerHeight];
  // const mouse = new THREE.Vector2();
  // mouse.x = (event.clientX / w) * 2 - 1;
  // mouse.y = -(event.clientY / h) * 2 + 1;

  // 屏幕坐标转标准设备坐标
  let x =
    ((event.clientX - dom.getBoundingClientRect().left) /
      (dom.offsetWidth * store.state.index.scale)) *
      2 -
    1; // 标准设备横坐标

  // 这里的dom是个canvas的dom元素,getBoundingClientRectangle会返回当前元素的视口大小.
  let y =
    -(
      (event.clientY - dom.getBoundingClientRect().top) /
      (dom.offsetHeight * store.state.index.scale)
    ) *
      2 +
    1; // 标准设备纵坐标

  let standardVector = new THREE.Vector3(x, y, 1); // 标准设备坐标
  // 标准设备坐标转世界坐标
  let worldVector = standardVector.unproject(global.camera);
  // 射线投射方向单位向量(worldVector坐标减相机位置坐标)
  let ray = worldVector.sub(global.camera.position).normalize();
  const raycaster = new THREE.Raycaster(global.camera.position, ray);
  // raycaster.setFromCamera(worldVector, global.camera);
  const intersects = raycaster.intersectObject(obj, true);
  // console.log(intersects);

  if (intersects.length <= 0) {
    if (selectedObject && selectedObject.type == "Mesh") {
      selectedObject.material.color = selectedObject.currentColor.clone();
      selectedObject = null;
    }
    return false;
  }
  if (selectedObject && selectedObject.type == "Mesh") {
    selectedObject.material.color = selectedObject.currentColor.clone();
    selectedObject = null;
  }
  if (!selectedObject || selectedObject.id != intersects[0].object.id) {
    selectedObject = intersects[0].object;
    if (selectedObject.type == "Mesh") {
      selectedObject.currentColor = selectedObject.material.color.clone();
      // console.log(selectedObject);
      // selectedObject.material.color.set("#f00");
      // outline([selectedObject], global);
      return selectedObject;
    }
  }
};

// 播放动画
const playAnimationByName = (group, global) => {
  const animations = group.animations;
  const animName = animations[0].name;
  const mixer = new THREE.AnimationMixer(group.scene);
  const clip = THREE.AnimationClip.findByName(animations, animName);
  if (clip) {
    const action = mixer.clipAction(clip);
    action.play();
    global.mixers.set(animName, mixer);
  } else {
    global.mixers.delete(animName);
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
        if (options.data && options.data.onprogress) {
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

const panelHandle = (showList = [], isShow = true) => {
  const { panel } = store.state || {};
  // const panelList = Object.keys(panel);
  // panelList.map((item) => {
  //   if (item != "header") panel[item] = false;
  // });
  showList.map((item) => {
    panel[item] = isShow;
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

const deleteGroup = (group) => {
  if (!group) return;
  // 删除掉所有的模型组内的mesh
  group.traverse(function(item) {
    if (item instanceof THREE.Mesh) {
      item.geometry.dispose(); // 删除几何体
      item.material.dispose(); // 删除材质
    }
  });
};

const removeScene = (scene) => {
  clearScene(scene);
};

const clearCache = (item) => {
  item.geometry.dispose();
  item.material.dispose();
};

const clearScene = (scene) => {
  removeObj(scene);
};

const removeObj = (obj) => {
  let arr = obj.children.filter((x) => x.isMaterial || x.isGeometry);
  arr.forEach((item) => {
    if (item.children.length) {
      removeObj(item);
    } else {
      clearCache(item);
      item.clear();
    }
  });
  obj.clear();
  arr = null;
};

// destroyed = () => {
// window.removeEventListener("resize", this.onWindowResize);
// this.clearScene();
// this.renderer.renderLists.dispose();
// this.renderer.dispose();
// this.renderer.forceContextLoss();
// this.renderer.domElement = null;
// this.renderer.content = null;
// this.renderer = null;
// cancelAnimationFrame(animationId);
// THREE.Cache.clear();
// };

export {
  cameraViewerTransfrom,
  twAnimation,
  modelClick,
  playAnimationByName,
  loadModel,
  panelHandle,
  onProgress,
  deleteGroup,
  removeScene,
  stopTwAnimation,
};
