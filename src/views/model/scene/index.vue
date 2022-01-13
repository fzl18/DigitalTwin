<script>
import * as THREE from "three";
import { loadModel, onProgress } from "@/utils/action";
export default {
  name: "Mscene",
  inject: ["global"],
  props: {
    modelList: {
      type: Array,
      default: () => [
        //   {
        //        name,
        //        url,
        //        draco,
        //        onprogress,
        //   }
      ],
    },
  },
  data() {
    return {};
  },
  render() {
    return null;
  },
  mounted() {
    if (this.modelList.length) {
      this.initLoad();
    }
  },
  watch: {
    modelList(data) {
      if (data.length) {
        this.initLoad();
      }
    },
  },
  methods: {
    initLoad() {
      this.modelList.map((item) => {
        loadModel({
          data: item,
          draco: item.draco,
          url: item.url,
          complete: (object) => {
            let group = object.scene;
            let scale = 0.0003 * 1;
            group.scale.set(scale, scale, scale);
            group.position.set(0, 0, -2.7);
            group.name = item.name;
            this.global.scene.add(group);
            item.callback && item.callback(group);
          },
          onprocess: (xhr) => {
            if (item.onprogress) {
              onProgress(xhr, () => {
                this.$emit("progress", (xhr.loaded / xhr.total) * 100);
              });
            }
          },
        });
      });
    },
  },
};
</script>

<style></style>
