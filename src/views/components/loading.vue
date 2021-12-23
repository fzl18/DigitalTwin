<template>
  <div class="loading">
    <div class="loading-box">
      <svg>
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="transparent"
          stroke-width="3"
          stroke-dasharray="31.415, 31.415"
          stroke="#e7d340"
          stroke-linecap="round"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0, 25 25;360, 25 25"
            dur="1.5s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke"
            values="#e7d340;#938835;#e7d340"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>

        <circle
          cx="25"
          cy="25"
          r="10"
          fill="transparent"
          stroke-width="3"
          stroke-dasharray="15.7, 15.7"
          stroke="#938835"
          stroke-linecap="round"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="360, 25 25;0, 25 25"
            dur="1.5s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke"
            values="#938835;#e7d340;#938835"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
      <div class="loading-tip">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loading",
};
</script>

<style lang="scss" scoped>
.loading {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .loading-box {
    margin-top: -30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    svg {
      width: 50px;
      height: 50px;
    }
  }
}
</style>
