<template>
  <div class="province">
    <div class="map">
      <img src="@/assets/img/skin/blackgold/province/jiangsu_bg.png" alt="" />
    </div>
    <div class="map-point">
      <div class="dot" @click="goto('wuxi')"></div>
      <div class="factory" @click="goto('xinchen', true)">
        <div class="name">
          <span>{{ "兴澄特钢" }}</span>
          <span>中国 • 江阴</span>
        </div>
        <div>
          <img
            src="@/assets/img/skin/blackgold/factorys/xinchen_pic.png"
            alt=""
          />
        </div>
      </div>
    </div>
    <svg version="1.1" viewBox="0 0 1213 1159" xml:space="preserve">
      <defs>
        <filter id="f1" x="0" y="0">
          <feOffset result="offOut" in="SourceAlpha" dx="20" dy="20" />
          <feGaussianBlur result="blurOut" in="offOut" stdDeviation="3" />
          <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
        </filter>
      </defs>
      <g filter="url(#f1)">
        <path
          fill="none"
          class="st0"
          d="M537,420l-3,2l-8-1l-5,3l-1-1l-1,3h-4l1-8l-4-3l3-3l1-4l-9-3l3-5l-2-2l1-2h-8l-5-3l-5,1v3l-10-1l1,15l-11-4
      l-2,6l-5,1l-1,3h-3l-2-2l-5,1l-8-8v-3l-4-2l-2,2l-5,1l2,2l-3,1l1,3l-2,1l1,2h-2v3l-7,2l-3-10v-7l-3-7l-2,1l-2-2l1-6l-4-5l-5-1l-2-3
      v-2h2v-3h-4v-2l4-1h-4v-3l-5-2l-1-2h-4v-4v4h-2l1-4l-2-1v7l-14-3l-2,2l-12,3l-2-1l-4,6l-1,10l-3,1v3l2,2l-2,6h6v2l4,2l1,5l9,6l1,2
      l-3,1l16,2l8,9l5-2l8,2v11l5,5h2l-2,8l9,5v3h2v2l10,2l2-2l3,1l4-2l2,2l-1,1l6,4l7-4l2,1l4,8l4-3v-3l5,5v6l3,5h5l-1,11l-3,5l3,3l4-2
      l10,1l-1-1h4l2-3l6,2l4-3h4l3,3h3l-2,1l1,8l-5,5l-1,15l-4-2l-3,4v9l-2,3h-3l2,2l-2,6l-3,1v3l1,2l3-1v3l5,7l10-3l3-6l3,2l1,12h-2l3,3
      l2,9l5,2l-7,4v5l1,3l4-1l2,5l-2,2l3,4l4-1v4l4,2l4-3v2h14l1-2l10,2l2-2l-1-12h7v-6h2v-4l4-2l5,3l5-3l3,1l-1,5h3l1,4l4,5l8,1l2,8
      l1,18h-3v-3l-1,3l-2,1l1,2l-2,6l-6,4l-4-7l-4,2l-5-5l-5-1l2-3l-5,2l-2-4l-4,2l-1-2l-4,1v-2l-9,4l-1-2l-5,1v2l4,3l1,3l-2,3l3,2h6
      l-2,7l3,6l-2,1l1,2l-3,1v8l-3,3h-7l-3,2l-1-1v6l-11,8l1,5l-3,9l10,6v3l3,1l-2,7l4,1l2,4l5-3l4,1v2l4,2l-5,6l4,2l3-1v2l4-6l3,2l-1,1
      l2,4l2-2l4,3v20l-4,4l-6,2v-3l-1,1l-3,9l-1-1l2,3h3l3,5h28v-2l5-5h4v3l1-1l5,3l4-2l2,1l2-4l1,11l1,1l2-2v3l2-1l4,3h6l4,3v2h2l7-6
      l3,1l3-2h4l4,2v-2l5,2l3-2l8,16l12,9l16,1l5-2v7l5-2v-2l2,2v5l2,2l-1,2l3,6h2l5-8l6-2l2,1l3-4l1,2l2-2v-4l-3-4l1-1l5,1l2-4l3-1l4,2
      l5-3v-7l-4-3l2-3l9,1l9-3l-2-12h2v-2h7l-3-3l1-3h-2v-2l3-2v-4l2-1l-2-1l8-4v-2l1,2l9-4l3-4l-21-22h-3l10-10l4-2h5l6,4l4,7l10,3l5,4
      l34,9v-11l-7-14l-3-11l-9-12l-20-6v-3l-8-3l4-4v-5l-5-4v-8l-2-7l-3-3l-11-2l-10-5l-3-4l-15-5l2-5l-2-3l-4-2l5-6l1-11l-3-6l-1-10
      l-6-4l-3-18l1-1l-3-2l1-5l-1-2h-4l-3-4l-5-20l-7-11l-9-23l-8-15l-5-13l-5-18v-5l-24-14l-8-4l-12-2l-4-4l-18-9l-2-4l-9-5l2-4l3-1
      l-1-1l-5-2h-7l11-1l-4-1l-1-2v2h-11l-7-3l-3-4l1-1l-2-5l3-17l4-4l1,5h2l-2-4l1-3l-2-3l-10,1l-3,2l-1,4h-11l-13,3v10l-3,3l-2,7l-3,1
      v5h-3l-2,4l2,3l2-1l2,2l-9,5l-2-2l-3,1l-3-3h-7v2l-3,3l-2-1l1,5l-2,2l-1-1l-2,3l2,8l-2,6L537,420z
      M578,736v2V736z"
        />
        <path
          class="st1"
          d="M597,635l-3-6l-4,2l-5-5l-5-1l2-3l-5,2l-2-4l-4,2l-1-2l-4,1v-2l-9,4l-1-2l-5,1v2l4,3l1,3l-2,3l3,2h6l-2,7l3,6
	l-2,1l1,2l-3,1v8l-3,3h-7l-3,2l-1-1v6l-11,8l1,5l-3,9l10,6v3l3,1l-2,7l4,1l2,4l5-3l4,1v2l4,2l-5,6l4,2l3-1v2l4-6l3,2l-1,1l2,4l2-2
	l4,3v20l-2,3l-8,3v-3l-4,7v3l-1-1l2,3h3l3,5h28v-2l5-5h2l3-5l-1-3l-3-1v-6l-3-1l2-2l-1-2l5-4h-2v-2l3-3l2-6h-2l-2-6l-12-12l-7,3l2-4
	l-3-3l12-4l1-6l-4-2l-2,1l-2-2l2-2l5,1l2-2l-3-6l1-6l-2-2l-2,1l-5-2l12-8l5,1l5-3l-6-3h-9l-4-2l-1-9l2-2l-3-6l3-5H597z M578,736v2
	V736z"
        />
        <path
          class="st1"
          @click="goto('wuxi')"
          d="M639,775l4,3v2h2l7-6l3,1l3-2h4l4,2v-2l5,2l21-11l9-9l11-7l8-4l9-1l4-6l3-2v2l1-1l-1-6h-4l-1-2l5-2v-4h-2l-1-2
	l3-4l-1-8h-5v-5l-7-7l-7-2l1-1l-2-7l-12,6l-15-2l-4-2l-2,2v2l2,1l-3,3l2,2v6h3l5-4h8l-2,4l3,7h-4l-1,9l-2-1v4l-6,7l1,3h3l-1,1l3,4
	l-2,4l-4,3l-2,8l5,1l1,2h-4l-3-3l2-14l-7-2v-2l-3-2h-7l-1,2h-2l-2-2l-7-1l-4-5h-2l-2,1l-1,4h-2l-2,6h-2v3l2,1l-1,4l-2-1v3h-2l1,2
	l-2,16l3,2l-1,5L639,775z"
        />
        <path
          class="st1"
          d="M537,420l-3,2l-8-1l-5,3l-1-1l-1,3h-4l1-8l-4-3l3-3l1-4l-9-3l3-5l-2-2l1-2h-8l-5-3l-5,1v3l-10-1l1,15l-11-4
	l-2,6l-5,1l-1,3h-3l-2-2l-5,1l-8-8v-3l-4-2l-2,2l-5,1l2,2l-3,1l1,3l-2,1l1,2h-2v3l-7,2l-3-10v-7l-3-7l-2,1l-2-2l1-6l-4-5l-5-1l-2-3
	v-2h2v-3h-4v-2l4-1h-4v-3l-5-2l-1-2h-4v-4v4h-2l1-4l-2-1v7l-14-3l-2,2l-12,3l-2-1l-4,6l-1,10l-3,1v3l2,2l-2,6h6v2l4,2l1,5l9,6l1,2
	l-3,1l16,2l8,9l5-2l8,2v11l5,5h2l-2,8l9,5v3h2v2l10,2l2-2l3,1l4-2l2,2l-1,1l6,4l7-4l2,1l4,8l4-3v-3l5,5v6l3,5h5l-1,11l-3,5l3,3l4-2
	l10,1l-1-1h4l2-3l4,2l6-3h4l3,3l3-2l-2-4l3-3l-1-4l-5-10l-1,2l-3-1v-2l-4-2l-1-2l1-2l2,1v-5l-1-4h-4v-6l5-1l1-2l6,4l2-2l-1-1h4l4,7
	h5l1-2l17,2l3-2l-2-1l2-5l4,1l1-15l5-2l-1-3l2-4l3-2v-2l-3-3l-5,1v2l-6-3l-5,4l-4-2l-1,1V420z"
        />
        <path
          class="st1"
          d="M684,688l-5-4h-5l-4-5h-6l-3,4v7l2,3h-3l2,1l-3,4l2,3h4l-3,4l1,1l-3-1l-2,9l-3-1l-7-7l-1,1l-4-7l-6,1l-6-4l-2,2
	l2,4l-1,1l-8-4l-4,10v3l3,4l-3,5l-6,3l-5,11l2-1l-5,5l2,10l3,2l1,3l-3,5h2v3l1-1l5,3l4-2l2,1l2-4v9l2,3l2-2v3l2-1l4,3h6l2-6l-3-9
	l2-10l-1-2h2v-3l2,1l2-4h-3v-3l9-12h2l3,5l7,1l3,2h2l1-2h7l3,2l2,4h4l1,2l-2,12l1,2l5,1v-2h-3l-2-3l2-6l5-3l1-4l-1-2l-1,1v-3l-4-2
	v-2l6-6v-5l2,1l1-9h4l-3-7l2-4h-8l-5,4h-3l-2-4l2-1l-2-3l3-3l-2-1v-2L684,688z"
        />
        <path
          class="st1"
          d="M674,773l8,16l12,9l16,1l5-2v7l5-2v-2l2,2v5l2,2l-1,2l3,6h2l5-8l6-2l2,1l3-4l1,2l2-2v-4l-3-4l1-1l5,1l2-4l3-1
	l4,2l5-3v-7l-4-3l2-3l9,1l9-3l-2-12h2v-2h7l-3-3l1-3h-2v-2l3-2v-4l2-1l-2-1l8-4v-2l1,2l9-4l3-4l-21-22h-3l-5-3l-13-1l-12-24l-14,2
	l-10-3l-1-2h-4l-9,6l2,6l-1,2l7,2l7,7v5h5l1,8l-3,3v3h3v3l-3,3h-2l1,2h4l1,6l-1,1v-2l-3,2l-4,6l-9,1l-8,4l-11,7l-9,9L674,773z"
        />
        <polygon
          class="st1"
          points="700,620 702,622 705,621 706,623 708,645 710,646 714,644 714,671 720,671 728,675 729,678 732,679 
	732,683 735,684 741,685 746,683 753,683 765,707 778,708 783,711 793,701 797,699 802,699 808,703 812,710 822,713 827,717 
	861,726 861,715 854,701 851,690 842,678 822,672 822,669 814,666 818,662 818,657 813,653 813,645 811,638 808,635 797,633 
	787,628 784,624 769,619 771,614 760,617 760,619 754,623 754,620 749,620 749,622 745,620 742,623 739,618 738,620 738,617 
	736,615 731,617 728,616 727,618 722,617 721,612 716,608 711,610 710,609 707,612 702,612 703,615 701,620 "
        />
        <path
          class="st1"
          d="M666,415l-4-4l-18-9l-2-4l-9-5l2-4l3-1l-1-1l-5-2h-7l11-1l-4-1l-1-2v2h-11l-7-3l-3-4l1-1l-2-5l2-15l5-6l1,5h2
	l-2-4l1-3l-2-3h-2l-8,1l-3,2l-1,4h-11l-13,3v10l-3,3l-2,7l-3,1v5h-3l-2,4l2,3l2-1l2,2l-9,5l-2-2l-3,1l-3-3h-7v2l-3,3l-2-1l1,5l-2,2
	l-1-1l-2,3l2,10l-2,3l-1,7l1-1l4,2l5-4l6,3l1-3h3l4,3l-3,6l2,2l7,2l1-1l1,3l7-7l2,1l7-2l1,3l4-4v-2l4,1v-3h5v2h-2l-1,3v5l2-1l-1,9h2
	l1,6h3l1,5l-2,2l5,3v3l6,6h13l2,4l1-1l2,3l8-6l3,3l1-2l-2-4l3-2l-1-3h-3l-2-3l1-4l-2,1l4-5l14-8l4-7l5-4l-2-3l1-5l2-1L666,415z"
        />
        <path
          class="st1"
          d="M607,596l9,3l5-2l1-8l-2-12l2-1l2-5l-2-1l-4-8l-5-2l-2,1v-6l-7-1l1-7l2-2l8-1l-3-5l5-2l12-1l5-3h8l5-3l-12-11
	l1-1l-4-11l4-1l-2-4l3-4l2-8l3-5l7-6v-5h-2l-2-6h-2l-4-4l-8,6l-2-3l-1,1l-2-4h-13l-6-6l-2,1v3l-11,10l1,3l-2,3l-2,1l-5-2l-4,3h-4
	l-4,5l-2,8l2,8l-2,1v4l-3,2l4,7l-2,14l-3,6l3,4l-25,9l-8,9l-15-2l-3,2v10h-2l3,3l2,9l5,2l-7,4l1,8l4-1l2,5l-2,2l3,4l4-1l1,5l3,1l4-3
	v2h14l1-2l10,2l2-2l-1-12h7v-6h2v-4l4-2l5,3l5-3l3,1l-1,5h3l1,4l5,5H607z"
        />
        <path
          class="st1"
          d="M771,614l-2-3l-4-2l5-6l1-13l-3-4l-1-10l-6-4l-3-18l1-1l-3-2l1-5l-1-2h-4l-3-4l-5-20l-7-11l-22-51l-5-18v-5
	l-32-18l-12-2l-4,8l2,2l-9,12l-14,8l-4,4h2l-1,4l2,3l1-1l3,3l-3,3l2,3l-1,2l7,8v4l-9,10l-3,10l-3,4l2,4l-3,1l3,11l-1,1l12,10l-5,4
	l1,3h3l4,10l4-1l2,2l-2,6l3,1v4h2v5l8-3l12,1l10-4l12,5l8,1v20l-2,2l-5,1l-4-2v6l3,2l-3,3l1,1l-3,2v2l4,1l2-2v2l-9,11l-1,7l8-1v2
	l2-8h5l3-3l1,1l5-2l8,9l3,1v-2h11v4l1-2l3,5l3-3l4,2v-2h5v3l10-7L771,614z"
        />
        <path
          class="st1"
          d="M611,661h15l4-4h7l6-3v6l4-2v4l1-4l3-1l2-3l2,1l3-4l7,1l4-8l-1-2l2-4l-2-3l-3-1l2-8l-2-3v-6l3-1l6,2l-2-6h-2
	l-3-7l3-3l-7-4l1-5l-2-3v-4l-5,2l-2-3v-9l-2-7l-4-5l1-4l4-3l2-4h-2l-1-2l3-4l-2-2h-5v-4h-2l-1-5h-2l-3-4l-12,4l-12,1l-5,2l3,5l-10,2
	l-1,8l7,1v6l2-1l5,2l4,8l2,1v2l-4,4l2,12l-1,8l-5,2l-8-3l3,27h-3v-3l-1,3l-2,1l1,2l-2,6l-6,4l-3-1l-3,5l3,6l-2,1l1,9l4,3h9L611,661z
	"
        />
        <path
          class="st1"
          d="M612,725l6-3l3-5v-3l-3-1v-3l4-10l8,4l1-1l-2-4l2-2l6,4l6-1l4,7l1-1l2,3l8,5l2-9l3,1l-1-1l3-4h-3l-3-3l3-3l-2-2
	h3l-2-2v-8l2-3l4-2l4,2l3,4h5l-4-8l-4-18l-4-5l-3-2h-6l-3,4l-2-1l-2,3h-3l-1,5l-1-4l-1,2h-2v-6h-3l-3,4l-7-1l-4,4l-12-1l-3,1l2,1
	l-5,3l-5-1l-8,4l-2,3h-2l8,4v6l3,5l-2,3h-7l2,3h5l1,5l-2,3l-1-1l-10,4l3,5h-2v2l7-3l9,10l3,1l2,7l2-1V725z"
        />
        <path
          class="st1"
          d="M732,683l1-2l-4-3l-1-3l-8-4h-6v-27l-4,2l-2-2l-3-13v-10h-4l-3-4l-2,2h-3l-1-2l1-5l9-11v-2l-4,3l-2-1v-3l3-1
	l-1-1l3-4l-3-2v-6l4,2l5-1l2-2v-20l-8-1l-12-5l-5,3h-17l-8,3v-4l-2-1l-1-5l-2,4l-4,2l-1,4l4,6l2,7v9l2,3l4-2l3,6l-2,6h4l1,3l3,1
	l-3,3l2,2l1,5h2l2,6l-8-2l-1,1v6l2,3l-2,8l3,1l2,3l-2,3v9l-3,2l6,6l4,18l4,8l4,4l5,2l15,2l11-5l10-7h4l1,2L732,683z"
        />
        <path
          class="st1"
          d="M607,458v-3l-3-3h-2l2-2l-1-5h-3l-1-6h-2l1-9l-2,1v-5l1-3h2v-2h-5v2h-4v2l-4,4l-1-3l-7,2l-2-1l-7,7l-1-3l-1,1
	l-9-4l-2,2l1,3l-5,2l-1,3v12l-4-1l-2,4l2,2l-5,2l-8-2h-7l-6,2l-4-7h-3l-1,3l-4-1l-3-3l-1,2l-5,1l-1,4l2,3l3-1l1,4v4h-2l-1,2l5,6l3,1
	v-2l2,2l5,12l-3,3l2,4v2l-2,1l1,8l-5,5l-1,15l-4-2l-3,4v9l-2,3h-3l2,2l-1,4l-1,2l-3,1l1,5l3-1v3l5,7l10-3l3-6l4,4l3-2l15,2l8-9l25-9
	l-3-4l3-6l2-14l-4-7l3-2v-4l2-1l-2-13l3-5l4-3l9-3l3,2l2-1l2-6l10-10l1-4H607z"
        />
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  data() {
    return {
      city: "",
    };
  },
  methods: {
    goto(name, isFactory = false) {
      if (isFactory) {
        this.$store.state.curFactory = name;
        this.$store.state.curObjLevel = 4;
      } else {
        this.$store.state.curCity = name;
        this.$store.state.curObjLevel = 3;
      }
      this.$store.state.zoomlevel = this.$store.state.defaultZoomLevel;
    },
  },
};
</script>

