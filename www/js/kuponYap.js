/**
 * Created by BORA on 6/22/2014.
 */

var BULLETIN_ID  = 0;
var BULLETIN_GMT = 3;
var WARNING = "";
var data;

/*			$( window ).load(function() {});*/
function init(){
    //showSpinner();
    //translation is easy by i18n
    console.log("jquery ready");
    $(".kuponSayfa").i18n();


}

function getMatchesWithAjax(onError,onFinish){
    console.log("yes");
    $.ajax({
        type: 'GET',
        dataType: "json",
        url: serverUrl + "/api/get_events.php",
        success: function (responseData, textStatus, jqXHR) {
            //console.log("in");
            try
            {
                data = jQuery.parseJSON( responseData );
                BULLETIN_ID = data.bulletin.id;
                BULLETIN_GMT= data.bulletin.GMT;
                console.log("bulletin_id:"+BULLETIN_ID);
                console.log("bulletin_GMT:"+BULLETIN_GMT);


                console.log(data.provider_bulletin.length);
//            $.each(data.provider_bulletin, function (i, matchObject) {
//                console.log("i:"+i+" val:"+matchObject);
//                console.log("match_code:"+matchObject.MCODE);
//                console.log("f1:"+matchObject.bets['F.1'].OV );
//            });
                showMatchesByDate(data);
                onFinish();
            }
            catch(err)
            {
                console.log("UNKNOWN ERROR NO MATCH IS SHOWN ERROR EXPLAINATION:"+err);
                $("<div data-i18n='no_match2'>No other matches at this time.Check Again soon!</div>").appendTo("#maclar");
                onFinish();
            }

            //console.log(data.provider_bulletin.Events);


            $(".kuponSayfa").i18n();

            console.log("ajax bitti");
//            $( ".oran" ).on( "tap", function( event ) {
////                console.log("checked:"+this.getSelection());
////                console.log("checked 2:"+ event.is);
////                console.log("checked 2:"+ this.getActive());
//
////                if(this.getSelection()){
//                    addToBetslip(this);
//
//
////                }
//
//
//            });
//            $('.oran').on( "tap", function(event) {
////                console.log("change"+event);
////                console.log("change"+ui.checked );
//                    console.log("check/UNCHECK");
//                    if ($(this).is(':checked')) {
//                        tempBetSlipMatchTimeStamp = addToBetslip(this);
//                        $(this).attr("id",tempBetSlipMatchTimeStamp);
//
//                    }
//                    else{
//                        tempBetSlipMatchTimeStamp =   $(this).attr("id");
//                        console.log("not checked:timestamp:"+tempBetSlipMatchTimeStamp);
//                        deleteFromUI(tempBetSlipMatchTimeStamp);
////                        $(this).removeAttr("tempBetSlipMatchTimeStamp");
//
//                    }
//            });
//            $('.oran').change(
//                function(){
////                    console.log("check/UNCHECK");
//
//                    if ($(this).is(':checked')) {
//                        tempBetSlipMatchTimeStamp = addToBetslip(this);
//                        $(this).attr("id",tempBetSlipMatchTimeStamp);
//
//                    }
//                    else{
//                        tempBetSlipMatchTimeStamp =   $(this).attr("id");
//                        console.log("not checked:timestamp:"+tempBetSlipMatchTimeStamp);
//                        deleteFromUI(tempBetSlipMatchTimeStamp);
////                        $(this).removeAttr("tempBetSlipMatchTimeStamp");
//
//                    }
//                });



        },
        error: function (responseData, textStatus, errorThrown) {
            console.log('POST failed.'+textStatus);
            console.log('POST failed.'+responseData);
            console.log('POST failed.'+errorThrown);
//            alert(i18n.t('hata_1'));
//            $("#popupBasic").dialog({autoOpen : false, modal : true, show : "blind", hide : "blind"});
//            $("#popupBasic").dialog("open");
//            $("#popupBasic").dialog();
//            window.history.back();
//            $.mobile.changePage('#dialog', 'pop', true, true);
            onError();
            onFinish();

        }
    });

}

function padLeft (str, max) {
    str = str.toString();
    return str.length < max ? padLeft("0" + str, max) : str;
}
function showMatchesByDate(data){
    tempLeagueName = " ";
    tempDay   = 0;
    tempMonth = 0;
    tempYear  = 0;
    $( "#maclar" ).text('');
    var count = 0;
    var matchesHTML = "";

//    console.log("burada 1");
//    $.each(data.provider_bulletin, function (i, matchObject) {
//        console.log("i:"+i+" val:"+matchObject);
//        console.log("match_code:"+matchObject.MCODE);
//        $.each(matchObject, function (j, matchDetails) {
//            console.log("j:"+j+" val:"+matchDetails);
//        });
//    });
    try {
        $.each(data.provider_bulletin, function (i, matchObject) {

            var date = convertToDate(matchObject.LMDATE);
            GMT3NOW = getNowGMT3();
            if (date != null && GMT3NOW < date) {

                try {
                    matchesHTML = matchesHTML + "<div>------------------------------------------------------</div>";

                    if (tempLeagueName != matchObject.L_DESC)
                        matchesHTML = matchesHTML + "<div class='league'>" +  matchObject.L_DESC + "</div>";

                    tempLeagueName = matchObject.L_DESC;
                    if (date != null) {
                        if (tempDay != date.getDate() || tempMonth != date.getMonth() || tempYear != date.getFullYear()) {
                            $("<div class='month_day'>" + padLeft(date.getDate(), 2) + "</div>").appendTo("#maclar");
                            $("<div class='month' data-i18n='month." + date.getMonth() + "'></div>").appendTo("#maclar");
                            $("<div class='year'>" + date.getFullYear() + "</div>").appendTo("#maclar");
                            $("<div class='day' data-i18n='weekday." + date.getDay() + "'></div>").appendTo("#maclar");
                        }
                        tempDay = date.getDate();
                        tempMonth = date.getMonth();
                        tempYear = date.getFullYear();
                    }

                    matchesHTML = matchesHTML + "<div class='match_code'>" + matchObject.MCODE  + "</div>";
                    matchesHTML = matchesHTML + "<div class='hour'>" + padLeft(date.getHours(), 2) + "</div>";
                    matchesHTML = matchesHTML + "<div class='minute'>" + padLeft(date.getMinutes(), 2) + "</div>";
                    matchesHTML = matchesHTML + "<div class='teams'>" +  matchObject.H_TXT + "</div>";
                    matchesHTML = matchesHTML + "<div class='MBS" + matchObject.MBS + "'>" + matchObject.MBS + "</div>";

                    if(matchObject.bets['F.1'] != null)
                        matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>MAC SONUCU 1 :</div><div isim='ms1' class='oran_m' id='f1_" + matchObject.MCODE + "' match_date='" + matchObject.LMDATE + "' match_code='" + matchObject.MCODE + "' match_teams='" + matchObject.M_TXT + "' home_team='" + matchObject.HTEAM + "' away_team='"+ matchObject.ATEAM +"' league_code='" + matchObject.LEAG + "' ratio_rate='" + matchObject.bets['F.1'].OV + "' ratio_type ='F' ratio_field='F.1' ratio_MBS='" + matchObject.bets['F.1'].MBS + "' is_duel='false'>" +  matchObject.bets['F.1'].OV + "</div></div>";
                    if(matchObject.bets['F.X'] != null)
                        matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>MAC SONUCU X :</div><div isim='msX' class='oran_m' id='fx_" + matchObject.MCODE + "' match_date='" + matchObject.LMDATE + "' match_code='" + matchObject.MCODE + "' match_teams='" + matchObject.M_TXT + "' home_team='" + matchObject.HTEAM + "' away_team='"+ matchObject.ATEAM +"' league_code='" + matchObject.LEAG + "' ratio_rate='" + matchObject.bets['F.X'].OV + "' ratio_type ='F' ratio_field='F.X' ratio_MBS='" + matchObject.bets['F.X'].MBS + "' is_duel='false'>" +  matchObject.bets['F.X'].OV + "</div></div>";
                    if(matchObject.bets['F.2'] != null)
                        matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>MAC SONUCU 2 :</div><div isim='ms2' class='oran_m' id='f2_" + matchObject.MCODE + "' match_date='" + matchObject.LMDATE + "' match_code='" + matchObject.MCODE + "' match_teams='" + matchObject.M_TXT + "' home_team='" + matchObject.HTEAM + "' away_team='"+ matchObject.ATEAM +"' league_code='" + matchObject.LEAG + "' ratio_rate='" + matchObject.bets['F.2'].OV + "' ratio_type ='F' ratio_field='F.2' ratio_MBS='" + matchObject.bets['F.2'].MBS + "' is_duel='false'>" +  matchObject.bets['F.2'].OV + "</div></div>";

                    if(matchObject.bets['OVER'] != null)
                        matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>MS ALT(2,5)  :</div><div isim='msa' class='oran_m' id='u_" + matchObject.MCODE + "' match_date='" + matchObject.LMDATE + "' match_code='" + matchObject.MCODE + "' match_teams='" + matchObject.M_TXT + "' home_team='" + matchObject.HTEAM + "' away_team='"+ matchObject.ATEAM +"' league_code='" + matchObject.LEAG + "' ratio_rate='" + matchObject.bets['UNDER'].OV +"' ratio_type ='UO' ratio_field='UNDER' ratio_MBS='" + matchObject.bets['UNDER'].MBS + "' is_duel='false'>" +  matchObject.bets['UNDER'].OV + "</div></div>";
                    if(matchObject.bets['UNDER'] != null)
                        matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>MS UST(2,5)  :</div><div isim='msu' class='oran_m' id='o_" + matchObject.MCODE + "' match_date='" + matchObject.LMDATE + "' match_code='" + matchObject.MCODE + "' match_teams='" + matchObject.M_TXT + "' home_team='" + matchObject.HTEAM + "' away_team='"+ matchObject.ATEAM +"' league_code='" + matchObject.LEAG + "' ratio_rate='" + matchObject.bets['OVER'].OV +"' ratio_type ='UO' ratio_field='OVER' ratio_MBS='" + matchObject.bets['OVER'].MBS + "' is_duel='false'>" +  matchObject.bets['OVER'].OV + "</div></div>";

                    matchesHTML = matchesHTML +"<div class='oran_wrapper'> <div class='oran_baslik'>More:</div> <div class='oran-more' match_code=" + matchObject.MCODE + ">+" + matchObject.BET_CNT + "</div> </div>";

                    console.log("-------------------------------------------------------------");
                    count++;
                }
                catch (err) {
                    console.log("ERROR: MAC listeleme sorun->mac kodu:" + matchObject.MCODE + " Error : " + err );
                }
            }

        });
    }catch(err){
        console.log("ERROR: MAC listeleme teknik hata 1"+err);

    }
    if(count <= 0){
        console.log("ERROR: MAC listeleme teknik hata 2");
        $("<div data-i18n='no_match'>No matches at this time.Check Again soon!</div>").appendTo("#maclar");
    }

    $("#maclar").append(matchesHTML);
    $(".oran_m").on( "tap", function(event) {
        console.log("ORAN TAPPED");
        selectActionOnMatches(this);

//        if ($(this).is(':checked')) {
//            tempBetSlipMatchTimeStamp = addToBetslip(this);
//            $(this).attr("id",tempBetSlipMatchTimeStamp);
//
//        }
//        else{
//            tempBetSlipMatchTimeStamp =   $(this).attr("id");
//            console.log("not checked:timestamp:"+tempBetSlipMatchTimeStamp);
//            deleteFromUI(tempBetSlipMatchTimeStamp);
////                        $(this).removeAttr("tempBetSlipMatchTimeStamp");
//
//        }
    });
//    $('iframe').get()[0].contentWindow.document.write(matchesHTML);
//    var $head = $("#iframe").contents().find("head");
//
//    $head.append($("<link/>",
//        { rel: "stylesheet", href: "css/masterStyle.css", type: "text/css" }
//    ));
//    $('#iframe').contents().find('.oran').click(function(e){
//
//        console.log("selected?"+this.selected);
//        if( this.selected){
//            this.selected=false;
//
//            $(this).removeClass("oran_selected");
//
//            console.log("trudan false a?");
//        }
//        else{
//            console.log("false dan true ya?");
//            $(this).addClass("oran_selected");
//            this.selected=true;
//        }
//    });
//    $(".oran").hover(function(){
//        $(".oran").css("background-color","yellow");
//    },function(){
//        $(".oran").css("background-color","pink");
//    });
//    $('#iframe').bind('tap', function(event) {alert("tap"); });
//    $('#iframe').contents().find('.oran').hover(function(){
//            $(this).css("background-color","yellow");
//        },function(){
//            $(this).css("background-color","pink");
//        });
//        $(this).hover(function(){
//            $(this).css("background-color","yellow");
//        },function(){
//            $(this).css("background-color","pink");
//        });

}

