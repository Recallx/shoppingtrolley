//写一个入口函数
$(()=> {
    //把数据从本地数据拿出来
    let jsonStr = localStorage.getItem('shopCartData')
    //然后判断数组里面有没有数据，如果有数据就创建一个新的格式
    let arr;
    if(jsonStr !== null){
        //把本地数据放到数组里面
        arr = JSON.parse(jsonStr);
        let html = '';
        arr.forEach(e => {
            html += ` <div class="item" data-id="${e.pID}">
            <div class="row">
              <div class="cell col-1 row">
                <div class="cell col-1">
                  <input type="checkbox" class="item-ck" checked="">
                </div>
                <div class="cell col-4">
                  <img src="${e.imgSrc}" alt="">
                </div>
              </div>
              <div class="cell col-4 row">
                <div class="item-name">${e.name}</div>
              </div>
              <div class="cell col-1 tc lh70">
                <span>￥</span>
                <em class="price">${e.price}</em>
              </div>
              <div class="cell col-1 tc lh70">
                <div class="item-count">
                  <a href="javascript:void(0);" class="reduce fl">-</a>
                  <input autocomplete="off" type="text" class="number fl" value="${e.number}">
                  <a href="javascript:void(0);" class="add fl">+</a>
                </div>
              </div>
              <div class="cell col-1 tc lh70">
                <span>￥</span>
                <em class="computed">${e.price * e.number}</em>
              </div>
              <div class="cell col-1">
                <a href="javascript:void(0);" class="item-del">从购物车中移除</a>
              </div>
            </div>
          </div>`;
        });
        //然后添加到前代元素里面
        $('.item-list').html(html);
        //当页面没有数据时，显示空空如也
        $('.empty-tip').hide();
        //把表头和总计显示出来
        $('.cart-header').removeClass('hidden');
        $('.total-of').removeClass('hidden');
    } 


    //计算总价和件数
    //用一个函数装起来，后面可以调用
    function computedCountAndMoney(){
        //声明两个变量，一个代表总价，一个代表件数
        let totalMoney = 0;
        let totalCount = 0;
        //获取到所有的多选框
        $('.item-list input[type=checkbox]:checked').each((i,e)=> {
            //获取到item的每一个id
            let id = parseInt($(e).parents('.item').attr('data-id'));
            //然后循环数组，如果有相同的id，就勾选
            arr.forEach(e=> {
                //判断如果id和本地数据上面的id有一样的话
                if(id === e.pID){
                //然后把价格和数量设置给上面的变量
                totalCount += e.number;
                totalMoney += e.number * e.price;
                }
            });
        });
        //修改总价和数量
        $('.selected').text(totalCount);
        $('.total-money').text(totalMoney);
    };
    //调用函数，才会执行
    computedCountAndMoney();

    //实现全选和全不选
    $('.pick-all').on('click',function(){
        //先设置自己被选中
        let stannc = $(this).prop('checked')
        //然后同步给其他单选框
        $('.item-ck').prop('checked',stannc)
            //设置如果全部单选框都勾选了，其他全选框也一样勾选
    $('.pick-all').prop('checked',stannc)
    computedCountAndMoney();
    });
    //因为这些数据是动态生成的，所以更加推荐用事件委托来做
    $('.item-ck').on('click',function(){
        //判断如果单选框的长度等于选中时候的长度就是全选了。
        let isAll = $('.item-ck').length === $('.item-ck:checked').length;
        $('.pick-all').prop('checked',isAll);
    });
    



    //然后实现增加数量的按钮
    //因为是动态生成的，所以用委托的方式来注册
    $('.item-list').on('click','.add',function(){
        //先拿到本来里面的数据
        let oldVal = parseInt($(this).siblings('input').val());
        //然后是++
        oldVal++;
        //然后判断如果是大于1，就去除disabled
        if(oldVal>1){
            $(this).siblings('.reduce').removeClass('disabled')
        }
        //再设置回去
        $(this).siblings('input').val(oldVal);
        //然后更新本地存储里面的数据
        //判断依据 点击按钮的对应的商品id
        let id = parseInt($(this).parents('.item').attr('data-id'));
        let obj = arr.find(e => {
            return e.pID === id;
        });
        //更新对应的数据
        obj.number = oldVal;
        //还要覆盖回本地数据
        let jsonStr = JSON.stringify(arr);
        localStorage.setItem('shopCartData',jsonStr);
        //重新计算总和和总数
        computedCountAndMoney();
        //把对应商品的前也要计算
        $(this).parents('.item').find('.computed').text(obj.price * obj.number);
    });
    //注册减少数量的按钮
    $('.item-list').on('click','.reduce ',function(){
        //先获取文本内容
        let oldVal = parseInt($(this).siblings('input').val());
        //然后判断如果等于1，就不能再点了
        if(oldVal ===1){
            return;
        }
         //内容是--
         oldVal--;
         //再判断一次如等于1就显示不能点击的图标
         if(oldVal===1){
             $(this).addClass('disabled');
         }
        //再设置回去
        $(this).siblings('input').val(oldVal);
        //然后更新本地存储里面的数据
        //判断依据 点击按钮的对应的商品id
        let id = parseInt($(this).parents('.item').attr('data-id'));
        let obj = arr.find(e => {
            return e.pID === id;
        });
        //更新对应的数据
        obj.number = oldVal;
        //还要覆盖回本地数据
        let jsonStr = JSON.stringify(arr);
        localStorage.setItem('shopCartData',jsonStr);
        //重新计算总和和总数
        computedCountAndMoney();
        //把对应的商品的钱也要重新计算
        $(this).parents('.item').find('.computed').text(obj.price* obj.number);
    });
        //实现删除
        $('.item-list').on('click','.item-del',function(){
            //在外面把this用一个变量存起来，下面可以用
            let _this = this;
            //弹出一个确认框
            $('#dialog-confirm').dialog({
                resizable: false,
                height: 140,
                modal:true,
                buttons:{
                    "确认":function(){
                        $(this).dialog("close");
                        //把对应的商品删除
                        //把对应的结构移出
                        $(_this).parents('.item').remove();
                        //把本地数据移出
                        //根据id获取本地存储里面的数据
                        let id = parseInt($(_this).parents('.item').attr('data-id'))
                        //把对应的id数据读取出来
                        let index = arr.findIndex((e)=> {
                            return e.pID === id;
                        });
                        arr.splice(index,1);
                        //把数据覆盖回本地
                        let jsonStr = JSON.stringify(arr);
                        localStorage.setItem('shopCartData',jsonStr);
                    },
                    "取消": function () {
                        $(this).dialog("close");
                      }
                }
            });
        });
});