<style lang="scss" scoped>
.province {
  .map {
    position: absolute;
    left: 0;
    top: 0;
  }
}
svg {
  position: absolute;
  top: -186px;
  left: -11px;
  width: 1213px;
  transform: scale(1.52);
  path,
  polygon {
    fill: #333;
    fill-opacity: 0.1;
    &:hover {
      fill: #d8aa50;
      fill-opacity: 1;
      pointer-events: all;
    }
  }
}
.st0 {
  stroke: #d8aa50;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.st1 {
  stroke: #d8aa50;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 1, 6;
}
.map-point {
  z-index: 666;
  .dot {
    position: absolute;
    top: 160px;
    left: 280px;
    width: 27px;
    height: 47px;
    // pointer-events: none;
    &::before {
      content: "";
      display: block;
      position: relative;
      left: -4px;
      top: -8px;
      width: 27px;
      height: 47px;
      background: url("../../assets/img/skin/blackgold/dot.png") no-repeat;
      cursor: pointer;
      animation: jump 2s linear infinite;
    }
    &::after {
      content: "";
      display: block;
      position: relative;
      left: -130px;
      top: -22px;
      width: 223px;
      height: 48px;
      background: url("../../assets/img/skin/blackgold/light.png") no-repeat;
      pointer-events: none;
      animation: light 2s linear infinite;
      transform-origin: 60% center;
    }
  }
  .factory {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 10px;
    border-bottom: 1px solid #fff;
    width: 228px;
    .name {
      padding: 10px 15px;
      border: 1px solid #d8aa50;
      border-right: none;
      background: rgba(0, 0, 0, 0.8);
      span {
        display: block;
        line-height: 26px;
        &:nth-child(1) {
          font-size: 18px;
          font-weight: bold;
        }
      }
    }
    cursor: pointer;
    position: relative;
    text-align: center;
    top: 0;
    left: 0;
  }
  position: absolute;
  top: 384px;
  left: 466px;
  &::after {
    content: "";
    position: relative;
    top: 0;
    left: 227px;
    height: 1px;
    width: 120px;
    background: #fff;
    display: block;
    transform-origin: 0;
    transform: rotate(58deg);
  }
  &::before {
    content: "";
    position: relative;
    top: 98px;
    left: -5px;
    border-radius: 50%;
    height: 10px;
    width: 10px;
    background: #fff;
    display: block;
  }
}

@keyframes ripple {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(3);
    opacity: 0;
  }
}
@keyframes jump {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(10px);
  }
  100% {
    transform: translateY(0px);
  }
}
@keyframes light {
  0% {
    transform: scale(0.7);
    opacity: 0.6;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
  100% {
    transform: scale(0.7);
    opacity: 0.6;
  }
}
</style>
