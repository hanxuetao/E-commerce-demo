/*
 * @Author: hanxuetao 
 * @Date: 2019-04-09 17:40:54 
 * @Last Modified by: hanxuetao
 * @Last Modified time: 2019-04-10 09:42:38
 */


require('./index.css')
require('page/common/nav-simple/index.js')
const _mm = require('../../util/mm.js')
const _user = require('service/user-service.js')


const formError = {
    show: function (errMsg) {
        $('.error-item').show().find('.error-msg').text(errMsg)
    },
    hide: function () {
        $('.error-item').hide().find('.error-msg').text('')
    },
}

// login page 逻辑
const page = {
    data: {
        username: '',
        question: '',
        answer: '',
        token: '',
    },
    init: function () {
        this.onLoad()
        this.bindEvent()
    },
    onLoad: function () {
        this.loadStepUsername()
    },
    bindEvent: function () {
        const _this = this
        $('#submit-username').click(function () {
            const username = $.trim($('#username').val())
            if (username) {
                _user.getQuestion(username, function (res) {
                    _this.data.username = username
                    _this.data.question = res
                    _this.loadStepQuestion()
                }, function (errMsg) {
                    formError.show(errMsg)
                })
            } else {
                formError.show('Please enter your username')
            }
        })

        $('#submit-question').click(function () {
            const answer = $.trim($('#answer').val())
            if (answer) {
                //检查密码提示问题答案
                _user.checkAnswer({
                    username: _this.data.username,
                    question: _this.data.question,
                    answer: answer,
                }, function (res) {
                    _this.data.answer = answer
                    _this.data.token = res
                    _this.loadStepPassowrd()
                }, function (errMsg) {
                    formError.show(errMsg)
                })
            } else {
                formError.show('Please enter the answer')
            }
        })

        $('#submit-password').click(function () {
            const password = $.trim($('#password').val())
            if (password && password.length >= 6) {
                //检查密码
                _user.resetPassword({
                    username: _this.data.username,
                    passwordNew: password,
                    forgetToken: _this.data.token,
                }, function (res) {
                    // window.location.href = './result.html?type=pass-reset'
                }, function (errMsg) {
                    formError.show(errMsg)
                })
            } else {
                formError.show('Please enter new password or the number of the passowrd more than 6 ')
            }
        })
        //回车提交
        // $('.user-content').keyup(function (e) {
        //     if (e.keyCode === 13) {
        //         _this.submit()
        //     }
        // })
    },
    loadStepUsername: function () {
        //加载输入用户名步骤
        $('.step-username').show()
    },
    loadStepQuestion: function () {
        //加载输入密码提示问题答案步骤
        //隐藏错误提示
        formError.hide()
        //做容器的切换
        $('.step-username').hide()
            .siblings('.step-question').show()
            .find('.question').text(this.data.question)
    },
    loadStepPassowrd: function () {
        //加载输入修改密码步骤
        //隐藏错误提示
        formError.hide()
        //做容器的切换
        $('.step-question').hide()
            .siblings('.step-password').show()
    },
}

$(function () {
    page.init()
})