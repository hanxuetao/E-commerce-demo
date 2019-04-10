/*
 * @Author: hanxuetao 
 * @Date: 2019-03-29 19:54:36 
 * @Last Modified by: hanxuetao
 * @Last Modified time: 2019-04-09 20:00:16
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

// register page 逻辑
const page = {
    init: function(){
        this.bindEvent()
    },
    bindEvent: function(){
        //验证username
        $('#username').blur(function(){
            const username = $.trim($(this).val())
            if (!username){
                return
            }
            // 异步验证用户名是否存在
            _user.checkUsername(username, function(res){
                formError.hide()
            }, function(errMsg){
                formError.show(errMsg)
            })
        })
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
            passowrdConfirm: $.trim($('#password-confirm').val()),
            phone: $.trim($('#phone').val()),
            email: $.trim($('#email').val()),
            question: $.trim($('#question').val()),
            answer: $.trim($('#answer').val()),
        },
        validateResult = this.formValidate(formData)
        //验证
        if(validateResult.status){
            _user.register(formData, function(res){
                window.location.href = './result.html?type=register'
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
        if(formData.passowrd.length < 6){
            result.msg = 'The number of the password cannot be short than 6'
            return result
        }
        if(formData.passowrd !== formData.passowrdConfirm){
            result.msg = 'Password should be same with Confirm Password'
            return result
        }
        if(!_mm.validate(formData.phone, 'phone')){
            result.msg = 'Phone Number format not correct'
            return result
        }
        if(!_mm.validate(formData.email, 'email')){
            result.msg = 'Email format not correct'
            return result
        }
        if(!_mm.validate(formData.question, 'require')){
            result.msg = 'Question must be filled'
            return result
        }
        if(!_mm.validate(formData.answer, 'require')){
            result.msg = 'Answer must be filled'
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