function selectActionOnMatches(div){
    var selected = $(div).attr("selected");
    console.log("selected?"+selected);

    if( selected){
//        div.selected=false;
        $(div).attr("selected",false);
        $(div).removeClass("oran_selected");
        console.log("trudan false a?");
        tempBetSlipMatchTimeStamp =   $(div).attr("timestamp");
        console.log("not checked:timestamp:"+tempBetSlipMatchTimeStamp);
        $(div).attr("timestamp", -1);
        deleteFromUI(tempBetSlipMatchTimeStamp);
    }
    else{
        console.log("false dan true ya?");
        $(div).addClass("oran_selected");
//        div.selected=true;
        $(div).attr("selected",true);
        tempBetSlipMatchTimeStamp = addToBetslip(div);
        $(div).attr("timestamp", tempBetSlipMatchTimeStamp);
        console.log("false dan true ya?"+tempBetSlipMatchTimeStamp);
    }
}

function reselectMatch(div,tempBetSlipMatchTimeStamp){
    var selected = $(div).attr("selected");
    console.log("selected?"+selected);
    $(div).addClass("oran_selected");
    $(div).attr("selected",true);
    $(div).attr("timestamp", tempBetSlipMatchTimeStamp);
    console.log("false dan true ya?"+tempBetSlipMatchTimeStamp);

}

