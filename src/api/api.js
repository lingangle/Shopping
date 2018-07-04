const baseUrl = "https://127.0.0.1/";

const wxRequst = (params, url) => {
  wx.showToast({
    title: '加载中...',
    icon: 'loading'
  });
  wx.request({
    url: url,
    method: params.method || 'GET',
    data: params.data || {},
    header: params.header || {
      'Content-Type': 'application/json'
    },
    success: (resp) => {
      params.success && params.success(resp)
      wx.hideToast()
    },
    fail: (resp) => {
      params.fail && params.fail(resp)
    },
    complete: (resp) => {
      params.complete && params.complete(resp)
    }
  })
}

// 获取banner详情
const getBanner = (parmas) => { wxRequst(parmas, baseUrl + 'api/public/v1/home/swiperdata') };
// 获取分类
const getFenlei = (parmas) => { wxRequst(parmas, baseUrl + 'api/public/v1/home/catitems') };
// 获取楼层数据
const getLoucen = (parmas) => { wxRequst(parmas, baseUrl + 'api/public/v1/home/floordata') };
// 获取商品数据
const getGoods = (parmas) => { wxRequst(parmas, baseUrl + 'api/public/v1/goods/detail?goods_id=') };
// 获取分类数据
const getFenleiS = (parmas) => { wxRequst(parmas, baseUrl + 'api/public/v1/categories') };
// 获取购物车数据
const getCar = (parmas) => { wxRequst(parmas, baseUrl + 'api/public/v1/goods/goodslist?goods_ids=') };
//获取订单信息
const getDan = (parmas) => { wxRequst(parmas, baseUrl + 'api/public/v1/my/orders/all?type=') };
// 获取登录
const getLogin = (parmas) => { wxRequst(parmas, baseUrl + 'api/public/v1/users/wxlogin') };
//获取搜索信息
const getSearch = (parmas) => { wxRequst(parmas, baseUrl + 'api/public/v1/goods/search?query=') };
// 获取订单信息
const getOrder = (parmas) => { wxRequst(parmas, baseUrl + 'api/public/v1/my/orders/create') };
// 查询订单信息
const querryOrder = (parmas) => { wxRequst(parmas, baseUrl + 'api/public/v1/my/orders/chkOrder') };
// 支付信息
const getzhifu = (parmas) => { wxRequst(parmas, baseUrl + 'api/public/v1/my/orders/req_unifiedorder') };

// 暴露接口

module.exports = {
  getBanner,
  getFenlei,
  getLoucen,
  getGoods,
  getFenleiS,
  getCar,
  getDan,
  getLogin,
  getSearch,
  getOrder,
  querryOrder,
  getzhifu
}