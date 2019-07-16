$(()=> {
    //先获取id，用一个变量存起来
    let id = parseInt(location.search.substring(4));
    //遍历数组，找到和我一样的对象，然后写到页面中
    let obj = phoneData.find(function(e,i){
        //需要返回一个id
        return e.pID == id;
    })
    //然后通过这个获取到的id，改变样式
    $('.sku-name').text(obj.name)
    //改价格
    $('.summary-price em').text('￥'+obj.price)
    //改图片路径
    $('.preview-img>img').attr('src',obj.imgSrc)


    //设置增加和减少数量功能
    //先获取元素一个+一个-号一个
    let addBtn = $('.add')
    let reduceBtn = $('.reduce')
    let chooseNumber = $('.choose-number')
    //注册加号点击事件
    addBtn.on('click',function(){
        //然后数量增加，先获取文本里面数量是几
        let shuzi = parseInt(chooseNumber.val());
        //因为是加上去的所以++
        shuzi++;
        //判断当框内的数字大于1的时候就把禁止减少的图标去掉
        if(shuzi > 1){
            reduceBtn.removeClass('disabled')
        }
        //然后把它放回框里
        chooseNumber.val(shuzi);
    })
    //然后给减号注册点击事件
    reduceBtn.on('click',function(){
        //先知道框里数字是多少，才能进行减少
        let shuzi = parseInt(chooseNumber.val());
        //如果当前等于1的话就不可以再点击了
        if(shuzi === 1){
            return;
        }
        //然后是减少的，所以自减
        shuzi--;
        //设置如果文本的件数等于1的时候就显示禁止点击图标
        //判断
        if(shuzi === 1){
            reduceBtn.addClass('disabled')
        }
        //再把它给文本内容
        chooseNumber.val(shuzi);
    })


    //把数据上传到本地数据上面
    $('.addshopcar').on('click',function(){
        //先获取件数框里面的内容
        let number = parseInt($('.choose-number').val());
        //先从本地数据读取
        let jsonStr = localStorage.getItem('shopCartData')

        let arr;
        //判断本地数据有没有数据，如果有就叠加，如果没有就给一个空数组
        if(jsonStr === null){
            arr = [];
        }else {
            //如果有的话就把里面的数据取出来
            arr = JSON.parse(jsonStr);
        }
        // 但是又发现如果点击同一个商品两次，就会一个商品出现两个在购物车里面，如果点击的是同一个商品，最好，把数量叠加
        // 判断当前产品的id，是否出现在 localStroge 里面的数组里面，如果出现，就是曾经添加过了，只要叠加数量

        //通过find循环来找
        let isExit = arr.find(e=>{
            return e.pID === id;
        });
        //判断如果里面有相同的id就只添加数量
        if(isExit !== undefined){
            isExit.number += number;
        }else {
            //如果里面没有相同的id就新添加一个
            let good = {
                pID: obj.pID,
                price: obj.price,
                name: obj.name,
                imgSrc: obj.imgSrc,
                number: number,
            }
            //加入数组里面
            arr.push(good);
        }
        //转换为json格式
        jsonStr = JSON.stringify(arr);
        //然后再上传到本地
        localStorage.setItem('shopCartData',jsonStr)
        //实现跳转页面
        location.href = 'cart.html';
    });
});