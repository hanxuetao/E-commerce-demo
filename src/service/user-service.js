/*
 * @Author: hanxuetao 
 * @Date: 2019-04-06 16:33:20 
 * @Last Modified by: hanxuetao
 * @Last Modified time: 2019-04-06 16:57:28
 */

const _mm = require('util/mm.js')

const _user = {
    // 注销
    logout: function (resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/logout.do'),
            method: 'POST',
            success: resolve,
            error: reject,
        })
    },
    // 检查登陆信息
    checkLogin: function (resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/get_user_info.do'),
            method: 'POST',
            success: resolve,
            error: reject,
        })
    }
}

module.exports = _user