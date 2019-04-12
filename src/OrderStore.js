import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex);
const orderstore = new Vuex.Store({
    state: {
        shoppingCart: [],
    },
    mutations: {
        addItem(state, item) {
            state.shoppingCart.unshift(item);
        },
        removeItem(state,id) {
            let itemIndex = state.shoppingCart.findIndex(item=>{
                return item.id==id;
            });
            console.log(itemIndex);
            if (itemIndex ==-1) return;
            state.shoppingCart.splice(itemIndex,1);
        },
    },
    getters: {
        totalItemCount(state) {
            return state.shoppingCart.length;
        },
        totalPrice(state) {
            if (state.shoppingCart.length==0) {
                return 0;
            }
            return state.shoppingCart.reduce((current,next)=>{
                return current+next.price;
            },0);
        },
        typeCount: (state) => {
            return (type) => {
                return state.shoppingCart.filter(item => {
                    return item.type == type
                }).length;
            }
        },
        itemCount:(state) =>{
            return (id)=>{
                return state.shoppingCart.filter(item => {
                    return item.id == id
                }).length;
            }
        },
        hasType:(state) =>{
            return (type)=>{
                return state.shoppingCart.some((item)=>{
                    return item.type==type;
                });
            }
        },
        hasItem:(state) =>{
            return (id)=>{

                return state.shoppingCart.some((item)=>{
                    return item.id==id;
                });
            }
        }
    },
});

export default orderstore;