<template>
  <div>
    <div id="storeInfo" class="tab">
      <div class="bg" v-bind:style="{backgroundImage:'url(' + info.background + ')'}"></div>

      <img class="thumb" :src="info.thumb">
      <div class="storeContent">
        <span style="font-size:1.5rem">{{info.name}}</span>
        <br>
        <br>
        <span style="font-size:1rem">
          <span>评价{{info.rating}}</span>
          <i style="margin:0 0.5rem;">|</i>
          <span>月售{{info.comment_count}}</span>
          <i style="margin:0 0.5rem;">|</i>
          <span>配送约{{info.eta}}分钟</span>
        </span>
      </div>
    </div>
    <affix style="margin-bottom:1rem;">
      <div ref="affix1" id="tabCon" class="text-l bg-white">
        <span>点餐</span>
        <span>评价</span>
        <span>商家</span>
      </div>
    </affix>
    <div id="hotList">
      <div class="hotListItem" v-for="(item, index) in hotList" :key="index">
        <div
          style="width:100%;height:10rem;background-position:center;background-size:cover;"
          v-bind:style="{backgroundImage:'url(' + item.image + ')'}"
        ></div>
        <div style="padding:0.5rem;">
          <div>{{item.name}}</div>
          <div style="margin-top:0.5rem;position:relative;">
            <span class="text-l text-danger">￥{{item.price}}</span>

            <div class="editor text-xl" style="padding:0;">
              <i
                class="fa fa-minus-circle minus text-primary"
                :class="{show:$store.getters.hasItem(item.id)}"
                @click="$store.commit('removeItem',item.id)"
              ></i>
              <span
                class="text-l"
                style="margin:0 0.2rem;"
                v-show="$store.getters.hasItem(item.id)"
              >{{$store.getters.itemCount(item.id)}}</span>
              <i class="fa fa-plus-circle plus text-primary" @click="addItem(item)"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="productList">
      <div style="display:flex">
        <div class="typeList">
            <Affix :offset="affix1Height">
              <anchors :offset="affix1Height">
                <anchor-link
                  class="typeItem"
                  :href="'#anchor'+key"
                  v-for="(item, key,index) in typeList"
                  :key="index"
                  :label="key+$store.getters.typeCount(key)"
                  :offset="affix1Height"
                >
                </anchor-link>
              </anchors>
            </Affix>
        </div>
        <div class="list">
          <div v-for="(item,key, index) in typeList" :key="index">
            <Affix :offset="affix1Height" :id="'anchor'+key">
              <div class="itemCategory">{{key}}</div>
            </Affix>
            <div class="listItem" v-for="(subitem, subindex) in item" :key="subindex">
              <div class="thumb" v-bind:style="{backgroundImage:'url(' + subitem.image + ')'}"></div>
              <div class="info">
                <div class="text-l">{{subitem.name}}</div>
                <div class="text-light">{{subitem.description}}</div>

                <div class="text-l" style="margin-top:auto;">
                  <span class="text-m text-danger">￥</span>
                  <span class="text-danger">{{subitem.price}}</span>
                </div>
              </div>
              <div class="editor text-xl">
                <i
                  class="fa fa-minus-circle text-primary minus"
                  :class="{show:$store.getters.hasItem(subitem.id)}"
                  @click="$store.commit('removeItem',subitem.id)"
                ></i>
                <span
                  class="text-l"
                  style="margin:0 0.8rem;"
                  v-show="$store.getters.hasItem(subitem.id)"
                >{{$store.getters.itemCount(subitem.id)}}</span>
                <i class="fa fa-plus-circle text-primary plus" @click="addItem(subitem)"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="cashier" class="text-white">
        <span class="text-danger text-xl text-bold">￥{{$store.getters.totalPrice}}</span>
        <span>共{{$store.getters.totalItemCount}}件商品</span>
      </div>
    </div>
  </div>
