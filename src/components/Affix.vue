<template>
  <div class="affix_warp" ref="wrapper">
    <div class="affix_seizer" ref="seizer" v-show="slotFixed"></div>

    <div
      :class="{isFixed:slotFixed,notFixed:!slotFixed}"
      :style="[originSize,{top:slotFixed?offset:'0rem'}]"
    >
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      scrollTop: 0,
      slotFixed: false,
      originSize: {}
    };
  },
  props: {
    offset: {
      default: "0rem"
    }
  },
  computed: {
    offsetInPX() {
      if (typeof this.offset === 'string') {
        if (/px$/i.test(this.offset)) {
          return Number.parseFloat(this.offset.replace(/px/i, ""));
        } else if (/rem$/i.test(this.offset)) {
          let html = document.querySelector("html");
          let rootFontSize;
          if (window.getComputedStyle) {
            rootFontSize = getComputedStyle(html, false)["fontSize"];
          } else {
            rootFontSize = html.currentStyle["fontSize"];
          }
          rootFontSize = Number.parseFloat(rootFontSize.replace(/px/i, ""));
          let remValue = Number.parseFloat(this.offset.replace(/rem/i, ""));

          return remValue * rootFontSize;
        } else if (/\d?/.test(this.offset)) {
          return Number.parseFloat(this.offset);
        }
      } else {
        return Number.parseFloat(this.offset);
      }
    },
    offsetTop() {
      return this.$el.offsetTop;
    }
  },
  methods: {
    handleScroll() {
      this.scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (this.scrollTop >= this.offsetTop - this.offsetInPX) {
        this.slotFixed = true;
      } else {
        this.slotFixed = false;
      }
    }
  },
  mounted() {
    let seizer = this.$refs["seizer"];
    let slot = this.$el;
    seizer.style.width = slot.offsetWidth + "px";
    seizer.style.height = slot.offsetHeight + "px";
    this.originSize = {
      width: slot.offsetWidth + "px",
      height: slot.offsetHeight + "px"
    };
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>
<style scoped>
.affix_wrap {
  position: relative;
}

.affix_seizer {
  position: relative;
}
.isFixed {
  position: fixed;

  z-index: 97;
}
.notFixed {
  position: relative;
  z-index: 98;
}
</style>
