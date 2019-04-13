<template>
  <div class="affix_warp" ref="wrapper">
    <div class="affix_seizer" ref="seizer" v-show="slotFixed"></div>

    <div
      :class="{isFixed:slotFixed,notFixed:!slotFixed}"
      :style="[originSize,{top:slotFixed?offset+'px':'0rem'}]"
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
      type:null,
      default: "0rem"
    }
  },
  computed: {
    offsetInPX() {
      if (typeof this.offset === "string") {
        if (/px$/i.test(this.offset)) {
          console.log('isPx')
          return Number.parseFloat(this.offset.replace(/px/i, ""));
        } else if (/rem$/i.test(this.offset)) {
          
          console.log('isREM')
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
          console.log('numberString');
          
          return Number.parseFloat(this.offset);
        }
      } else {
        
          console.log('number');
        return Number.parseFloat(this.offset);
      }
    },
    offsetTop() {
      return this.$el.offsetTop;
    }
  },
  methods: {
    handleScroll(e) {
      // e.stopImmediatePropagation();
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
