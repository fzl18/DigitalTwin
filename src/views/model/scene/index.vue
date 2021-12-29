<script>
import * as THREE from "three";
export default {
  name: "Scene",
  inject: ["global"],
  data() {
    return {
      curve: null,
    };
  },
  render() {
    return null;
  },
  mounted() {
    this.addCurve();
  },
  methods: {
    addCurve() {
      const curve = new THREE.CatmullRomCurve3(
        [
          new THREE.Vector3(-80, -40, 0),
          new THREE.Vector3(-70, 40, 0),
          new THREE.Vector3(70, 40, 0),
          new THREE.Vector3(80, -40, 0),
        ],
        false /*是否闭合*/
      );
      const curveGeometry = new THREE.BufferGeometry().setFromPoints(
        curve.getPoints(50)
      );
      const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
      this.curve = new THREE.Line(curveGeometry, material);
      const curveGroup = new THREE.Group();
      curveGroup.add(this.curve);
      this.global.scene.add(curveGroup);
      curveGroup.position.set(0, 0, -1);
      curveGroup.scale.set(0.01, 0.01, 0.01);
    },
  },
};
</script>
