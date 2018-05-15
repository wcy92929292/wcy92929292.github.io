"use strict";
$("#query").click(function(){
    $("#query1").show();
    $("#add1").hide();
})
$("#add").click(function(){
    $("#query1").hide();
    $("#add1").show();
    $("#con").hide();
})
var NebPay = require("nebpay");     
var nebPay = new NebPay();



var dappAddress = "n1yhXHXFbnXpusHaL7jDJ94U8YYymmPH35P";
$("#query23").click(function(){
    q("getNewBook");
})
$("#query22").click(function(){
    q("getRansomBook");
})
$("#query24").click(function(){
    q("getAllBook");
})
function q(fun){
    
        var to = dappAddress;
        var value = "0";
        var callFunction = fun;
        var callArgs = "[]"; 
        nebPay.simulateCall(to, value, callFunction, callArgs, {    
            listener: cbSearch     
        });

}


function cbSearch(resp) {
    var result = resp.result    ////resp is an object, resp.result is a JSON string
    if(result!=null &&result!="null" &&result!="[]"){
        $("#con").html("");
        console.log("return of rpc call: " + JSON.stringify(result))
        result = JSON.parse(result);
        console.log("return of rpc call: " + JSON.stringify(result))
        if(result.length>1){
            
            for(var i=0;i<result.length;i++){
                $("#con").append('<div class="search-again form-item-wrap" id="append">'+
                '好书：'+
                '<span name="bookName3">'+result[i].bookName+'</span>'+
                '<br> 类型：'+
                '<span name="type3">'+result[i].type+'</span>'+
                '<br> 链接：'+
                '<a name="url3" href="'+result[i].url+'">'+result[i].url+'</a>'+
                '<br> 内容梗概：'+
                '<span name="content3">'+result[i].content+'</span>'+
            '</div>'+'<br>')
            }
            
        }else{
            $("#con").append('<div class="search-again form-item-wrap" id="append">'+
                                        '好书：'+
                                        '<span name="bookName3">'+result.bookName+'</span>'+
                                        '<br> 类型：'+
                                        '<span name="type3">'+result.type+'</span>'+
                                        '<br> 链接：'+
                                        '<a name="url3" href="'+result.url+'">'+result.url+'</a>'+
                                        '<br> 内容梗概：'+
                                        '<span name="content3">'+result.content+'</span>'+
                                    '</div>')
        }
        
    }else{
        $("#con").html("<br>还没有推荐的好书，你可以现在就去推荐一本")
    }
    
}

        var reg=/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;  
        
        $("#add2").click(function() {
            //alert($("#bookInput").val().length+"!!!!!!!!!"+$("#typeInput").val().length+"***********"+$("#urlInput").val().length);
            if($("#bookInput").val().length===0 || $("#typeInput").val().length===0 || $("#urlInput").val().length===0){
                alert("请输入内容");
            }else if(!reg.test($("#urlInput").val())){  
                alert("这网址不是以http://https://开头，或者不是网址！");  
            }else{
                var to = dappAddress;
                var value = "0";
                var callFunction = "submit"
                
                var callArgs = "[\"" + $("#bookInput").val() + "\",\"" + $("#typeInput").val() + "\",\"" + $("#urlInput").val() +"\",\"" + $("#contentInput").val() +"\"]"
                nebPay.call(to, value, callFunction, callArgs, {    
                    listener: cbPush
                });
            }
            $("#bookInput").val("")
            $("#typeInput").val("")
            $("#urlInput").val("")
            $("#contentInput").val("")
        })

        function cbPush(resp) {
            console.log("response of push: " + resp);
            alert("感谢推荐！我们的进步来自您不懈的推荐,ps:大概15秒之后，即可看到自己推荐的书籍");
            // q("getNewBook");
            
        }