<script>
import { PerspectiveCamera } from "three";
export default {
  name: "TCamera",
  inject: ["global"],
  mounted() {
    const { w, h } = this.global.rendererSize;
    const camera = new PerspectiveCamera(40, w / h, 0.1, 1000);
    camera.position.set(
      -15.957725648134131,
      7.121389482888364,
      12.58199867911272
    );
    camera.lookAt(0, 0, 0);
    camera.name = "camera";
    this.global.camera = camera;
  },
  render() {
    return null;
  },
};
</script>
