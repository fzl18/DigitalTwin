<script>
import * as THREE from "three";
export default {
  name: "TFog",
  inject: ["global"],
  methods: {},
  mounted() {
    const { scene } = this.global;
    // scene.fog = new THREE.Fog(0x333333, 20, 30);
    scene.fog = new THREE.FogExp2(0xefd1b5, 0.02);
  },
  render() {
    return null;
  },
};
</script>
