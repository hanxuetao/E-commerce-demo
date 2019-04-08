/*
 * @Author: hanxuetao 
 * @Date: 2019-04-06 16:51:49 
 * @Last Modified by: hanxuetao
 * @Last Modified time: 2019-04-06 16:59:36
 */


const _mm = require('util/mm.js')

const _cart = {
    // 获取购物车数量
    getCartCount: function (resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/cart/get_cart_product_count.do'),
            success: resolve,
            error: reject,
        })
    },
    
    
}

module.exports = _cart