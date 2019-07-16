//获取到数据之后，遍历这个数组


//声明一个空变量
let html = '';
phoneData.forEach(e => {
    html += `<li class="goods-list-item">
    <a href="detail.html?id=${e.pID}">
      <div class="item-img">
        <img src="${e.imgSrc}" alt="">
      </div>
      <div class="item-title">
       ${e.name}
      </div>
      <div class="item-price">
        <span class="now">¥${e.price}</span>
      </div>
      <div class="sold">
        <span> 已售 <em>${e.percent}% </em></span>
        <div class="scroll">
          <div class="per" style = "width:${e.percent}%"></div>
        </div>
        <span>剩余<i>29</i>件</span>
      </div>
    </a>
    <a href="#" class="buy">
      查看详情
    </a>
  </li>`
})
//添加给ul
$('.goods-list > ul').html(html);