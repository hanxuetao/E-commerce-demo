/*
 * @Author: hanxuetao 
 * @Date: 2019-03-29 19:54:36 
 * @Last Modified by: hanxuetao
 * @Last Modified time: 2019-04-09 22:13:21
 */

require('./index.css')
require('page/common/nav-simple/index.js')
const _mm = require('../../util/mm.js')
const _user = require('service/user-service.js')


const formError = {
    show:function(errMsg){
        $('.error-item').show().find('.error-msg').text(errMsg)
    },
    hide:function(){
        $('.error-item').hide().find('.error-msg').text('')
    },
}

// login page 逻辑
const page = {
    init: function(){
        this.bindEvent()
    },
    bindEvent: function(){
        const _this = this
        $('#submit').click(function(){
            _this.submit()
        })
        //回车提交
        $('.user-content').keyup(function(e){
            if(e.keyCode === 13){
                _this.submit()
            }
        })
    },
    submit: function(){
        //表单验证
        const formData = {
            username: $.trim($('#username').val()),
            passowrd: $.trim($('#password').val()),
        },
        validateResult = this.formValidate(formData)
        //验证
        if(validateResult.status){
            _user.login(formData, function(res){
                window.location.href = _mm.getUrlParam('redirect') || './index.html'
            }, function(errMsg){
                formError.show(errMsg)
            })
        }else {
            formError.show(validateResult.msg)
        }
    },
    // 字段验证
    formValidate: function(formData) {
        const result = {
            status: false,
            msg: '',
        }
        if(!_mm.validate(formData.username, 'require')){
            result.msg = 'Username must be filled'
            return result
        }
        if(!_mm.validate(formData.passowrd, 'require')){
            result.msg = 'Password must be filled'
            return result
        }
        // 通过
        result.status = true
        result.msg = 'Validate Success'
        return result
    }
}

$(function(){
    page.init()
})