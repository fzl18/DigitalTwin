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

# 布局：

    views/layers  文件夹 放置布局文件   上下结构
                header 放头部 （上）
                nav 放菜单 （下）
                 |- 又分为 左中右/下  结构
                panel 放面板参数  绝对定位（全屏）

# 换肤：

    skin:放置对应布局的皮肤组件

# webSocket

# gis

# 常见问题

1.  为什么 layer 层需要放置在 model 组件内？
    答：为了能拿到当下 3d 场景的上下文。
