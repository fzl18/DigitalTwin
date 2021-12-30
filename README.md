# DigitalTwin

Vue-cli 构建
npm i 安装模块
npm run serve 本地调试
npm run build 打包

# 结构：

    -public/draco 存放模型压缩后的解压 js 代码，在模型加载完成后调用解压处理。
    -public/model 存放模型文件，也可加载远程地址。

    src/assets 静态文件
    src/common 通用三方库的封装使用
    src/components 公共组件
    src/common 通用三方库的封装使用

3d 场景使用：
views/model/index.vue 封装集成了 threejs 3D 所需要的场景、灯光、控制器、摄像机、渲染器。
<Model>
<symbol> - 中间放需要加载的 3d 模型文件，或 div 都可
</Model>
