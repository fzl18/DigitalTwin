<script>
import { loadModel, onProgress, playAnimationByName } from "@/utils/action";
import loadingVue from "../../components/loading.vue";
export default {
  name: "Msymbol",
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
            group.name = item.name;
            if (object.animations && object.animations.length) {
              playAnimationByName(object, this.global);
            }
            let scale = 0.0003 * 1;
            group.scale.set(scale, scale, scale);
            // group.rotateX(Math.PI / 2);
            // group.rotateY(-Math.PI / 2);
            group.position.set(0, 0, 0);
            this.global.scene.add(group);
            item.callback && item.callback(group);
          },
          onprocess: (xhr) => {
            if (item.onprogress) {
              onProgress(xhr, () => {
                this.$emit("progress", (xhr.loaded / xhr.total) * 100);
              });
              return true;
            } else {
              return false;
            }
          },
        });
      });
    },
  },
};
</script>

<style></style>