function getMatch(matchCode){
    var match;
    var matchHTML;
    $.each(data.provider_bulletin, function (i, matchObject) {
        console.log("i:"+i+" val:"+matchObject);
        console.log("match_code:"+matchObject.MCODE);
        console.log("f1:"+matchObject.bets['F.1'].OV );
        if(matchObject.MCODE == matchCode)
            match = matchObject;
    });

    return match;

}
function showMatchesByAllRatios(matchCode){

    $("#otherRatios").text("");
    var match = getMatch(matchCode);
    var matchesHTML = "";

    //eventField = data.provider_bulletin.Events[matchCode];
    console.log(match.MCODE + ':dogru mu');
    var date = convertToDate(match.LMDATE);
    console.log("date:"+date);

    if (date != null && match != null) {

        $(" #otherMatchCode").text(matchCode);
        $(" #otherHour").html("<div class='hour'>" + padLeft(date.getHours(), 2)+":"+"</div>");
        $( "#otherMinute").html("<div class='minute'>" + padLeft(date.getMinutes(), 2) + " / "+"</div>");
        $( "#otherTeams").html( "<div class='teams'>" + match.H_TXT + "</div>");

        $( "#otherDay").html( "<div class='day' data-i18n='weekday." + date.getDay() + "'></div>");
        $( "#otherMonthDay").text( padLeft(date.getDate(), 2)+'.');
        $( "#otherMonth").html( "<div class='month' data-i18n='month." + date.getMonth()+  "' > </div>");
        $( "#otherYear").html( "<div class='year'>" +"."+ date.getFullYear() + "</div>");

        $( "#otherLeagueName").html( "<div class='league'>" + match.L_DESC + "</div>");

    }
    // HANDIKAPLI MAC SONUCU
    if (match.bets["H.1"] != null || match.bets["H.X"] != null  ||match.bets["H.2"] != null){
        matchesHTML = matchesHTML + "<div>===========================</div>";
        matchesHTML = matchesHTML + "<div class='oran_desc'>HANDIKAPLI MAC SONUCU:</div>";
        if (match.bets["H.X"] != null)
            matchesHTML = matchesHTML + "<div class='MBS"+match.bets["H.X"].MBS+"'>MBS  :"+match.bets["H.X"].MBS+"</div>";

        matchesHTML = matchesHTML + "<div class='ratio_nc_wrapper'><div class='ratio_nc_head'>H1</div><div class='ratio_nc'>"+(match.FTH != null && match.FTH>0?match.FTH:'-')+"</div></div>";

        if (match.bets["H.1"] != null)
            matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>1 :</div><div isim='iy1' class='oran' id='h1_" + match.MCODE + "' match_date='" + match.LMDATE + "' match_code='" + match.MCODE + "' match_teams='" + match.M_TXT + "' home_team='" + match.HTEAM + "' away_team='"+ match.ATEAM +"' league_code='" + match.LEAG + "' ratio_rate='" + match.bets['H.1'].OV + "' ratio_type ='H' ratio_field='H.1' ratio_MBS='" + match.bets['H.1'].MBS + "' is_duel='false'>" +  match.bets['H.1'].OV + "</div></div>";
        if (match.bets["H.X"] != null)
            matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>X :</div><div isim='iyx' class='oran' id='hx_" + match.MCODE + "' match_date='" + match.LMDATE + "' match_code='" + match.MCODE + "' match_teams='" + match.M_TXT + "' home_team='" + match.HTEAM + "' away_team='"+ match.ATEAM +"' league_code='" + match.LEAG + "' ratio_rate='" + match.bets['H.X'].OV + "' ratio_type ='H' ratio_field='H.X' ratio_MBS='" + match.bets['H.X'].MBS + "' is_duel='false'>" +  match.bets['H.X'].OV + "</div></div>";
        if (match.bets["H.2"] != null)
            matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>2 :</div><div isim='iy2' class='oran' id='h2_" + match.MCODE + "' match_date='" + match.LMDATE + "' match_code='" + match.MCODE + "' match_teams='" + match.M_TXT + "' home_team='" + match.HTEAM + "' away_team='"+ match.ATEAM +"' league_code='" + match.LEAG + "' ratio_rate='" + match.bets['H.2'].OV + "' ratio_type ='H' ratio_field='H.2' ratio_MBS='" + match.bets['H.2'].MBS + "' is_duel='false'>" +  match.bets['H.2'].OV + "</div></div>";

        matchesHTML = matchesHTML + "<div class='ratio_nc_wrapper'><div class='ratio_nc_head'>H2</div><div class='ratio_nc'>"+(match.FTA != null && match.FTA>0?match.FTA:'-')+"</div></div>";
    }
    // CIFTE SANS
    if (match.bets["DC.1X"] != null || match.bets["DC.12"] != null  ||match.bets["DC.X2"] != null){
        matchesHTML = matchesHTML + "<div>===========================</div>";
        matchesHTML = matchesHTML + "<div class='oran_desc'>CIFTE SANS:</div>";
        if (match.bets["DC.12"] != null)
            matchesHTML = matchesHTML + "<div class='MBS"+match.bets["DC.12"].MBS+"' >MBS  :"+match.bets["DC.12"].MBS+"</div>";

        if (match.bets["DC.1X"] != null)
            matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>1-X :</div><div isim='cs1x' class='oran' id='dc1x_" + match.MCODE + "' match_date='" + match.LMDATE + "' match_code='" + match.MCODE + "' match_teams='" + match.M_TXT + "' home_team='" + match.HTEAM + "' away_team='"+ match.ATEAM +"' league_code='" + match.LEAG + "' ratio_rate='" + match.bets['DC.1X'].OV + "' ratio_type ='DC' ratio_field='DC.1X' ratio_MBS='" + match.bets['DC.1X'].MBS + "' is_duel='false'>" +  match.bets['DC.1X'].OV + "</div></div>";
        if (match.bets["DC.12"] != null)
            matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>1-2 :</div><div isim='cs12' class='oran' id='dc12_" + match.MCODE + "' match_date='" + match.LMDATE + "' match_code='" + match.MCODE + "' match_teams='" + match.M_TXT + "' home_team='" + match.HTEAM + "' away_team='"+ match.ATEAM +"' league_code='" + match.LEAG + "' ratio_rate='" + match.bets['DC.12'].OV + "' ratio_type ='DC' ratio_field='DC.12' ratio_MBS='" + match.bets['DC.12'].MBS + "' is_duel='false'>" +  match.bets['DC.12'].OV + "</div></div>";
        if (match.bets["DC.X2"] != null)
            matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>X-2 :</div><div isim='csx2' class='oran' id='dcx2_" + match.MCODE + "' match_date='" + match.LMDATE + "' match_code='" + match.MCODE + "' match_teams='" + match.M_TXT + "' home_team='" + match.HTEAM + "' away_team='"+ match.ATEAM +"' league_code='" + match.LEAG + "' ratio_rate='" + match.bets['DC.X2'].OV + "' ratio_type ='DC' ratio_field='DC.X2' ratio_MBS='" + match.bets['DC.X2'].MBS + "' is_duel='false'>" +  match.bets['DC.X2'].OV + "</div></div>";

    }
    // ILK YARI VE MAC SONUCU
    if (match.bets["SF.1X"] != null || match.bets["SF.12"] != null  ||match.bets["SF.X2"] != null){
        matchesHTML = matchesHTML + "<div>===========================</div>";
        matchesHTML = matchesHTML + "<div class='oran_desc'>ILK YARI/MAC SONUCU:</div>";
        if (match.bets["SF.XX"] != null)
            matchesHTML = matchesHTML + "<div class='MBS"+match.bets["SF.XX"].MBS+"' >MBS  :"+match.bets["SF.XX"].MBS+"</div>";

        if (match.bets["SF.11"] != null)
            matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>IY MS 11:</div><div isim='im11' class='oran' id='sf11_" + match.MCODE + "' match_date='" + match.LMDATE + "' match_code='" + match.MCODE + "' match_teams='" + match.M_TXT + "' home_team='" + match.HTEAM + "' away_team='"+ match.ATEAM +"' league_code='" + match.LEAG + "' ratio_rate='" + match.bets['SF.11'].OV + "' ratio_type ='SF' ratio_field='SF.11' ratio_MBS='" + match.bets['SF.11'].MBS + "' is_duel='false'>" +  match.bets['SF.11'].OV + "</div></div>";
        if (match.bets["SF.1X"] != null)
            matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>IY MS 1X:</div><div isim='im1x' class='oran' id='sf1x_" + match.MCODE + "' match_date='" + match.LMDATE + "' match_code='" + match.MCODE + "' match_teams='" + match.M_TXT + "' home_team='" + match.HTEAM + "' away_team='"+ match.ATEAM +"' league_code='" + match.LEAG + "' ratio_rate='" + match.bets['SF.1X'].OV + "' ratio_type ='SF' ratio_field='SF.1X' ratio_MBS='" + match.bets['SF.1X'].MBS + "' is_duel='false'>" +  match.bets['SF.1X'].OV + "</div></div>";
        if (match.bets["SF.12"] != null)
            matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>IY MS 12:</div><div isim='im12' class='oran' id='sf12_" + match.MCODE + "' match_date='" + match.LMDATE + "' match_code='" + match.MCODE + "' match_teams='" + match.M_TXT + "' home_team='" + match.HTEAM + "' away_team='"+ match.ATEAM +"' league_code='" + match.LEAG + "' ratio_rate='" + match.bets['SF.12'].OV + "' ratio_type ='SF' ratio_field='SF.12' ratio_MBS='" + match.bets['SF.12'].MBS + "' is_duel='false'>" +  match.bets['SF.12'].OV + "</div></div>";
        if (match.bets["SF.X1"] != null)
            matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>IY MS X1:</div><div isim='imx1' class='oran' id='sfx1_" + match.MCODE + "' match_date='" + match.LMDATE + "' match_code='" + match.MCODE + "' match_teams='" + match.M_TXT + "' home_team='" + match.HTEAM + "' away_team='"+ match.ATEAM +"' league_code='" + match.LEAG + "' ratio_rate='" + match.bets['SF.X1'].OV + "' ratio_type ='SF' ratio_field='SF.X1' ratio_MBS='" + match.bets['SF.X1'].MBS + "' is_duel='false'>" +  match.bets['SF.X1'].OV + "</div></div>";
        if (match.bets["SF.XX"] != null)
            matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>IY MS XX:</div><div isim='imxx' class='oran' id='sfxx_" + match.MCODE + "' match_date='" + match.LMDATE + "' match_code='" + match.MCODE + "' match_teams='" + match.M_TXT + "' home_team='" + match.HTEAM + "' away_team='"+ match.ATEAM +"' league_code='" + match.LEAG + "' ratio_rate='" + match.bets['SF.XX'].OV + "' ratio_type ='SF' ratio_field='SF.XX' ratio_MBS='" + match.bets['SF.XX'].MBS + "' is_duel='false'>" +  match.bets['SF.XX'].OV + "</div></div>";
        if (match.bets["SF.X2"] != null)
            matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>IY MS X2:</div><div isim='imx2' class='oran' id='sfx2_" + match.MCODE + "' match_date='" + match.LMDATE + "' match_code='" + match.MCODE + "' match_teams='" + match.M_TXT + "' home_team='" + match.HTEAM + "' away_team='"+ match.ATEAM +"' league_code='" + match.LEAG + "' ratio_rate='" + match.bets['SF.X2'].OV + "' ratio_type ='SF' ratio_field='SF.X2' ratio_MBS='" + match.bets['SF.X2'].MBS + "' is_duel='false'>" +  match.bets['SF.X2'].OV + "</div></div>";
        if (match.bets["SF.21"] != null)
            matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>IY MS 21:</div><div isim='im21' class='oran' id='sf21_" + match.MCODE + "' match_date='" + match.LMDATE + "' match_code='" + match.MCODE + "' match_teams='" + match.M_TXT + "' home_team='" + match.HTEAM + "' away_team='"+ match.ATEAM +"' league_code='" + match.LEAG + "' ratio_rate='" + match.bets['SF.21'].OV + "' ratio_type ='SF' ratio_field='SF.21' ratio_MBS='" + match.bets['SF.21'].MBS + "' is_duel='false'>" +  match.bets['SF.21'].OV + "</div></div>";
        if (match.bets["SF.2X"] != null)
            matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>IY MS 2X:</div><div isim='im21' class='oran' id='sf2x_" + match.MCODE + "' match_date='" + match.LMDATE + "' match_code='" + match.MCODE + "' match_teams='" + match.M_TXT + "' home_team='" + match.HTEAM + "' away_team='"+ match.ATEAM +"' league_code='" + match.LEAG + "' ratio_rate='" + match.bets['SF.2X'].OV + "' ratio_type ='SF' ratio_field='SF.2X' ratio_MBS='" + match.bets['SF.2X'].MBS + "' is_duel='false'>" +  match.bets['SF.2X'].OV + "</div></div>";
        if (match.bets["SF.22"] != null)
            matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>IY MS 22:</div><div isim='im22' class='oran' id='sf22_" + match.MCODE + "' match_date='" + match.LMDATE + "' match_code='" + match.MCODE + "' match_teams='" + match.M_TXT + "' home_team='" + match.HTEAM + "' away_team='"+ match.ATEAM +"' league_code='" + match.LEAG + "' ratio_rate='" + match.bets['SF.22'].OV + "' ratio_type ='SF' ratio_field='SF.22' ratio_MBS='" + match.bets['SF.22'].MBS + "' is_duel='false'>" +  match.bets['SF.22'].OV + "</div></div>";
    }
    // ILK YARI SONUCU
    if (match.bets["S.1"] != null || match.bets["S.X"] != null  ||match.bets["S.2"] != null){
        matchesHTML = matchesHTML + "<div>===========================</div>";
        matchesHTML = matchesHTML + "<div class='oran_desc'>ILK YARI SONUCU:</div>";
        if (match.bets["S.X"] != null)
            matchesHTML = matchesHTML + "<div class='MBS"+match.bets["H.X"].MBS+"'>MBS  :"+match.bets["H.X"].MBS+"</div>";

        if (match.bets["S.1"] != null)
            matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>1 :</div><div isim='iy1' class='oran' id='S1_" + match.MCODE + "' match_date='" + match.LMDATE + "' match_code='" + match.MCODE + "' match_teams='" + match.M_TXT + "' home_team='" + match.HTEAM + "' away_team='"+ match.ATEAM +"' league_code='" + match.LEAG + "' ratio_rate='" + match.bets['S.1'].OV + "' ratio_type ='S' ratio_field='S.1' ratio_MBS='" + match.bets['S.1'].MBS + "' is_duel='false'>" +  match.bets['S.1'].OV + "</div></div>";
        if (match.bets["S.X"] != null)
            matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>X :</div><div isim='iyx' class='oran' id='Sx_" + match.MCODE + "' match_date='" + match.LMDATE + "' match_code='" + match.MCODE + "' match_teams='" + match.M_TXT + "' home_team='" + match.HTEAM + "' away_team='"+ match.ATEAM +"' league_code='" + match.LEAG + "' ratio_rate='" + match.bets['S.X'].OV + "' ratio_type ='S' ratio_field='S.X' ratio_MBS='" + match.bets['S.X'].MBS + "' is_duel='false'>" +  match.bets['S.X'].OV + "</div></div>";
        if (match.bets["S.2"] != null)
            matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>2 :</div><div isim='iy2' class='oran' id='S2_" + match.MCODE + "' match_date='" + match.LMDATE + "' match_code='" + match.MCODE + "' match_teams='" + match.M_TXT + "' home_team='" + match.HTEAM + "' away_team='"+ match.ATEAM +"' league_code='" + match.LEAG + "' ratio_rate='" + match.bets['S.2'].OV + "' ratio_type ='S' ratio_field='S.2' ratio_MBS='" + match.bets['S.2'].MBS + "' is_duel='false'>" +  match.bets['S.2'].OV + "</div></div>";
    }
    // TOPLAM GOL
    if (match.bets["GS.01"] != null || match.bets["GS.23"] != null  ||match.bets["GS.46"] != null){
        matchesHTML = matchesHTML + "<div>===========================</div>";
        matchesHTML = matchesHTML + "<div class='oran_desc'>TOPLAM GOL:</div>";
        if (match.bets["GS.7P"] != null)
            matchesHTML = matchesHTML + "<div class='MBS"+match.bets["GS.7P"].MBS+"'>MBS  :"+match.bets["GS.7P"].MBS+"</div>";

        if (match.bets["GS.01"] != null)
            matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>0-1 :</div><div isim='tg01' class='oran' id='GS01_" + match.MCODE + "' match_date='" + match.LMDATE + "' match_code='" + match.MCODE + "' match_teams='" + match.M_TXT + "' home_team='" + match.HTEAM + "' away_team='"+ match.ATEAM +"' league_code='" + match.LEAG + "' ratio_rate='" + match.bets['GS.01'].OV + "' ratio_type ='GS' ratio_field='GS.01' ratio_MBS='" + match.bets['GS.01'].MBS + "' is_duel='false'>" +  match.bets['GS.01'].OV + "</div></div>";
        if (match.bets["GS.23"] != null)
            matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>2-3 :</div><div isim='tg23' class='oran' id='GS23_" + match.MCODE + "' match_date='" + match.LMDATE + "' match_code='" + match.MCODE + "' match_teams='" + match.M_TXT + "' home_team='" + match.HTEAM + "' away_team='"+ match.ATEAM +"' league_code='" + match.LEAG + "' ratio_rate='" + match.bets['GS.23'].OV + "' ratio_type ='GS' ratio_field='GS.23' ratio_MBS='" + match.bets['GS.23'].MBS + "' is_duel='false'>" +  match.bets['GS.23'].OV + "</div></div>";
        if (match.bets["GS.46"] != null)
            matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>4-6 :</div><div isim='tg46' class='oran' id='GS46_" + match.MCODE + "' match_date='" + match.LMDATE + "' match_code='" + match.MCODE + "' match_teams='" + match.M_TXT + "' home_team='" + match.HTEAM + "' away_team='"+ match.ATEAM +"' league_code='" + match.LEAG + "' ratio_rate='" + match.bets['GS.46'].OV + "' ratio_type ='GS' ratio_field='GS.46' ratio_MBS='" + match.bets['GS.46'].MBS + "' is_duel='false'>" +  match.bets['GS.46'].OV + "</div></div>";
        if (match.bets["GS.7P"] != null)
            matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>7+  :</div><div isim='tg7a' class='oran' id='GS7P_" + match.MCODE + "' match_date='" + match.LMDATE + "' match_code='" + match.MCODE + "' match_teams='" + match.M_TXT + "' home_team='" + match.HTEAM + "' away_team='"+ match.ATEAM +"' league_code='" + match.LEAG + "' ratio_rate='" + match.bets['GS.7P'].OV + "' ratio_type ='GS' ratio_field='GS.7P' ratio_MBS='" + match.bets['GS.7P'].MBS + "' is_duel='false'>" +  match.bets['GS.7P'].OV + "</div></div>";
    }
    // SKOR 1
    if (match.bets["SC.10"] != null || match.bets["SC.30"] != null  ||match.bets["SC.50"] != null){
        matchesHTML = matchesHTML + "<div>===========================</div>";
        matchesHTML = matchesHTML + "<div class='oran_desc'>MAC SKORU 1:</div>";

        if ( match.bets["SC.30"] != null ){
            matchesHTML = matchesHTML + "<div class='MBS"+match.bets["SC.30"].MBS+"' >MBS  :"+match.bets["SC.30"].MBS+"</div>";
        }

        if (match.bets["SC.10"] != null)
            matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>MS SKOR 10:</div><div isim='sk10' class='oran' id='sc10_" + match.MCODE + "' match_date='" + match.LMDATE + "' match_code='" + match.MCODE + "' match_teams='" + match.M_TXT + "' home_team='" + match.HTEAM + "' away_team='"+ match.ATEAM +"' league_code='" + match.LEAG + "' ratio_rate='" + match.bets['SC.10'].OV + "' ratio_type ='SC' ratio_field='SC.10' ratio_MBS='" + match.bets['SC.10'].MBS + "' is_duel='false'>" +  match.bets['SC.10'].OV + "</div></div>";
        if (match.bets["SC.20"] != null)
            matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>MS SKOR 20:</div><div isim='sk20' class='oran' id='sc20_" + match.MCODE + "' match_date='" + match.LMDATE + "' match_code='" + match.MCODE + "' match_teams='" + match.M_TXT + "' home_team='" + match.HTEAM + "' away_team='"+ match.ATEAM +"' league_code='" + match.LEAG + "' ratio_rate='" + match.bets['SC.20'].OV + "' ratio_type ='SC' ratio_field='SC.20' ratio_MBS='" + match.bets['SC.20'].MBS + "' is_duel='false'>" +  match.bets['SC.20'].OV + "</div></div>";
        if (match.bets["SC.30"] != null)
            matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>MS SKOR 30:</div><div isim='sk30' class='oran' id='sc30_" + match.MCODE + "' match_date='" + match.LMDATE + "' match_code='" + match.MCODE + "' match_teams='" + match.M_TXT + "' home_team='" + match.HTEAM + "' away_team='"+ match.ATEAM +"' league_code='" + match.LEAG + "' ratio_rate='" + match.bets['SC.30'].OV + "' ratio_type ='SC' ratio_field='SC.30' ratio_MBS='" + match.bets['SC.30'].MBS + "' is_duel='false'>" +  match.bets['SC.30'].OV + "</div></div>";
        if (match.bets["SC.40"] != null)
            matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>MS SKOR 40:</div><div isim='sk40' class='oran' id='sc40_" + match.MCODE + "' match_date='" + match.LMDATE + "' match_code='" + match.MCODE + "' match_teams='" + match.M_TXT + "' home_team='" + match.HTEAM + "' away_team='"+ match.ATEAM +"' league_code='" + match.LEAG + "' ratio_rate='" + match.bets['SC.40'].OV + "' ratio_type ='SC' ratio_field='SC.40' ratio_MBS='" + match.bets['SC.40'].MBS + "' is_duel='false'>" +  match.bets['SC.40'].OV + "</div></div>";
        if (match.bets["SC.50"] != null)
            matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>MS SKOR 50:</div><div isim='sk50' class='oran' id='sc50_" + match.MCODE + "' match_date='" + match.LMDATE + "' match_code='" + match.MCODE + "' match_teams='" + match.M_TXT + "' home_team='" + match.HTEAM + "' away_team='"+ match.ATEAM +"' league_code='" + match.LEAG + "' ratio_rate='" + match.bets['SC.50'].OV + "' ratio_type ='SC' ratio_field='SC.50' ratio_MBS='" + match.bets['SC.50'].MBS + "' is_duel='false'>" +  match.bets['SC.50'].OV + "</div></div>";
        if (match.bets["SC.21"] != null)
            matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>MS SKOR 21:</div><div isim='sk21' class='oran' id='sc21_" + match.MCODE + "' match_date='" + match.LMDATE + "' match_code='" + match.MCODE + "' match_teams='" + match.M_TXT + "' home_team='" + match.HTEAM + "' away_team='"+ match.ATEAM +"' league_code='" + match.LEAG + "' ratio_rate='" + match.bets['SC.21'].OV + "' ratio_type ='SC' ratio_field='SC.21' ratio_MBS='" + match.bets['SC.21'].MBS + "' is_duel='false'>" +  match.bets['SC.21'].OV + "</div></div>";
        if (match.bets["SC.31"] != null)
            matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>MS SKOR 31:</div><div isim='sk31' class='oran' id='sc31_" + match.MCODE + "' match_date='" + match.LMDATE + "' match_code='" + match.MCODE + "' match_teams='" + match.M_TXT + "' home_team='" + match.HTEAM + "' away_team='"+ match.ATEAM +"' league_code='" + match.LEAG + "' ratio_rate='" + match.bets['SC.31'].OV + "' ratio_type ='SC' ratio_field='SC.31' ratio_MBS='" + match.bets['SC.31'].MBS + "' is_duel='false'>" +  match.bets['SC.31'].OV + "</div></div>";
        if (match.bets["SC.41"] != null)
            matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>MS SKOR 41:</div><div isim='sk41' class='oran' id='sc41_" + match.MCODE + "' match_date='" + match.LMDATE + "' match_code='" + match.MCODE + "' match_teams='" + match.M_TXT + "' home_team='" + match.HTEAM + "' away_team='"+ match.ATEAM +"' league_code='" + match.LEAG + "' ratio_rate='" + match.bets['SC.41'].OV + "' ratio_type ='SC' ratio_field='SC.41' ratio_MBS='" + match.bets['SC.41'].MBS + "' is_duel='false'>" +  match.bets['SC.41'].OV + "</div></div>";
        if (match.bets["SC.51"] != null)
            matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>MS SKOR 51:</div><div isim='sk51' class='oran' id='sc51_" + match.MCODE + "' match_date='" + match.LMDATE + "' match_code='" + match.MCODE + "' match_teams='" + match.M_TXT + "' home_team='" + match.HTEAM + "' away_team='"+ match.ATEAM +"' league_code='" + match.LEAG + "' ratio_rate='" + match.bets['SC.51'].OV + "' ratio_type ='SC' ratio_field='SF.51' ratio_MBS='" + match.bets['SC.51'].MBS + "' is_duel='false'>" +  match.bets['SC.51'].OV + "</div></div>";
        if (match.bets["SC.32"] != null)
            matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>MS SKOR 32:</div><div isim='sk32' class='oran' id='sc32_" + match.MCODE + "' match_date='" + match.LMDATE + "' match_code='" + match.MCODE + "' match_teams='" + match.M_TXT + "' home_team='" + match.HTEAM + "' away_team='"+ match.ATEAM +"' league_code='" + match.LEAG + "' ratio_rate='" + match.bets['SC.32'].OV + "' ratio_type ='SC' ratio_field='SC.32' ratio_MBS='" + match.bets['SC.32'].MBS + "' is_duel='false'>" +  match.bets['SC.32'].OV + "</div></div>";
        if (match.bets["SC.42"] != null)
            matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>MS SKOR 42:</div><div isim='sk42' class='oran' id='sc42_" + match.MCODE + "' match_date='" + match.LMDATE + "' match_code='" + match.MCODE + "' match_teams='" + match.M_TXT + "' home_team='" + match.HTEAM + "' away_team='"+ match.ATEAM +"' league_code='" + match.LEAG + "' ratio_rate='" + match.bets['SC.42'].OV + "' ratio_type ='SC' ratio_field='SC.42' ratio_MBS='" + match.bets['SC.42'].MBS + "' is_duel='false'>" +  match.bets['SC.42'].OV + "</div></div>";
        if (match.bets["SC.52"] != null)
            matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>MS SKOR 52:</div><div isim='sk52' class='oran' id='sc52_" + match.MCODE + "' match_date='" + match.LMDATE + "' match_code='" + match.MCODE + "' match_teams='" + match.M_TXT + "' home_team='" + match.HTEAM + "' away_team='"+ match.ATEAM +"' league_code='" + match.LEAG + "' ratio_rate='" + match.bets['SC.52'].OV + "' ratio_type ='SC' ratio_field='SC.52' ratio_MBS='" + match.bets['SC.52'].MBS + "' is_duel='false'>" +  match.bets['SC.52'].OV + "</div></div>";
        if (match.bets["SC.43"] != null)
            matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>MS SKOR 43:</div><div isim='sk43' class='oran' id='sc43_" + match.MCODE + "' match_date='" + match.LMDATE + "' match_code='" + match.MCODE + "' match_teams='" + match.M_TXT + "' home_team='" + match.HTEAM + "' away_team='"+ match.ATEAM +"' league_code='" + match.LEAG + "' ratio_rate='" + match.bets['SC.43'].OV + "' ratio_type ='SC' ratio_field='SC.43' ratio_MBS='" + match.bets['SC.43'].MBS + "' is_duel='false'>" +  match.bets['SC.43'].OV + "</div></div>";
        if (match.bets["SC.53"] != null)
            matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>MS SKOR 53:</div><div isim='sk53' class='oran' id='sc53_" + match.MCODE + "' match_date='" + match.LMDATE + "' match_code='" + match.MCODE + "' match_teams='" + match.M_TXT + "' home_team='" + match.HTEAM + "' away_team='"+ match.ATEAM +"' league_code='" + match.LEAG + "' ratio_rate='" + match.bets['SC.53'].OV + "' ratio_type ='SC' ratio_field='SC.53' ratio_MBS='" + match.bets['SC.53'].MBS + "' is_duel='false'>" +  match.bets['SC.53'].OV + "</div></div>";
        if (match.bets["SC.54"] != null)
            matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>MS SKOR 54:</div><div isim='sk54' class='oran' id='sc54_" + match.MCODE + "' match_date='" + match.LMDATE + "' match_code='" + match.MCODE + "' match_teams='" + match.M_TXT + "' home_team='" + match.HTEAM + "' away_team='"+ match.ATEAM +"' league_code='" + match.LEAG + "' ratio_rate='" + match.bets['SC.54'].OV + "' ratio_type ='SC' ratio_field='SF.54' ratio_MBS='" + match.bets['SC.54'].MBS + "' is_duel='false'>" +  match.bets['SC.54'].OV + "</div></div>";
    }

    // SKOR X
    if (match.bets["SC.00"] != null || match.bets["SC.11"] != null  ||match.bets["SC.33"] != null){
        matchesHTML = matchesHTML + "<div>===========================</div>";
        matchesHTML = matchesHTML + "<div class='oran_desc'>MAC SKORU X:</div>";
        if (match.bets["SC.33"] != null)
            matchesHTML = matchesHTML + "<div class='MBS"+match.bets["SC.33"].MBS+"' >MBS  :"+match.bets["SC.33"].MBS+"</div>";

        if (match.bets["SC.00"] != null)
            matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>MS SKOR 00:</div><div isim='sk00' class='oran' id='sc00_" + match.MCODE + "' match_date='" + match.LMDATE + "' match_code='" + match.MCODE + "' match_teams='" + match.M_TXT + "' home_team='" + match.HTEAM + "' away_team='"+ match.ATEAM +"' league_code='" + match.LEAG + "' ratio_rate='" + match.bets['SC.00'].OV + "' ratio_type ='SC' ratio_field='SC.00' ratio_MBS='" + match.bets['SC.00'].MBS + "' is_duel='false'>" +  match.bets['SC.00'].OV + "</div></div>";
        if (match.bets["SC.11"] != null)
            matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>MS SKOR 11:</div><div isim='sk11' class='oran' id='sc11_" + match.MCODE + "' match_date='" + match.LMDATE + "' match_code='" + match.MCODE + "' match_teams='" + match.M_TXT + "' home_team='" + match.HTEAM + "' away_team='"+ match.ATEAM +"' league_code='" + match.LEAG + "' ratio_rate='" + match.bets['SC.11'].OV + "' ratio_type ='SC' ratio_field='SC.11' ratio_MBS='" + match.bets['SC.11'].MBS + "' is_duel='false'>" +  match.bets['SC.11'].OV + "</div></div>";
        if (match.bets["SC.22"] != null)
            matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>MS SKOR 22:</div><div isim='sk22' class='oran' id='sc22_" + match.MCODE + "' match_date='" + match.LMDATE + "' match_code='" + match.MCODE + "' match_teams='" + match.M_TXT + "' home_team='" + match.HTEAM + "' away_team='"+ match.ATEAM +"' league_code='" + match.LEAG + "' ratio_rate='" + match.bets['SC.22'].OV + "' ratio_type ='SC' ratio_field='SC.22' ratio_MBS='" + match.bets['SC.22'].MBS + "' is_duel='false'>" +  match.bets['SC.22'].OV + "</div></div>";
        if (match.bets["SC.33"] != null)
            matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>MS SKOR 33:</div><div isim='sk33' class='oran' id='sc33_" + match.MCODE + "' match_date='" + match.LMDATE + "' match_code='" + match.MCODE + "' match_teams='" + match.M_TXT + "' home_team='" + match.HTEAM + "' away_team='"+ match.ATEAM +"' league_code='" + match.LEAG + "' ratio_rate='" + match.bets['SC.33'].OV + "' ratio_type ='SC' ratio_field='SC.33' ratio_MBS='" + match.bets['SC.33'].MBS + "' is_duel='false'>" +  match.bets['SC.33'].OV + "</div></div>";
        if (match.bets["SC.44"] != null)
            matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>MS SKOR 44:</div><div isim='sk44' class='oran' id='sc44_" + match.MCODE + "' match_date='" + match.LMDATE + "' match_code='" + match.MCODE + "' match_teams='" + match.M_TXT + "' home_team='" + match.HTEAM + "' away_team='"+ match.ATEAM +"' league_code='" + match.LEAG + "' ratio_rate='" + match.bets['SC.44'].OV + "' ratio_type ='SC' ratio_field='SC.44' ratio_MBS='" + match.bets['SC.44'].MBS + "' is_duel='false'>" +  match.bets['SC.44'].OV + "</div></div>";
        if (match.bets["SC.55"] != null)
            matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>MS SKOR 55:</div><div isim='sk55' class='oran' id='sc55_" + match.MCODE + "' match_date='" + match.LMDATE + "' match_code='" + match.MCODE + "' match_teams='" + match.M_TXT + "' home_team='" + match.HTEAM + "' away_team='"+ match.ATEAM +"' league_code='" + match.LEAG + "' ratio_rate='" + match.bets['SC.55'].OV + "' ratio_type ='SC' ratio_field='SC.55' ratio_MBS='" + match.bets['SC.55'].MBS + "' is_duel='false'>" +  match.bets['SC.55'].OV + "</div></div>";
    }

    // SKOR 2
    if (match.bets["SC.01"] != null || match.bets["SC.03"] != null  ||match.bets["SC.05"] != null){
        matchesHTML = matchesHTML + "<div>===========================</div>";
        matchesHTML = matchesHTML + "<div class='oran_desc'>MAC SKORU 2:</div>";
        if (match.bets["SC.03"] != null)
            matchesHTML = matchesHTML + "<div class='MBS"+match.bets["SC.03"].MBS+"' >MBS  :"+match.bets["SC.03"].MBS+"</div>";

        if (match.bets["SC.01"] != null)
            matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>MS SKOR 01:</div><div isim='sk01' class='oran' id='sc01_" + match.MCODE + "' match_date='" + match.LMDATE + "' match_code='" + match.MCODE + "' match_teams='" + match.M_TXT + "' home_team='" + match.HTEAM + "' away_team='"+ match.ATEAM +"' league_code='" + match.LEAG + "' ratio_rate='" + match.bets['SC.01'].OV + "' ratio_type ='SC' ratio_field='SC.01' ratio_MBS='" + match.bets['SC.01'].MBS + "' is_duel='false'>" +  match.bets['SC.10'].OV + "</div></div>";
        if (match.bets["SC.02"] != null)
            matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>MS SKOR 02:</div><div isim='sk02' class='oran' id='sc02_" + match.MCODE + "' match_date='" + match.LMDATE + "' match_code='" + match.MCODE + "' match_teams='" + match.M_TXT + "' home_team='" + match.HTEAM + "' away_team='"+ match.ATEAM +"' league_code='" + match.LEAG + "' ratio_rate='" + match.bets['SC.02'].OV + "' ratio_type ='SC' ratio_field='SC.02' ratio_MBS='" + match.bets['SC.02'].MBS + "' is_duel='false'>" +  match.bets['SC.20'].OV + "</div></div>";
        if (match.bets["SC.03"] != null)
            matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>MS SKOR 03:</div><div isim='sk03' class='oran' id='sc03_" + match.MCODE + "' match_date='" + match.LMDATE + "' match_code='" + match.MCODE + "' match_teams='" + match.M_TXT + "' home_team='" + match.HTEAM + "' away_team='"+ match.ATEAM +"' league_code='" + match.LEAG + "' ratio_rate='" + match.bets['SC.03'].OV + "' ratio_type ='SC' ratio_field='SC.03' ratio_MBS='" + match.bets['SC.03'].MBS + "' is_duel='false'>" +  match.bets['SC.30'].OV + "</div></div>";
        if (match.bets["SC.04"] != null)
            matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>MS SKOR 04:</div><div isim='sk04' class='oran' id='sc04_" + match.MCODE + "' match_date='" + match.LMDATE + "' match_code='" + match.MCODE + "' match_teams='" + match.M_TXT + "' home_team='" + match.HTEAM + "' away_team='"+ match.ATEAM +"' league_code='" + match.LEAG + "' ratio_rate='" + match.bets['SC.04'].OV + "' ratio_type ='SC' ratio_field='SC.04' ratio_MBS='" + match.bets['SC.04'].MBS + "' is_duel='false'>" +  match.bets['SC.40'].OV + "</div></div>";
        if (match.bets["SC.05"] != null)
            matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>MS SKOR 05:</div><div isim='sk05' class='oran' id='sc05_" + match.MCODE + "' match_date='" + match.LMDATE + "' match_code='" + match.MCODE + "' match_teams='" + match.M_TXT + "' home_team='" + match.HTEAM + "' away_team='"+ match.ATEAM +"' league_code='" + match.LEAG + "' ratio_rate='" + match.bets['SC.05'].OV + "' ratio_type ='SC' ratio_field='SC.05' ratio_MBS='" + match.bets['SC.05'].MBS + "' is_duel='false'>" +  match.bets['SC.50'].OV + "</div></div>";
        if (match.bets["SC.12"] != null)
            matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>MS SKOR 12:</div><div isim='sk12' class='oran' id='sc12_" + match.MCODE + "' match_date='" + match.LMDATE + "' match_code='" + match.MCODE + "' match_teams='" + match.M_TXT + "' home_team='" + match.HTEAM + "' away_team='"+ match.ATEAM +"' league_code='" + match.LEAG + "' ratio_rate='" + match.bets['SC.12'].OV + "' ratio_type ='SC' ratio_field='SC.12' ratio_MBS='" + match.bets['SC.12'].MBS + "' is_duel='false'>" +  match.bets['SC.21'].OV + "</div></div>";
        if (match.bets["SC.13"] != null)
            matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>MS SKOR 13:</div><div isim='sk13' class='oran' id='sc13_" + match.MCODE + "' match_date='" + match.LMDATE + "' match_code='" + match.MCODE + "' match_teams='" + match.M_TXT + "' home_team='" + match.HTEAM + "' away_team='"+ match.ATEAM +"' league_code='" + match.LEAG + "' ratio_rate='" + match.bets['SC.13'].OV + "' ratio_type ='SC' ratio_field='SC.13' ratio_MBS='" + match.bets['SC.13'].MBS + "' is_duel='false'>" +  match.bets['SC.31'].OV + "</div></div>";
        if (match.bets["SC.14"] != null)
            matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>MS SKOR 14:</div><div isim='sk14' class='oran' id='sc14_" + match.MCODE + "' match_date='" + match.LMDATE + "' match_code='" + match.MCODE + "' match_teams='" + match.M_TXT + "' home_team='" + match.HTEAM + "' away_team='"+ match.ATEAM +"' league_code='" + match.LEAG + "' ratio_rate='" + match.bets['SC.14'].OV + "' ratio_type ='SC' ratio_field='SC.14' ratio_MBS='" + match.bets['SC.14'].MBS + "' is_duel='false'>" +  match.bets['SC.41'].OV + "</div></div>";
        if (match.bets["SC.15"] != null)
            matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>MS SKOR 15:</div><div isim='sk15' class='oran' id='sc15_" + match.MCODE + "' match_date='" + match.LMDATE + "' match_code='" + match.MCODE + "' match_teams='" + match.M_TXT + "' home_team='" + match.HTEAM + "' away_team='"+ match.ATEAM +"' league_code='" + match.LEAG + "' ratio_rate='" + match.bets['SC.15'].OV + "' ratio_type ='SC' ratio_field='SF.15' ratio_MBS='" + match.bets['SC.15'].MBS + "' is_duel='false'>" +  match.bets['SC.51'].OV + "</div></div>";
        if (match.bets["SC.23"] != null)
            matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>MS SKOR 23:</div><div isim='sk23' class='oran' id='sc23_" + match.MCODE + "' match_date='" + match.LMDATE + "' match_code='" + match.MCODE + "' match_teams='" + match.M_TXT + "' home_team='" + match.HTEAM + "' away_team='"+ match.ATEAM +"' league_code='" + match.LEAG + "' ratio_rate='" + match.bets['SC.23'].OV + "' ratio_type ='SC' ratio_field='SC.23' ratio_MBS='" + match.bets['SC.23'].MBS + "' is_duel='false'>" +  match.bets['SC.32'].OV + "</div></div>";
        if (match.bets["SC.24"] != null)
            matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>MS SKOR 24:</div><div isim='sk24' class='oran' id='sc24_" + match.MCODE + "' match_date='" + match.LMDATE + "' match_code='" + match.MCODE + "' match_teams='" + match.M_TXT + "' home_team='" + match.HTEAM + "' away_team='"+ match.ATEAM +"' league_code='" + match.LEAG + "' ratio_rate='" + match.bets['SC.24'].OV + "' ratio_type ='SC' ratio_field='SC.24' ratio_MBS='" + match.bets['SC.24'].MBS + "' is_duel='false'>" +  match.bets['SC.42'].OV + "</div></div>";
        if (match.bets["SC.25"] != null)
            matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>MS SKOR 25:</div><div isim='sk25' class='oran' id='sc25_" + match.MCODE + "' match_date='" + match.LMDATE + "' match_code='" + match.MCODE + "' match_teams='" + match.M_TXT + "' home_team='" + match.HTEAM + "' away_team='"+ match.ATEAM +"' league_code='" + match.LEAG + "' ratio_rate='" + match.bets['SC.25'].OV + "' ratio_type ='SC' ratio_field='SC.25' ratio_MBS='" + match.bets['SC.25'].MBS + "' is_duel='false'>" +  match.bets['SC.52'].OV + "</div></div>";
        if (match.bets["SC.34"] != null)
            matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>MS SKOR 34:</div><div isim='sk34' class='oran' id='sc34_" + match.MCODE + "' match_date='" + match.LMDATE + "' match_code='" + match.MCODE + "' match_teams='" + match.M_TXT + "' home_team='" + match.HTEAM + "' away_team='"+ match.ATEAM +"' league_code='" + match.LEAG + "' ratio_rate='" + match.bets['SC.34'].OV + "' ratio_type ='SC' ratio_field='SC.34' ratio_MBS='" + match.bets['SC.34'].MBS + "' is_duel='false'>" +  match.bets['SC.43'].OV + "</div></div>";
        if (match.bets["SC.35"] != null)
            matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>MS SKOR 35:</div><div isim='sk35' class='oran' id='sc35_" + match.MCODE + "' match_date='" + match.LMDATE + "' match_code='" + match.MCODE + "' match_teams='" + match.M_TXT + "' home_team='" + match.HTEAM + "' away_team='"+ match.ATEAM +"' league_code='" + match.LEAG + "' ratio_rate='" + match.bets['SC.35'].OV + "' ratio_type ='SC' ratio_field='SC.35' ratio_MBS='" + match.bets['SC.35'].MBS + "' is_duel='false'>" +  match.bets['SC.53'].OV + "</div></div>";
        if (match.bets["SC.45"] != null)
            matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>MS SKOR 45:</div><div isim='sk45' class='oran' id='sc45_" + match.MCODE + "' match_date='" + match.LMDATE + "' match_code='" + match.MCODE + "' match_teams='" + match.M_TXT + "' home_team='" + match.HTEAM + "' away_team='"+ match.ATEAM +"' league_code='" + match.LEAG + "' ratio_rate='" + match.bets['SC.45'].OV + "' ratio_type ='SC' ratio_field='SF.45' ratio_MBS='" + match.bets['SC.45'].MBS + "' is_duel='false'>" +  match.bets['SC.54'].OV + "</div></div>";
    }
    // KG VAR/YOK
    if (match.bets["SC.GG"] != null || match.bets["SC.NG"] != null ){
        matchesHTML = matchesHTML + "<div>===========================</div>";
        matchesHTML = matchesHTML + "<div class='oran_desc'>KARSILIKLI GOL:</div>";
        if (match.bets["SC.GG"] != null)
            matchesHTML = matchesHTML + "<div class='MBS"+match.bets["SC.GG"].MBS+"'>MBS  :"+match.bets["SC.GG"].MBS+"</div>";

        if (match.bets["SC.GG"] != null)
            matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>VAR :</div><div isim='kgv' class='oran' id='SCGG_" + match.MCODE + "' match_date='" + match.LMDATE + "' match_code='" + match.MCODE + "' match_teams='" + match.M_TXT + "' home_team='" + match.HTEAM + "' away_team='"+ match.ATEAM +"' league_code='" + match.LEAG + "' ratio_rate='" + match.bets['SC.GG'].OV + "' ratio_type ='SCG' ratio_field='SC.GG' ratio_MBS='" + match.bets['SC.GG'].MBS + "' is_duel='false'>" +  match.bets['SC.GG'].OV + "</div></div>";
        if (match.bets["SC.NG"] != null)
            matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>YOK :</div><div isim='kgy' class='oran' id='SCNG_" + match.MCODE + "' match_date='" + match.LMDATE + "' match_code='" + match.MCODE + "' match_teams='" + match.M_TXT + "' home_team='" + match.HTEAM + "' away_team='"+ match.ATEAM +"' league_code='" + match.LEAG + "' ratio_rate='" + match.bets['SC.NG'].OV + "' ratio_type ='SCG' ratio_field='SC.NG' ratio_MBS='" + match.bets['SC.NG'].MBS + "' is_duel='false'>" +  match.bets['SC.NG'].OV + "</div></div>";

    }
    // ALT/UST 1.5
    if (match.bets["F15.U"] != null ||match.bets["F15.O"] != null ){
        matchesHTML = matchesHTML + "<div>===========================</div>";
        matchesHTML = matchesHTML + "<div class='oran_desc'>MS 1,5 ALT/UST:</div>";
        if (match.bets["F15.O"] != null)
            matchesHTML = matchesHTML + "<div class='MBS"+match.bets["F15.O"].MBS+"' >MBS  :"+match.bets["F15.O"].MBS+"</div>";

        if(match.bets["F15.U"] != null)
            matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>alt :</div><div isim='msa15' class='oran' id='f15u_" + match.MCODE + "' match_date='" + match.LMDATE + "' match_code='" + match.MCODE + "' match_teams='" + match.M_TXT + "' home_team='" + match.HTEAM + "' away_team='"+ match.ATEAM +"' league_code='" + match.LEAG + "' ratio_rate='" + match.bets['F15.U'].OV + "' ratio_type ='F15' ratio_field='F15.U' ratio_MBS='" + match.bets['F15.U'].MBS + "' is_duel='false'>" +  match.bets['F15.U'].OV + "</div></div>";
        if(match.bets["F15.O"] != null)
            matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>ust :</div><div isim='msu15' class='oran' id='f15o_" + match.MCODE + "' match_date='" + match.LMDATE + "' match_code='" + match.MCODE + "' match_teams='" + match.M_TXT + "' home_team='" + match.HTEAM + "' away_team='"+ match.ATEAM +"' league_code='" + match.LEAG + "' ratio_rate='" + match.bets['F15.O'].OV + "' ratio_type ='F15' ratio_field='F15.O' ratio_MBS='" + match.bets['F15.O'].MBS + "' is_duel='false'>" +  match.bets['F15.O'].OV + "</div></div>";
    }
    // ALT/ UST 3.5
    if (match.bets["F35.U"] != null ||match.bets["F35.O"] != null ){
        matchesHTML = matchesHTML + "<div>===========================</div>";
        matchesHTML = matchesHTML + "<div class='oran_desc'>MS 3,5 ALT/UST:</div>";
        if (match.bets["F35.O"] != null)
            matchesHTML = matchesHTML + "<div class='MBS"+match.bets["F35.O"].MBS+"' >MBS  :"+match.bets["F35.O"].MBS+"</div>";

        if (match.bets["F35.U"] != null)
            matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>alt :</div><div isim='msa35' class='oran' id='f35u_" + match.MCODE + "' match_date='" + match.LMDATE + "' match_code='" + match.MCODE + "' match_teams='" + match.M_TXT + "' home_team='" + match.HTEAM + "' away_team='"+ match.ATEAM +"' league_code='" + match.LEAG + "' ratio_rate='" + match.bets['F35.U'].OV + "' ratio_type ='F35' ratio_field='F35.U' ratio_MBS='" + match.bets['F35.U'].MBS + "' is_duel='false'>" +  match.bets['F35.U'].OV + "</div></div>";
        if (match.bets["F35.O"] != null)
            matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>ust :</div><div isim='msu35' class='oran' id='f35o_" + match.MCODE + "' match_date='" + match.LMDATE + "' match_code='" + match.MCODE + "' match_teams='" + match.M_TXT + "' home_team='" + match.HTEAM + "' away_team='"+ match.ATEAM +"' league_code='" + match.LEAG + "' ratio_rate='" + match.bets['F35.O'].OV + "' ratio_type ='F35' ratio_field='F35.O' ratio_MBS='" + match.bets['F35.O'].MBS + "' is_duel='false'>" +  match.bets['F35.O'].OV + "</div></div>";
    }
    //IY ALT/UST 1.5
    if (match.bets["H15.U"] != null || match.bets["H15.O"] != null){
        matchesHTML = matchesHTML + "<div>===========================</div>";
        matchesHTML = matchesHTML + "<div>IY 1,5 ALT/UST:</div>";

        if (match.bets["H15.U"] != null)
            matchesHTML = matchesHTML + "<div class='MBS"+match.bets["H15.U"].MBS+"' >MBS  :"+match.bets["H15.U"].MBS+"</div>";

        if (match.bets["H15.U"] != null)
            matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>alt :</div><div isim='ia15' class='oran' id='h15u_" + match.MCODE + "' match_date='" + match.LMDATE + "' match_code='" + match.MCODE + "' match_teams='" + match.M_TXT + "' home_team='" + match.HTEAM + "' away_team='"+ match.ATEAM +"' league_code='" + match.LEAG + "' ratio_rate='" + match.bets['H15.U'].OV + "' ratio_type ='H15' ratio_field='H15.U' ratio_MBS='" + match.bets['H15.U'].MBS + "' is_duel='false'>" +  match.bets['H15.U'].OV + "</div></div>";
        if (match.bets["H15.O"] != null)
            matchesHTML = matchesHTML + "<div class='oran_wrapper'><div class='oran_baslik'>ust :</div><div isim='iu15' class='oran' id='h15o_" + match.MCODE + "' match_date='" + match.LMDATE + "' match_code='" + match.MCODE + "' match_teams='" + match.M_TXT + "' home_team='" + match.HTEAM + "' away_team='"+ match.ATEAM +"' league_code='" + match.LEAG + "' ratio_rate='" + match.bets['H15.O'].OV + "' ratio_type ='H15' ratio_field='H15.O' ratio_MBS='" + match.bets['H15.O'].MBS + "' is_duel='false'>" +  match.bets['H15.O'].OV + "</div></div>";
    }

    $("#otherRatios").html(matchesHTML);
    $(".other-match-info").i18n();
    $('.oran').on( "tap", function(event) {
        console.log("ORAN TAPPED 2");
        selectActionOnMatches(this);
    });



}
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
    //$.mobile.loading('show');
}
function hideWaitScreen(){
    //$.mobile.loading( 'hide');
    $( '#wait' ).fadeOut("slow");
}
function showSpinner(){
    $.mobile.loading( 'show');
}
function hideSpinner(){
    $.mobile.loading( 'hide');
}
function showPopup(divID){
    $( divID ).fadeIn("slow");

}
function hidePopup(divID){
    $( divID ).fadeOut("fast");
}
/*var q1 = new Question("normal","yes");
 var q2 = new MultipleChoiceQuestion("multi","no",2);*/
