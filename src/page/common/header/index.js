/*
 * @Author: hanxuetao 
 * @Date: 2019-04-07 12:39:08 
 * @Last Modified by: hanxuetao
 * @Last Modified time: 2019-04-07 13:20:02
 */

require('./index.css')
const _mm = require('util/mm.js')
// 通用页面头部
const header = {
    init: function () {
        this.bindEvent()
    },
    onload : function(){
        const keyword = _mm.getUrlParam('keyword')
        // keyword存在，则回填输入框
        if(keyword){
            $('#search-input').val(keyword)
        }
    },
    bindEvent: function () {
        const _this = this;
       $('#search-btn').click(function(){
            _this.searchSubmit()
       }),
       // 输入回车以后，搜索提交
       $('#search-input').keyup(function(e){
        //13 是回车对应的号码
       if(e.keyCode === 13){        
           _this.searchSubmit()
       } 
    })
    }, 
    // 搜索的提交
    searchSubmit: function(params) {
        const keyword = $.trim($('#search-input').val())
        if(keyword){
            window.location.href = './list.html?keyword=' + keyword
        }else{
            _mm.goHome()
        }
    } 
}

header.init()