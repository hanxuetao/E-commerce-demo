/*
 * @Author: hanxuetao 
 * @Date: 2019-04-06 16:33:20 
 * @Last Modified by: hanxuetao
 * @Last Modified time: 2019-04-10 09:46:22
 */

const _mm = require('util/mm.js')

const _user = {
    // 检查登陆信息
    checkLogin: function (resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/get_user_info.do'),
            method: 'POST',
            success: resolve,
            error: reject,
        })
    },
    //用户登录
    login: function (userInfo,resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/login.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject,
        })
    },
    checkUsername: function (username,resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/check_valid.do'),
            data: {
                type: 'username',
                str: username,
            },
            method: 'POST',
            success: resolve,
            error: reject,
        })
    },
    //获取用户密码提示问题
    getQuestion: function (username,resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/forget_get_question.do'),
            data: {
               username: username,
            },
            method: 'POST',
            success: resolve,
            error: reject,
        })
    },
    checkAnswer: function (userInfo,resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/forget_check_answer.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject,
        })
    },
    resetPassword : function(userInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/forget_reset_password.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    register: function (userInfo,resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/register.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject,
        })
    },
    // 注销
    logout: function (resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/logout.do'),
            method: 'POST',
            success: resolve,
            error: reject,
        })
    },
}

module.exports = _user