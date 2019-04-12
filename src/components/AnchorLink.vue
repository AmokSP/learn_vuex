<template>
  <a ref="link" :href="href" @click="linkClick">
    <slot></slot>
  </a>
</template>
<script>
function scollTo(hashID, offset) {
  let target = document.querySelector(hashID);
  let pos = getPosition(target).top;
    window.scrollTo(0, pos);
}

function getPosition(element) {
  var actualLeft = element.offsetLeft,
    actualTop = element.offsetTop,
    current = element.offsetParent; // 取得元素的offsetParent

  // 一直循环直到根元素
  while (current !== null) {
    actualLeft += current.offsetLeft;
    actualTop += current.offsetTop;
    current = current.offsetParent;
  }

  // 返回包含left、top坐标的对象
  return {
    left: actualLeft,
    top: actualTop
  };
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
