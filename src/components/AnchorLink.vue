<template>
  <a ref="link" :href="href" @click="linkClick">{{label}}</a>
</template>
<script>
import Utils from "@/Utils";
function scollTo(hashID, offset) {
  let target = document.querySelector(hashID);
  let pos = Utils.getPosition(target).top;
  let scrollTop =
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop;
  window.scrollTo(0, pos-offset);
}

export default {
  data() {
    return {};
  },
  props: {
    label: {
      type: String,
      default: ""
    },
    offset: {
      default: 0
    },
    href: {
      type: String,
      default: ""
    },
    label: {
      type: null,
      default: ""
    },
    hashURL: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    linkClick(e) {
      if (!this.hashURL) {
        e.preventDefault();
      }
      scollTo(this.href, this.offset);
      let arr = Array.from(document.querySelectorAll(".activeAnchorLink"));
      arr.forEach(item => {
        item.classList.remove("activeAnchorLink");
      });
      this.$refs["link"].classList.add("activeAnchorLink");
    }
  }
};
</script>
