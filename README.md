**购物商场**

​	介绍：这个购物商场包括了首页，分类页，搜索页，商品详情页，购物车页，结算页，个人页，地址管理页。1

​	总结：①接口中有html结构的，不能渲染到页面上，这里我使用了一个插件wxParse，它可以在微信开发者工具中模拟出来，可是很坑的一点是，它在手机端显示会有些许不正常，所以这里尽量对返回的数据进行处理，标签换成wxml能解析的标签。

​	②做商品加减以及总价计算时，让商品在购物车页面正常的显示，这里涉及到数组的深浅拷贝，以及storage的各种处理。

​	③把有共同功能的抽取出来形成组件，这样代码可以更简洁，这里涉及到父子组件传值，父组件传值.sync，子组件 twoWay设置为true。

​	④遇到bug一定要有耐心，一步步分析。

​	页面展示如下：

​	（1）首页

​	这个页面有搜索，轮播图，以及各种数据展示，右下角还有一个回到顶部。搜索框我把代码提取出来形成了一个组件，每个页面都可以使用，功能点：点击搜索就会跳转到搜索页面。轮播图是超火热商品展示，点击图片可以到相应推荐商品详情。回到顶部是以搜索框高度为基准，当滑动离顶部距离高于这个基准，就会显示回到顶部，相应如果没到这个基准，就会隐藏这个logo提示。取数据，渲染到页面上，进行布局，这个页面用了弹性布局以及浮动和定位。抽取的组件详见代码component目录。抽取的公共api详见代码，该api抽取了请求服务器各种数据的方法。	



![](https://github.com/lingangle/Shopping/raw/master/programImage/首页.png)

![](https://github.com/lingangle/Shopping/raw/master/programImage/首页-顶部.png)

​	（2）分类页

​		这个页面用了scroll-view，因为页面涉及到两个块的滑动，所以通过scroll-view控制两个块的独立滑动。该页面涉及到三级列表。

![](https://github.com/lingangle/Shopping/raw/master/programImage/分类.png)

​	(3)搜索页

​	这里会有历史记录的保存，以及历史记录最多保存个数，搜索相应商品会跳转到商品页面，对商品分别进行了默认、按价格以及按销售量排序。这里有涉及到数组的深浅拷贝、storage的处理，tabBar等等。

![](https://github.com/lingangle/Shopping/raw/master/programImage/搜索.png)

![](https://github.com/lingangle/Shopping/raw/master/programImage/搜索内容.png)



![](https://github.com/lingangle/Shopping/raw/master/programImage/销量.png)

​														价格降序

![](https://github.com/lingangle/Shopping/raw/master/programImage/价格.png)

![](https://github.com/lingangle/Shopping/raw/master/programImage/价格升序.png)

(4)商品详情

​	对商品进行一个详细的描述，商品的轮播图以及它的介绍（图文介绍和规格参数），这里可以加入购物车以及去购物车查看自己购买的商品。这里面去哆啦A梦宝盒涉及到用户有没有登录，如果用户没有登录会跳转到我的页面，用户如果已经登录会调到购物车页面，凭据是会有一个token。

![](https://github.com/lingangle/Shopping/raw/master/programImage/商品详情.png)

![](https://github.com/lingangle/Shopping/raw/master/programImage/详情-图文介绍.png)

（5）购物车页面

​	因为这里是模拟的，后台服务器没有加入购物车的接口，所以这里使用了storage存储商品。通过加入购物车这个按钮，我把该商品的id以及个数都存在了storage里面。购物车页面取出数据，再调相应的接口把数据渲染出来。对商品进行加减以及全选、取消全选和购总价的功能。在这里，我使用了一个toast弹窗插件，因为不是企业没有支付功能，所以我选择了模拟支付弹窗。调用接口会把所有的订单号里面的商品展示出来。

​	购物车分两种状态，有商品的购物车以及空空如也的购物车。判断依据是storage里面有没有商品这个键。对商品数量进行加减时，需要动态的改变总价，所以这里使用了wepy的computed属性，它可以依据data属性里面的值进行复杂的计算，并返回一个值，在template中调用这个值即可，调用方式如data里面的属性类似。

​	做商品数量减时，会做一个智能提示，以及判断是否删除storage里面商品值。当商品数量为1时，会提示是否要删除该商品。如果删除，会从storage商品数组里面删除对应的商品id,以及页面上相关的数据也要做出相应的修改。

​	进来这个页面之前会判断是否用户已登录，如果没有登录会跳转到我的页面。以及在付款前做了判断：是否添加商品，是否选择了地址。

![](https://github.com/lingangle/Shopping/raw/master/programImage/购物车.png)



![](https://github.com/lingangle/Shopping/raw/master/programImage/购物车-删除商品.png)

![](https://github.com/lingangle/Shopping/raw/master/programImage/支付.png)



![](https://github.com/lingangle/Shopping/raw/master/programImage/选择位置.png)

（6）我的页面

​	显示用户信息，以及订单等页面。在这里点击我的订单，会跳转到相应页面，并渲染相应的数据。这里用了wx.login以及wx.getuserInfo等等。

![](https://github.com/lingangle/Shopping/raw/master/programImage/我的.png)

（7）订单页面

​	这里面用了tabBar，点击对应的标签会显示对应的商品。tabBar已经抽取成组件，这里涉及到父子组件传值。

![](https://github.com/lingangle/Shopping/raw/master/programImage/订单.png)