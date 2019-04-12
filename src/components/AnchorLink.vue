<template>
  <a ref="link" :href="href" @click="linkClick">
    <slot></slot>
  </a>
</template>
<script>

import Utils from '@/Utils'
function scollTo(hashID, offset) {
  let target = document.querySelector(hashID);
  let pos = Utils.getPosition(target).top;
    window.scrollTo(0, pos);
}


export default {
  data() {
    return {};
  },
  props: {
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
      console.log(this.offset);
      scollTo(this.href, Number.parseFloat(this.offset.replace(/px/i, "")));
    }
  }
};
</script>
