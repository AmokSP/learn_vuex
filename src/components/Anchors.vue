<template>
  <div>
    <slot></slot>
  </div>
</template>
<script>
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