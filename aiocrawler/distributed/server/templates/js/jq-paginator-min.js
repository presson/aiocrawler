/*!
 * jq-paginator v2.0.2
 * http://jqPaginator.keenwon.com
 */
!function(){"use strict";var t=jQuery;t.jqPaginator=function(e,a){if(!(this instanceof t.jqPaginator))return new t.jqPaginator(e,a);var r=this;return r.$container=t(e),r.$container.data("jqPaginator",r),r.init=function(){(a.first||a.prev||a.next||a.last||a.page)&&(a=t.extend({},{first:"",prev:"",next:"",last:"",page:""},a)),r.options=t.extend({},t.jqPaginator.defaultOptions,a),r.verify(),r.extendJquery(),r.render(),r.fireEvent(this.options.currentPage,"init")},r.verify=function(){var t=r.options;if(!r.isNumber(t.totalPages))throw new Error("[jqPaginator] type error: totalPages");if(!r.isNumber(t.totalCounts))throw new Error("[jqPaginator] type error: totalCounts");if(!r.isNumber(t.pageSize))throw new Error("[jqPaginator] type error: pageSize");if(!r.isNumber(t.currentPage))throw new Error("[jqPaginator] type error: currentPage");if(!r.isNumber(t.visiblePages))throw new Error("[jqPaginator] type error: visiblePages");if(!t.totalPages&&!t.totalCounts)throw new Error("[jqPaginator] totalCounts or totalPages is required");if(!t.totalPages&&t.totalCounts&&!t.pageSize)throw new Error("[jqPaginator] pageSize is required");if(t.totalCounts&&t.pageSize&&(t.totalPages=Math.ceil(t.totalCounts/t.pageSize)),t.currentPage<1||t.currentPage>t.totalPages)throw new Error("[jqPaginator] currentPage is incorrect");if(t.totalPages<1)throw new Error("[jqPaginator] totalPages cannot be less currentPage")},r.extendJquery=function(){t.fn.jqPaginatorHTML=function(e){return e?this.before(e).remove():t("<p>").append(this.eq(0).clone()).html()}},r.render=function(){r.renderHtml(),r.setStatus(),r.bindEvents()},r.renderHtml=function(){for(var e=[],a=r.getPages(),n=0,i=a.length;n<i;n++)e.push(r.buildItem("page",a[n]));r.isEnable("prev")&&e.unshift(r.buildItem("prev",r.options.currentPage-1)),r.isEnable("first")&&e.unshift(r.buildItem("first",1)),r.isEnable("statistics")&&e.unshift(r.buildItem("statistics")),r.isEnable("next")&&e.push(r.buildItem("next",r.options.currentPage+1)),r.isEnable("last")&&e.push(r.buildItem("last",r.options.totalPages)),r.options.wrapper?r.$container.html(t(r.options.wrapper).html(e.join("")).jqPaginatorHTML()):r.$container.html(e.join(""))},r.buildItem=function(e,a){var n=r.options[e].replace(/{{page}}/g,a).replace(/{{totalPages}}/g,r.options.totalPages).replace(/{{totalCounts}}/g,r.options.totalCounts);return t(n).attr({"jp-role":e,"jp-data":a}).jqPaginatorHTML()},r.setStatus=function(){var e=r.options;r.isEnable("first")&&1!==e.currentPage||t("[jp-role=first]",r.$container).addClass(e.disableClass),r.isEnable("prev")&&1!==e.currentPage||t("[jp-role=prev]",r.$container).addClass(e.disableClass),(!r.isEnable("next")||e.currentPage>=e.totalPages)&&t("[jp-role=next]",r.$container).addClass(e.disableClass),(!r.isEnable("last")||e.currentPage>=e.totalPages)&&t("[jp-role=last]",r.$container).addClass(e.disableClass),t("[jp-role=page]",r.$container).removeClass(e.activeClass),t("[jp-role=page][jp-data="+e.currentPage+"]",r.$container).addClass(e.activeClass)},r.getPages=function(){var t=[],e=r.options.visiblePages,a=r.options.currentPage,n=r.options.totalPages;e>n&&(e=n);var i=Math.floor(e/2),o=a-i+1-e%2,s=a+i;o<1&&(o=1,s=e),s>n&&(s=n,o=1+n-e);for(var l=o;l<=s;)t.push(l),l++;return t},r.isNumber=function(t){var e=typeof t;return"number"===e||"undefined"===e},r.isEnable=function(t){return r.options[t]&&"string"==typeof r.options[t]},r.switchPage=function(t){r.options.currentPage=t,r.render()},r.fireEvent=function(t,e){return"function"!=typeof r.options.onPageChange||!1!==r.options.onPageChange(t,e)},r.callMethod=function(e,a){switch(e){case"option":r.options=t.extend({},r.options,a),r.verify(),r.render();break;case"destroy":r.$container.empty(),r.$container.removeData("jqPaginator");break;default:throw new Error('[jqPaginator] method "'+e+'" does not exist')}return r.$container},r.bindEvents=function(){var e=r.options;r.$container.off(),r.$container.on("click","[jp-role]",function(){var a=t(this);if(!a.hasClass(e.disableClass)&&!a.hasClass(e.activeClass)){var n=+a.attr("jp-data");r.fireEvent(n,"change")&&r.switchPage(n)}})},r.init(),r.$container},t.jqPaginator.defaultOptions={wrapper:"",first:'<li class="first"><a href="javascript:;">First</a></li>',prev:'<li class="prev"><a href="javascript:;">Previous</a></li>',next:'<li class="next"><a href="javascript:;">Next</a></li>',last:'<li class="last"><a href="javascript:;">Last</a></li>',page:'<li class="page"><a href="javascript:;">{{page}}</a></li>',totalPages:0,totalCounts:0,pageSize:0,currentPage:1,visiblePages:7,disableClass:"disabled",activeClass:"active",onPageChange:null},t.fn.jqPaginator=function(){var e=Array.prototype.slice.call(arguments);if("string"==typeof e[0]){var a=t(this).data("jqPaginator");if(a)return a.callMethod(e[0],e[1]);throw new Error("[jqPaginator] the element is not instantiated")}return new t.jqPaginator(this,e[0])}}();
