/*
 * @Author: hanxuetao 
 * @Date: 2019-04-08 11:17:35 
 * @Last Modified by: hanxuetao
 * @Last Modified time: 2019-04-08 16:52:53
 */
require('./index.css')
require('page/common/nav-simple/index.js')
const _mm = require('../../util/mm')


$(function(){
    const type = _mm.getUrlParam('type') || 'default'
        $element = $('.' + type + '-success')
        
        $element.show()
})