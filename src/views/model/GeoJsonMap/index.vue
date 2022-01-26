<template>
  <canvas class="name" ref="name"></canvas>
</template>

<script>
import * as THREE from "three";
import * as d3geo from "d3-geo";
export default {
  name: "geoJsonMap",
  inject: ["global"],
  props: {
    option: {
      type: Object,
      default: () => {
        return {
          color: "#00f",
          borderColor: "#0ff",
          depth: 0.2,
          transparent: true,
          opacity: 0.5,
          scale: 30,
          translate: [0, 0],
          center: [120.28429, 31.52853],
        };
      },
    },
    mapGeoJson: {
      type: Object,
      default: () => {
        return {
          features: [],
        };
      },
    },
  },
  data() {
    return {
      map: new THREE.Group(),
    };
  },
  methods: {
    initMap(mapGeoJson) {
      // d3-geo转化坐标
      const projection = d3geo
        .geoMercator()
        .center(this.option.center)
        .scale(this.option.scale)
        .translate(this.option.translate);
      // 遍历省份构建模型
      mapGeoJson.features.forEach((elem) => {
        // 新建一个省份容器：用来存放省份对应的模型和轮廓线
        const province = new THREE.Object3D();
        const coordinates = elem.geometry.coordinates;
        coordinates.forEach((multiPolygon) => {
          multiPolygon.forEach((polygon) => {
            // 这里的坐标要做2次使用：1次用来构建模型，1次用来构建轮廓线
            const shape = new THREE.Shape();
            const lineMaterial = new THREE.LineBasicMaterial({
              color: this.option.borderColor,
            });
            const linGeometry = new THREE.BufferGeometry();
            let vertices = [];
            for (let i = 0; i < polygon.length; i++) {
              const [x, y] = projection(polygon[i]);
              if (i === 0) {
                shape.moveTo(x, -y);
              }
              shape.lineTo(x, -y);
              if (x && y) {
                vertices.push(x, -y, 0);
              }
              // linGeometry.vertices.push(new THREE.Vector3(x, -y, 4.01));
            }
            linGeometry.setAttribute(
              "position",
              new THREE.BufferAttribute(new Float32Array(vertices), 3)
            );
            // console.log(vertices, new Float32Array(vertices), linGeometry);
            const extrudeSettings = {
              depth: this.option.depth,
              bevelEnabled: false,
            };
            const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
            const material = new THREE.MeshBasicMaterial({
              color: this.option.color,
              transparent: this.option.transparent,
              opacity: this.option.opacity,
              side: THREE.FrontSide,
            });
            const mesh = new THREE.Mesh(geometry, material);
            const line = new THREE.Line(linGeometry, lineMaterial);
            province.add(mesh);
            province.add(line);
          });
        });
        // 将geojson的properties放到模型中，后面会用到
        province.properties = elem.properties;
        if (elem.properties.centroid) {
          const [x, y] = projection(elem.properties.centroid);
          province.properties._centroid = [x, y];
        }
        this.map.add(province);
        this.map.name = "geojsonmap";
      });
      this.global.scene.add(this.map);
    },
    showName() {
      const { w, h } = this.$parent.size;
      let canvas = this.$refs.name;
      if (!canvas) return;
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      // 新建一个离屏canvas
      const offCanvas = document.createElement("canvas");
      offCanvas.width = w;
      offCanvas.height = h;
      const ctxOffCanvas = canvas.getContext("2d");
      // 设置canvas字体样式
      ctxOffCanvas.font = "16.5px Arial";
      ctxOffCanvas.strokeStyle = "#000";
      ctxOffCanvas.fillStyle = "#00f";
      // texts用来存储显示的名称，重叠的部分就不会放到里面
      const texts = [];
      /**
       * 遍历省份数据，有2个核心功能
       * 1. 将3维坐标转化成2维坐标
       * 2. 后面遍历到的数据，要和前面的数据做碰撞对比，重叠的就不绘制
       * */
      this.map.children.forEach((elem, index) => {
        if (!elem.properties._centroid) return;
        // 找到中心点
        const y = -elem.properties._centroid[1];
        const x = elem.properties._centroid[0];
        const z = this.option.depth + 1;
        // 转化为二维坐标
        const vector = new THREE.Vector3(x, y, z);
        const position = vector.project(this.global.camera);
        // 构建文本的基本属性：名称，left, top, width, height -> 碰撞对比需要这些坐标数据
        const name = elem.properties.name;
        const left = ((vector.x + 1) / 2) * w;
        const top = (-(vector.y - 1) / 2) * h;
        const text = {
          name,
          left,
          top,
          width: ctxOffCanvas.measureText(name).width,
          height: 16.5,
        };
        // 碰撞对比
        let show = true;
        for (let i = 0; i < texts.length; i++) {
          if (
            text.left + text.width < texts[i].left ||
            text.top + text.height < texts[i].top ||
            texts[i].left + texts[i].width < text.left ||
            texts[i].top + texts[i].height < text.top
          ) {
            show = true;
          } else {
            show = false;
            break;
          }
        }
        if (show) {
          texts.push(text);
          ctxOffCanvas.strokeText(name, left, top);
          ctxOffCanvas.fillText(name, left, top);
        }
      });
      // 离屏canvas绘制到canvas中
      ctx.drawImage(offCanvas, 0, 0);
      requestAnimationFrame(this.showName);
    },
  },
  mounted() {
    this.initMap(this.mapGeoJson);
    // this.showName();
    console.log(this.$parent.size);
  },
};
</script>

<style lang="scss" scoped>
.name {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
