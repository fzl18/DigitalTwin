<script>
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";
export default {
  name: "TControls",
  inject: ["global"],
  mounted() {
    /*esline-disable */
    this.changeCamera();
  },
  render() {
    return null;
  },
  methods: {
    changeCamera(type = "OrbitControls") {
      const { camera, CSSRender, config } = this.global;
      let controls;
      if (type == "OrbitControls") {
        controls = new OrbitControls(camera, CSSRender.domElement);
        controls.enabled = config.camera.enabled;
        controls.minDistance = config.camera.minDistance;
        controls.maxDistance = config.camera.maxDistance;
        controls.maxPolarAngle = config.camera.maxPolarAngle;
        controls.enableDamping = config.camera.enableDamping;
        controls.autoRotate = config.camera.autoRotate;
        controls.autoRotateSpeed = config.camera.autoRotateSpeed;
        controls.enablePan = config.camera.enablePan;
        controls.enableZoom = config.camera.enableZoom;
        controls.dampingFactor = config.camera.dampingFactor;
        controls.enableKeys = config.camera.enableKeys;
      } else if (type == "PointerLockControls") {
        controls = new PointerLockControls(camera);
      }

      this.global.controls = controls;
    },

    initPointerLock() {
      //实现鼠标锁定的教程地址 http://www.html5rocks.com/en/tutorials/pointerlock/intro/
      var havePointerLock =
        "pointerLockElement" in document ||
        "mozPointerLockElement" in document ||
        "webkitPointerLockElement" in document;
      if (havePointerLock) {
        var element = document.body;
        var pointerlockchange = function(event) {
          if (
            document.pointerLockElement === element ||
            document.mozPointerLockElement === element ||
            document.webkitPointerLockElement === element
          ) {
            controlsEnabled = true;
            controls.enabled = true;
            blocker.style.display = "none";
          } else {
            controls.enabled = false;
            blocker.style.display = "block";
            instructions.style.display = "";
          }
        };
        var pointerlockerror = function(event) {
          instructions.style.display = "";
        };
        // 监听变动事件
        document.addEventListener(
          "pointerlockchange",
          pointerlockchange,
          false
        );
        document.addEventListener(
          "mozpointerlockchange",
          pointerlockchange,
          false
        );
        document.addEventListener(
          "webkitpointerlockchange",
          pointerlockchange,
          false
        );
        document.addEventListener("pointerlockerror", pointerlockerror, false);
        document.addEventListener(
          "mozpointerlockerror",
          pointerlockerror,
          false
        );
        document.addEventListener(
          "webkitpointerlockerror",
          pointerlockerror,
          false
        );
        instructions.addEventListener(
          "click",
          function(event) {
            instructions.style.display = "none";
            //全屏
            launchFullScreen(renderer.domElement);
            // 锁定鼠标光标
            element.requestPointerLock =
              element.requestPointerLock ||
              element.mozRequestPointerLock ||
              element.webkitRequestPointerLock;
            element.requestPointerLock();
          },
          false
        );
      } else {
        // instructions.innerHTML = "你的浏览器不支持相关操作，请更换浏览器";
      }
    },
  },
};
</script>
