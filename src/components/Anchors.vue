<template>
  <div>
    <slot></slot>
  </div>
</template>
<script>
import Uitls from "@/Utils"
export default {
  data() {
    return {
      linkElements: [],
      anchors: []
    };
  },
  methods: {
    handleScroll(e) {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;

      let anchorPos = this.linkElements.map(item => {
        let elm = document.getElementById(item);
        return Utils.getPosition(elm);
      });
       console.log(anchorPos.findIndex((item,index,arr)=>{
         return scrollTop<item;
       }));
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