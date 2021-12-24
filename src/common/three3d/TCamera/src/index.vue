<script>
import { PerspectiveCamera } from "three";
export default {
  name: "TCamera",
  inject: ["global"],
  mounted() {
    const { w, h } = this.global.rendererSize;
    const camera = new PerspectiveCamera(40, w / h, 0.1, 500);
    camera.position.set(0, 0, 0);
    camera.lookAt(0, 0, 0);
    camera.name = "camera";
    this.global.camera = camera;
  },
  render() {
    return null;
  },
};
</script>