var user    = new User("0000001","BORA");
var betSlip = new BetSlip(User);

function addToBetslip(div){ //DIV ALIR DIVI OBJECYE CEVIRIP BETSLIPE ATAR!
    //alert($(div).attr("match_code"));
    var matchID    = BULLETIN_ID + $(div).attr("match_code");
    var matchDate  = $(div).attr("match_date");
    var matchCode  = $(div).attr("match_code");
    var matchTeams = $(div).attr("match_teams");
    var leagueCode = $(div).attr("league_code");

    var ratioType  = $(div).attr("ratio_type");//9,13 ...
    var ratioRate  = $(div).attr("ratio_rate");
    var ratioField = $(div).attr("ratio_field");
    var ratioMBS   = $(div).attr("ratio_MBS");

    var ratio   = new Ratio(ratioType, ratioField, ratioRate,  ratioMBS);

    var isDuel     = $(div).attr("is_duel");

    console.log("isDuel:"+isDuel);
    if (isDuel === "true"){
        var duelSide1 = $(div).attr("duel_side1");
        var duelCode1 = $(div).attr("duel_code1");
        var duelSide2 = $(div).attr("duel_side2");
        var duelCode2 = $(div).attr("duel_code2");
        var match  = new DuelMatch(matchID,matchCode,matchDate,matchTeams,leagueCode,ratio,duelSide1,duelCode1,duelSide2,duelCode2);
        console.log("EKLENECEK MAC duelside 1:"+ duelSide1 + " duelCode1:"+duelCode1 + " duelSide2:"+ duelSide2 + " duelCode2:"+duelCode2);
    }
    else
    {
        var match  = new Match(matchID,matchCode,matchDate,matchTeams,leagueCode,ratio);
    }
    console.log("EKLENECEK MAC:"+matchID +", "+ matchDate +", "+ matchCode +", "+ ratioType +", " + leagueCode +", " + ratioRate +", "+ ratioField +", "+ ratioMBS );
    console.log("user:"+user.fname);
    console.log("match code of ratio:"+match.matchCode);

    //console.log("betslip match code:"+betSlip.matches[0].matchCode,", ratio:"+betSlip.matches[0].ratio.ratioRate);
    //console.log("betslip matches:"+betSlip.matches);
    if (matchIndexOf(betSlip.matches, match.matchCode) > -1)
    {
        console.log("mac betslipte var:"+matchIndexOf(match.matchCode));
        betSlip.matches.splice(match.matchCode);

    }
    //matches.matches.lastIndex(match);
    betSlip.matches.push(match);
    var betslipMatchTimeStamp = Date.now();
    betSlip.betslipMatchTimeStamps.push(""+betslipMatchTimeStamp);

    console.log("betslipMatchTimeStamp:"+betslipMatchTimeStamp);
//    betslipMatchID
    console.log("push ratio match.ratio.ratioRate:"+match.ratio.ratioRate);
   // $("div[bora='2'][name='some\\[thing\\]']").attr("bora")
    var matchID = match.matchID;
    console.log("matchID:"+matchID);

    var lastSameCodeMatchDiv;
    var matchList =  $("div[elementMatchID="+ matchID+"]");
    if(matchList){
        lastSameCodeMatchDiv =  $("div[elementMatchID="+ matchID+"]").last().attr("id");
        console.log("NOOOOOOOOO");
    }
    else{
        console.log("YESSSSSSSS");
    }
        //$("div[elementMatchID='" + match.matchID +"']");
        //$( "div" ).attr( "elementMatchID", match.matchID).last();
    console.log("null mi:"+lastSameCodeMatchDiv);

    if(lastSameCodeMatchDiv && lastSameCodeMatchDiv != 0 ){
        console.log("AYNI MAC VAR ALTINA INSTERT EDILECEK");
        $("<div class='betslipMatchOuter' id='betslipMatchOuther_"+ betslipMatchTimeStamp+ "' elementMatchID='"+ match.matchID+ "'>" +
            "<div class='matchInfoBetslip'>"+
            "<div class='betslipMatchCode'>"+ match.matchCode+"</div>"+
            "<div class='betslipMatchTeams'>"+match.matchTeams+"</div>"+
            "</div>" +
            "<div class='betslipBetDetalis' >"+
            "<div class='betslipRatioField'>"+ratio.ratioField+"</div>"+
            "<div class='betslipRatioMBS" + match.ratio.ratioMBS +"'>" + match.ratio.ratioMBS+ "</div>"+
            "<div class='betslipRatioRate'>"+parseFloat(match.ratio.ratioRate).toFixed(2)+"</div>"+
            "<div class='betslipCancelMatch' id='betslipMatch_"+ betslipMatchTimeStamp+ "' betslipMatchTimeStamp='"+ betslipMatchTimeStamp+
            "' matchRatioId='"+$(div).attr("id")+ "'  >cancel</div>"+
            "</div>"+
            "</div>").insertAfter("#"+lastSameCodeMatchDiv);
    }
    else{
        console.log("AYNI MAC YOK");
        $("<div class='betslipMatchOuter' id='betslipMatchOuther_"+ betslipMatchTimeStamp+ "'  elementMatchID='"+ match.matchID+ "'>" +
            "<div class='matchInfoBetslip'>"+
                "<div class='betslipMatchCode'>"+ match.matchCode+"</div>"+
                "<div class='betslipMatchTeams'>"+match.matchTeams+"</div>"+
            "</div>" +
            "<div class='betslipBetDetalis' >"+
                "<div class='betslipRatioField'>"+ratio.ratioField+"</div>"+
                "<div class='betslipRatioMBS" + match.ratio.ratioMBS +"'>" + match.ratio.ratioMBS+ "</div>"+
                "<div class='betslipRatioRate'>"+parseFloat(match.ratio.ratioRate).toFixed(2)+"</div>"+
                "<div class='betslipCancelMatch' id='betslipMatch_"+ betslipMatchTimeStamp+ "' betslipMatchTimeStamp='"+ betslipMatchTimeStamp+
                    "' matchRatioId='"+ $(div).attr("id") + "'  >cancel</div>"+
            "</div>"+
            "</div>").appendTo("#betslipMatches");
     }

    $( "#betslipMatch_"+betslipMatchTimeStamp).on( "tap", function( event ) {

        //$("#"+betslipMatchTimeStamp).attr("checked", false);
        console.log("ON TAP ORAN MACI REMOVE ET AYNI MU-:"+betslipMatchTimeStamp);
        deleteFromUI(betslipMatchTimeStamp);
        id = $(this).attr("matchRatioId");
        matchRatioDiv = $("#"+id);
        console.log("ratio id-:"+id);
        console.log("ratio id-selected?:"+$("#"+id).attr("selected"));
        selectActionOnMatches(matchRatioDiv);

    });

    return betslipMatchTimeStamp;
}

