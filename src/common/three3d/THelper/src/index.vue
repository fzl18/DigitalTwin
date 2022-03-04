<script>
import * as THREE from "three";
export default {
  name: "THelper",
  inject: ["global"],
  methods: {
    gridHelper() {
      const { scene } = this.global;
      var size = 5;
      var divisions = 50;
      var colorCenterLine = 0x444444;
      var colorGrid = 0x333333;

      var gridHelper = new THREE.GridHelper(
        size,
        divisions,
        colorCenterLine,
        colorGrid
      );
      gridHelper.visible = false;
      gridHelper.position.set(-0.05, -0.42, -0.5);
      gridHelper.scale.set(5, 5, 5);
      this.global.gridHelper = gridHelper;
      scene.add(gridHelper);
    },
  },
  mounted() {
    this.gridHelper();
  },
  render() {
    return null;
  },
};
</script>
