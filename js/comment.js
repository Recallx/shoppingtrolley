//公共代码写在一个js文件里面

//入口函数
$(()=>{
 //计算购物车里面的商品总数就属于在多个页面都用的代码 - 提取到一个新的js里面
  // 读取本地数据里面的商品信息，计算出一个总数，修改购物车总的商品数量
  // 根据再从本地数据中读取出字符串
  //先获取数据
  let arr = kist.loadArray('shopCartData')
  //直接计算出总的数量，设置给红色泡泡
  let total = 0;
  arr.forEach(e => {
      total += e.number;
  });
  //修改到购物的红色泡泡里
  $('.count').text(total);
});