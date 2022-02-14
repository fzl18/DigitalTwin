<script>
import * as THREE from "three";
export default {
  name: "TLight",
  inject: ["global"],
  methods: {
    loadLight([x, y, z]) {
      const scene = this.global.scene;
      var spotLight = new THREE.DirectionalLight(0xffffff, 1.2);
      spotLight.position.set(x, y, z);
      scene.add(spotLight);
    },
  },
  mounted() {
    const arr = [
      [10, 10, 10],
      [-10, 10, 10],
      [10, -10, 10],
      [10, 10, -10],
    ];
    arr.forEach((_) => {
      this.loadLight(_);
    });
    const scene = this.global.scene;
    var ambient = new THREE.AmbientLight(0x000000, 1.2);
    scene.add(ambient);
  },
  render() {
    return null;
  },
};
</script>
