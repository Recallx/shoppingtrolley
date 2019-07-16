//封装一个获取数组的方法
let kist = {};

kist.loadArray = function(key){
    let str = localStorage.getItem(key);
    let arr;
    if(str === null){
        arr = [];
    }else {
        arr = JSON.parse(str);
    }
    return arr;
}