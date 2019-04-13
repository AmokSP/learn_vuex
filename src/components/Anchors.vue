<template>
  <div>
    <slot></slot>
  </div>
</template>
<script>
import Utils from "@/Utils";
export default {
  data() {
    return {
      linkElements: [],
      anchors: []
    };
  },
  props: {
    offset: {
      type: Number,
      default: 0
    }
  },
  methods: {
    handleScroll(e) {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;

      let anchorPos = this.anchors.map(item => {
        let elm = document.querySelector(item);
        return Utils.getPosition(elm).top;
      });
      let index = Math.max(
        anchorPos.findIndex((item, index, arr) => {
          return scrollTop < item - this.offset;
        }) - 1,
        0
      );
      if (document.body.scrollHeight - scrollTop>window.window.innerHeight) {
        this.linkElements.forEach(item => {
          item.classList.remove("activeAnchorLink");
        });

        this.linkElements[index].classList.add("activeAnchorLink");
      } else {
      }
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  updated() {
    if (!this.$slots.default) return;

    this.anchors = this.$slots.default.map(item => {
      return item.componentInstance.href;
    });
    this.linkElements = this.$slots.default.map(item => {
      return item.elm;
    });
    this.linkElements[0].classList.add("activeAnchorLink");
    console.log(this.anchors);
    console.log(this.linkElements);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>
<style scope>
</style>