/*
 * @Author: hanxuetao 
 * @Date: 2019-04-03 20:54:31 
 * @Last Modified by: hanxuetao
 * @Last Modified time: 2019-04-06 16:57:53
 */

require('./index.css')
const _mm = require('util/mm.js')
const _user = require('service/user-service.js')
const _cart = require('service/cart-service.js')


const nav = {
    init: function () {
        this.bindEvent()
        this.loaduserInfo()
        this.loadCartCount()
        return this
    },
    bindEvent: function () {
        //登录点击事件
        $('.js-login').click(function () {
            _mm.doLogin()
        })
        //注册点击事件
        $('.js-register').click(function () {
            window.location.href = './register.html'
        })
        //退出点击事件
        $('.js-logout').click(function () {
            _user.logout(function (res) {
                window.location.reload()
            }, function (errMsg) {
                _mm.errorTips(errMsg)
            }
            )
        })
    },
    //加载用户信息
    loaduserInfo: function () {
        _user.checkLogin(function (res) {
           $('.user.not-login').hide().siblings('.user.login').show()
                .find('username').text(res.username)
        }, function (errMsg) {
            // _mm.errorTips(errMsg)
        }
        )
    },
    //加载购物车数量
    loadCartCount: function () {
        _cart.getCartCount(function (res) {
            $('.nav .cart-count').text(res || 0)
         }, function (errMsg) {
            $('.nav .cart-count').text(0)
         }
         )
    }
}

module.exports = nav.init()