function deleteFromUI(tempBetSlipMatchTimeStamp){
    var index = betSlip.betslipMatchTimeStamps.indexOf(""+tempBetSlipMatchTimeStamp );
    console.log("MATCH CANCEL------------------------------betslipMatchTimeStamp:"+tempBetSlipMatchTimeStamp +" index:"+index);
    console.log("index for matches now:"+betSlip.betslipMatchTimeStamps);
    if(index != -1){
        console.log("removeda:"+index);
        betSlip.matches.splice(index,1);
        betSlip.betslipMatchTimeStamps.splice(index,1);
        $("#betslipMatchOuther_"+ tempBetSlipMatchTimeStamp).empty();
        console.log("after remove matches:"+betSlip.betslipMatchTimeStamps);

    }
    else{
        console.log("ERROR: betslip matches index is -1");
    }
}

function applyMatchRules() {
    var result = true;

    jQuery.each( betSlip.matches, function( ith, checkMatch ) {
        // MBS NIN ALTINDA MAC OYNANAMAZ
        // herhangi bir mbs toplam mactan buyukse kupon yapilamaz
        maxMBS =  -1;
        jQuery.each( betSlip.matches, function( i, match ) {
            if (ith == i){
                console.log("ith return:"+ith);
                return;
            }
            if(checkMatch.ratio.ratioMBS > maxMBS){
                maxMBS =checkMatch.ratio.ratioMBS;
            }
            //console.log("slipmatch:" + i + " :"+match.leagueCode);
            //MATCH VAR MI DIYE BAKILACAK
            if(checkMatch.matchCode == match.matchCode )
            {
                console.log("rule2 karsilanmadi!"+checkMatch.matchCode);
                WARNING = i18n.t("rule_no_more_one_match", { MatchCode:  checkMatch.matchCode});
                result = false;
                return result;
            }
            //match baslamis mi diye bakilacak
            else if(convertToDate(checkMatch.matchDate) >= getNowGMT3() ){
                console.log("rule3 karsilanmadi!"+checkMatch.matchCode);
                console.log("................... mac saati?"+checkMatch.matchDate);
                console.log("................... gmt3?"+getNowGMT3());
                WARNING = i18n.t("rule_match_started", { MatchCode:  checkMatch.matchCode});
                result = false;
                return result;
            }
            //duelloysa veya duello mac kuponda varsa eklenmeyecek
            else if(checkMatch instanceof DuelMatch && checkMatch.duelCode1 == match.matchCode){
                console.log("checkmac DUEL MAC YES:");
                console.log("rule4.1 karsilanmadi!");
                WARNING = i18n.t("rule_no_more_one_match_duel", { MatchCode:  checkMatch.matchCode});
                result  = false;
                return result;
            }
            else if(checkMatch instanceof DuelMatch && checkMatch.duelCode2 == match.matchCode){
                console.log("rule4.2 karsilanmadi!");
                WARNING = i18n.t("rule_no_more_one_match_duel", { MatchCode:  checkMatch.matchCode});
                result  = false;
                return result;
            }

            //ilgli  duello mac kuponda varsa eklenmeyecek
//            else if(match instanceof DuelMatch){
//                console.log("DUEL MAC YES:"+i);
//                if(checkMatch.matchCode == match.duelCode1 || checkMatch.matchCode == match.duelCode2)	{
//                    console.log("rule4.2 karsilanmadi!");
//                    return false;
//                }
//
//            }
        });
        if(result){
            numOfMatches = betSlip.matches.length;
            if(checkMatch.ratio.ratioMBS > numOfMatches){
                console.log("rule1 karsilanmadi!"+checkMatch.matchCode);

                WARNING = i18n.t("rule_at_least_match", { MBS:  checkMatch.ratio.ratioMBS});
                result  = false;
                return result;
            }
        }

    });
    if(result){
        if(betSlip.matches.length == 0){
            console.log("rule main karsilanmadi!");
            WARNING = i18n.t("rule_no_match_at_betslip");
            result = false;
            return result;
        }
        else{
            console.log("eger rule karsilanmamissa buradan gecmez!");
            return result;
        }
    }

}

function makeBetslip(onNotOk){
//    jQuery.each( betSlip.matches, function( ith, checkMatch ) {
//        console.log("match code:"+checkMatch.matchCode +" ratioField:"+checkMatch.ratio.ratioField);
//        console.log("..........:"+checkMatch.matchCode +" ratioRate:"+checkMatch.ratio.ratioRate);
//    });
    WARNING = "";
    areRulesOK = applyMatchRules();
    console.log("apply rules return:"+areRulesOK);
    if(!areRulesOK){
       onNotOk(WARNING);
    }

}

function getNowGMT3() {
    tempDate = new Date();
    GMT3NOW  = new Date(tempDate.getTime() + (tempDate.getTimezoneOffset() * 60 * 1000) + 60 * 60 * 1000 * BULLETIN_GMT);
    return GMT3NOW;
}
function matchIndexOf(array,searchProperty){ //ONLY USE WITH MATCHCODE

    index = -1;
    for(var i = 0, len = array.length; i < len; i++) {
        if (array[i].matchCode === searchProperty) {
            index = i;
            return index;
        }
    }
}