</template>
<script>
import Affix from "../components/Affix";
import Mock from "../StoreServ";
import AnchorLink from "../components/AnchorLink";
import Anchors from "../components/Anchors";
export default {
  components: {
    Affix,
    Anchors,
    AnchorLink
  },
  data() {
    return {
      info: {},
      productList: [],
      searchBarFixed: false,
      offsetTop: 0,
      affix1Height: 0,
    };
  },
  methods: {
    addItem(item) {
      this.$store.commit("addItem", item);
    }
  },
  computed: {
    totalCount() {
      return this.$store.getters.totalItemCount;
    },
    typeList() {
      let sorted = {};
      this.productList.forEach((item, index) => {
        item.id = index;

        if (sorted.hasOwnProperty(item.type)) {
          sorted[item.type].push(item);
        } else {
          sorted[item.type] = [item];
        }
      });
      return sorted;
    },
    hotList() {
      let hot = this.productList.filter((item, index, arr) => {
        return item.isHot;
      });
      return hot;
    },
    recommendList() {}
  },
  created() {},
  mounted() {
    Mock.getStoreInfo().then(res => {
      this.info = res;
    });

    Mock.getStoreProduction().then(res => {
      this.productList = res;
    });
    this.affix1Height = this.$refs["affix1"].offsetHeight;
  }
};
</script>
<style scoped>
#storeInfo {
  position: relative;
  height: 18rem;
}

#storeInfo .thumb {
  position: absolute;
  top: 7.5rem;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 5rem;
  height: 5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

#storeInfo .bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 10rem;
  width: 100%;

  background-size: cover;
  background-position: bottom;
  background-clip: content-box;
}

#storeInfo .storeContent {
  text-align: center;

  position: absolute;
  top: 13rem;
  width: 100%;
}

#tabCon {
  width: 100%;
  border-bottom: 1px solid #eee;
  padding: 0.5rem 2rem;
  width: 100%;
  display: flex;
  justify-content: space-around;
}
#hotList {
  overflow-x: scroll;
  padding-bottom: 1rem;
  vertical-align: bottom;
  white-space: nowrap;
}

.hotListItem {
  display: inline-block;
  vertical-align: top;
  width: 10rem;
  height: 15rem;
  margin-right: 1rem;
  flex-shrink: 0;
  border-radius: 0.3rem;
  overflow: hidden;
  box-shadow: 0px 5px 10px #eee;
}
.hotListItem:first-child {
  margin-left: 1rem;
}

#productList .typeList {
  width: 6rem;
  flex-shrink: 0;
  background: #f3f3f3;
}

.typeItem {
  display: block;
  width: 100%;
  padding: 1rem 1rem;
  color:#666;

}
.activeAnchorLink{
  background: #fff;
  color:#000;
  font-weight: bold;
}

#productList .list {
  flex-grow: 1;
  padding-left: 0.5rem;
  padding-right: 1rem;
  margin-bottom: 8rem;
}
.itemCategory {
  width: 100%;
  padding: 0.5rem 0;
  background: #fff;
  font-weight: bold;
}
.listItem {
  position: relative;
  height: 8rem;
  margin-bottom: 1rem;
}
.listItem .thumb {
  width: 8rem;
  height: 8rem;
  float: left;
  background-size: cover;
  background-position: center;
}

.listItem .info {
  width: auto;
  padding-left: 0.5rem;
  margin-right: 0rem;
  margin-left: 8rem;
  min-height: 100%;
  display: flex;
  flex-direction: column;
}
.editor {
  position: absolute;
  text-align: center;
  right: 0;
  bottom: 0;
  width: 5.5rem;
  height: auto;
}

.editor .plus {
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 9;
}
.editor .minus {
  position: absolute;
  left: 0;
  bottom: 0;
  transition: 0.2s all;
  transform-origin: 50% 50%;
  z-index: 1;
  transform: translateX(2rem) rotate(180deg);
  opacity: 0;
}

.editor .minus.show {
  transform: rotate(0) translateX(0px);
  opacity: 1;
}
.bottomBar {
  height: 4rem;
}
#cashier {
  position: fixed;
  padding: 1rem;
  width: 100%;
  height: 5rem;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 199;
}

@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
  #cashier {
    height: 7rem;
  }
}

@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
  #cashier {
    height: 7rem;
  }
}

@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
  #cashier {
    height: 7rem;
  }
}
</style>
