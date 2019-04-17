import axios from 'axios'
export default {
    getStoreInfo() {
        return  new Promise((resolve, reject) => {
            axios.get("./static/storeInfo.json")
            .then(res=>{
                resolve(res.data);
            });
        });
        
    },
    getStoreProduction() {
        return  new Promise((resolve, reject) => {
            axios.get("./static/products.json")
            .then(res=>{
                resolve(res.data.list);
            });
        });
        
    },

}