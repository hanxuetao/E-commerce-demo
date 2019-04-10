/*
 * @Author: hanxuetao 
 * @Date: 2019-04-07 13:39:59 
 * @Last Modified by: hanxuetao
 * @Last Modified time: 2019-04-09 08:25:52
 */


require('./index.css')
const _mm = require('util/mm.js')
var templateIndex  = require('./index.string')

const navSide = {
    option:{
        name: '',
        navList:[
            {name: 'user-center', desc:'UserCenter', href:'./user-center.html'},
            {name: 'order-list', desc:'Orders', href:'./order-list.html'},
            {name: 'pass-update', desc:'Password', href:'./pass-update.html'},
            {name: 'about', desc:'About', href:'./about.html'}
        ]
    },
    init: function (option) {
        // 合并选项
        $.extend(this.option, option)
        this.renderNav()
    },
    //渲染导航菜单
    renderNav: function(){
        //计算active数据
        for(var i = 0, iLength = this.option.navList.length; i < iLength; i++){
            if (this.option.navList[i].name === this.option.name) {
                this.option.navList[i].isActive = true
                console.log(this.option.navList[i].isActive)
            }
        }
        //渲染list数据
         var navHtml = _mm.renderHtml(templateIndex, {
             navList: this.option.navList
         })
         
         //把html放入容器
         $('.nav-side').html(navHtml)
    }
    
    
}

module.exports = navSide