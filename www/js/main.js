/**
 * Created by BORA on 7/13/2014.
 */

//document.write('<script src="jquery-mobile/jquery.js" type="text/javascript"></script>');
document.write('<script src="js/i18next-1.7.2.min.js" type="text/javascript"></script>');
document.write('<script src="js/tuyoClasses.js" type="text/javascript"></script>');
serverUrl = "http://localhost";
document.write('<script src="js/kuponYap.js" type="text/javascript"></script>');

$( document ).bind( 'mobileinit', function(){
    $.mobile.loader.prototype.options.text = "loading";
    $.mobile.loader.prototype.options.textVisible = false;
    $.mobile.loader.prototype.options.theme = "a";
    $.mobile.loader.prototype.options.html = "";
    if (navigator.userAgent.indexOf("Android") != -1)
    {
        $.mobile.defaultPageTransition = 'none';
        $.mobile.defaultDialogTransition = 'none';
    }
});
//document.write('<script src="jquery-mobile/jquery.mobile-1.3.2.min.js" type="text/javascript"></script>');

// $(document).on('pageshow', '#homePage', function(){
//$.mobile.loading( 'show');
//});
// A $( document ).ready() block.

$( document ).ready(function() {
    console.log("js and jquery ready! main.jsl");
    //showPopup("#popup1");
    //showWaitScreen(4);
    console.log("ready!");
    i18n.init({ lng: "tr" }).done(function() {
        var x = $.t("month.1");
        console.log(x);

    });

    $( "#kuponYap" ).on( "tap", function( event ) {

        $.mobile.changePage("kuponYap.html",{transition:"slidefade", reloadPage: false});
//                    $.mobile.pageContainer.pagecontainer("change", "kuponYap.html", {  }); version 1.4 te kullanilacak

    } );

});
/*		$(document).on('pagebeforecreate', '[data-role="page"]', function(){
 setTimeout(function(){
 $.mobile.loading('show');

 },1);
 });

 $(document).on('pageshow', '[data-role="page"]', function(){
 setTimeout(function(){
 $.mobile.loading('hide');

 },300);
 });*/

function convertToDate(milliseconds){
    var date = new Date(milliseconds);
    return date;
}
function pausecomp(millis)
{
    var date = new Date();
    var curDate = null;

    do { curDate = new Date(); }
    while(curDate-date < millis);
}
function showWaitScreen(numberOfWaits){
    var n = (Math.ceil((Math.random() * 100)) % numberOfWaits) + 1;

    url = "url('css/images/wait/wait"+n+".jpg') no-repeat scroll center center #FFF";
    //alert(url);
    $('#wait').css({"background": url});
    $( '#wait' ).fadeIn("fast");
    $.mobile.loading( 'show');
}
function hideWaitScreen(){
    $.mobile.loading( 'hide');
    $( '#wait' ).fadeOut("fast");
}
function showSpinner(){
    $.mobile.loading( 'show');
}
function hideSpinner(){
    $.mobile.loading( 'hide');
}
function showPopup(divID){
    $( divID ).fadeIn("fast");

}

function showPopup1(divID,head,message,closeButton){
    $( divID ).fadeIn("fast");
    console.log("faded");
    $(".headA1").text(head);
    $(".messageA1").text(message);
    console.log("close name?"+closeButton);
    $(".closeA1").html(closeButton);

}

function hidePopup1(divID){
    $( divID ).fadeOut("fast");
}
function hidePopup(divID){
    $( divID ).fadeOut("fast");
}

function makeHeightFullPage(idOrClass){
    var screen = $.mobile.getScreenHeight();
    var header = $(".ui-header").hasClass("ui-header-fixed") ? $(".ui-header").outerHeight()  - 1 : $(".ui-header").outerHeight();
    var footer =0;
    /* content div has padding of 1em = 16px (32px top+bottom). This step
     can be skipped by subtracting 32px from content var directly. */
    var contentCurrent = $(".ui-content").outerHeight() - $(".ui-content").height();
    var content = screen - header ;
    console.log("id:"+idOrClass);
    $(idOrClass).height(content);

}

