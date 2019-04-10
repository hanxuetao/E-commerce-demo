/*
 * @Author: hanxuetao 
 * @Date: 2019-03-31 15:08:33 
 * @Last Modified by: hanxuetao
 * @Last Modified time: 2019-04-09 10:37:29
 */
const Hogan = require('hogan.js')
const conf = {
    serverHost: ''
}
const _mm = {
    request: function (param) {
        const _this = this
        $.ajax({
            type: param.method || 'get',
            url: param.url || '',
            dataType: param.type || 'json',
            data: param.data || '',
            success: function (res) {
                //请求成功
                if (0 === res.status) {
                    typeof param.success === 'function' && param.success(res.data, res.msg)
                }
                //没有登录状态 强制登陆
                else if (10 === res.status) {
                    _this.doLogin()
                }
                // 请求数据错误
                else if (1 === res.status) {
                    typeof param.error === 'function' && param.error(res.msg)
                }
            },
            error: function (err) {
                typeof param.error === 'function' && param.error(err.statusText)
            }
        })
    },
    // 获取服务器地址 
    getServerUrl: function(path) {
        return conf.serverHost + path
    },
    // 获取url参数
    getUrlParam: function (name) {
        const reg = new RegExp('(^|&)' + name + '=([^&]*(&|$))')
        const result = window.location.search.substr(1).match(reg)
        return result ? decodeURIComponent(result[2]) : null
    },
    //渲染html模版
    renderHtml: function (htmlTemplate, data) {
        var template = Hogan.compile(htmlTemplate)
        result = template.render(data)
        return result;
    },
    //成功提示
    successTips: function () {
        alert(msg || 'Operation Success')
    },
    //错误提示
    errorTips: function () {
        alert(msg || 'Operation Failed')
    },
    // 字段的验证，支持是非空、手机、邮箱的判断
    validate: function (value, type) {
        const result = $.trim(value)
        // 非空验证
        if ('require' === type) {
            return !!result
        }
        //手机号验证
        if ('phone' === type) {
            return /\d{10}$/.test(result)
        }
        // 邮箱格式验证
        if ('email' === type) {
            return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(result)
        }
    },
    // 统一登录处理
    doLogin: function () {
        window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href)
    },
    goHome: function () {
        window.location.href = './index.html'
    }
}
module.exports = _mm