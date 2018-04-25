// Initialize app
var myApp = new Framework7();

// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true,

});

// if(window.localStorage.getItem('has_run') == null) {
    // myApp.popup('.start-popup');
    // window.localStorage.setItem('has_run', 'true');

// }

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");

});

$$(document).on('DOMContentLoaded', function(){

    var config = {
        apiKey: "AIzaSyALZZKey84dDWiE9GL3piNnrrHj_Pillqk",
        authDomain: "trigo-9f40e.firebaseapp.com",
        databaseURL: "https://trigo-9f40e.firebaseio.com",
        projectId: "trigo-9f40e",
        storageBucket: "trigo-9f40e.appspot.com",
        messagingSenderId: "640078757012"
    };

    firebase.initializeApp(config);

    mainView.router.loadPage('auth.html');
   
    
});


myApp.onPageInit('plan', function (page) {
    
    $$(".plan_result").empty();

    $$(".plan_result").append(
        '<div class="img_chart_scale">' +
        '<div class="first_oval2"></div>' +
        '<canvas id="skills" style="z-index: -4;" width="239" height="239"></canvas>' +
        '<div class="first_oval"></div>' +
        '<div class="chart_scale_time"><div class="chart_scale_hour">0</div><p class="chart_scale_hour_text">часов</p></div>' +
        '<img src="./img/img_chart_scale.svg"></div>' +
        '</div>'
    );

    $$.ajax({
        url: 'http://www.3go.training:8081/api/v1/workout/',
        method: 'get',
        crossDomain: true,
        timeout: 10000,
        beforeSend: function() {myApp.showPreloader();},
        complete: function() {myApp.hidePreloader();},
        success: function (data) {

            $$('.img_chart_scale').animate({'opacity': 1,}, {duration: 1000,});
            var obj = JSON.parse(data);
            
            if(obj.bike > 0){
                $$(".chart_scale_hour").text(obj.bike);
                $$(".cat1").attr('src', './img/img_rider.svg');
                $$(".cat2").attr('src', './img/img_running.svg');
                $$(".cat3").attr('src', './img/img_swiming.svg');
                $$(".cat1").attr('src', './img/img_rider_a.svg');
                plan(1, obj);
            }
            
            if(obj.run > 0){
                $$(".chart_scale_hour").text(obj.run);
                $$(".cat1").attr('src', './img/img_rider.svg');
                $$(".cat2").attr('src', './img/img_running.svg');
                $$(".cat3").attr('src', './img/img_swiming.svg');
                $$(".cat2").attr('src', './img/img_running_a.svg');
                plan(2, obj);
            }
            
            if(obj.swim > 0){
                $$(".chart_scale_hour").text(obj.swim);
                $$(".cat1").attr('src', './img/img_rider.svg');
                $$(".cat2").attr('src', './img/img_running.svg');
                $$(".cat3").attr('src', './img/img_swiming.svg');
                $$(".cat3").attr('src', './img/img_swiming_a.svg');
                plan(3, obj);
            }

            $$('.hide-animate').animate({'opacity': 1,}, {duration: 100,});
            
        },
        error: function(data) {
            error('Произошла ошибка. Проверьте соединение с интернетом');
            myApp.hidePreloader();
        }
    });

$$("#create_report").click(function(){
    mainView.router.loadPage('report.html');
});


});


function plan(category, obj){

    $$(".plan_result").empty();

    setTimeout(function () {
        $$('.img_chart_scale3').animate({'opacity': 1,}, {duration: 1000,});
    }, 100);

    $$(".plan_result").append(
        '<div class="img_chart_scale3">' +
        '<div class="first_oval2"></div>' +
        '<canvas id="skills" style="z-index: -4;" width="239" height="239"></canvas>' +
        '<div class="first_oval"></div>' +
        '<div class="chart_scale_time"><div class="chart_scale_hour">0</div><p class="chart_scale_hour_text">часов</p></div>' +
        '<img class="img_first_oval" src="./img/img_chart_scale.svg"></div>' +
        '</div>'
    );

    pieData = [obj.swim, obj.run, obj.bike];
    $$(".chart_scale_hour").text(obj.bike+obj.run+obj.swim);

    if(category == 1){

    }

    if(category == 2){

    }

    if(category == 3){

    }

    var ctx = document.getElementById("skills").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            datasets: [{
                backgroundColor: [
                    "#fe2d88",
                    "white",
                    "deepskyblue",
                ],
                data: pieData
            }]
        },
        options: {
            responsive: false,
            elements: {
                arc: {
                    borderWidth: 0
                }
            },
            legend: {
                display: false
            },
            tooltips: {
                enabled: false
            },
            animation: {
                duration: 0
            }
        }
    });



    // var LineChart = {
    //     labels : ["10", "20","30","40","50","60"],
    //     datasets : [
    //         {
    //             fillColor : "transparent",
    //             strokeColor : "#fe2d88",
    //             pointColor : "transparent",
    //             pointStrokeColor : "transparent",
    //             data : data,
    //         }
    //     ],
    // }
    //
    // var options = {
    //     scaleFontSize : 14,
    //     scaleFontColor : "white",
    //     scaleShowLabels: false,
    //     scaleShowGridLines : false,
    // }
    //
    // var myLineChart = new Chart(document.getElementById("canvas").getContext("2d")).Line(LineChart, options);
    //
    // var pieData1 = [{value: value_beg, color: 'deepskyblue', highlight: "transparent",}, {value: value_beg_out, color: 'transparent'}];
    // var options1 = {segmentShowStroke: false, animation: false}
    // var context1 = document.getElementById('skills').getContext('2d');
    // var skillsChart1 = new Chart(context1).Pie(pieData1, options1);
    //
    // var pieData2 = [{value: value_rid, color: 'white', highlight: "transparent",}, {value: value_rid_out, color: 'transparent'}];
    // var options2 = {segmentShowStroke: false, animation: false}
    // var context2 = document.getElementById('skills2').getContext('2d');
    // var skillsChart2 = new Chart(context2).Pie(pieData2, options2);
    //
    // var pieData3 = [{value: value_swim, color: '#fe2d88', highlight: "transparent",}, {value: value_swim_out, color: 'transparent'}];
    // var options3 = {segmentShowStroke: false, animation: false}
    // var context3 = document.getElementById('skills3').getContext('2d');
    // var skillsChart3 = new Chart(context3).Pie(pieData3, options3);

}




myApp.onPageInit('wizard', function (page) {
    
    $$('.number').on('input', function() {
        this.value = this.value.replace(/\D/g, '');
    });
    
    var gender = 'm';
    var primary_start = 'sprint';

    $$('.pol').on('click', function () {$$('.pol').removeClass('active');$$(this).addClass('active'); gender = $$(this).attr('data-action');});
    $$('.triatlon').on('click', function () {$$('.triatlon').removeClass('active');$$(this).addClass('active');});
    $$('.sprint').on('click', function () {$$('.sprint').removeClass('active');$$(this).addClass('active');});
    $$('.ol_triat').on('click', function () {$$('.ol_triat').removeClass('active');$$(this).addClass('active');});
    $$('.half').on('click', function () {$$('.half').removeClass('active');$$(this).addClass('active');});
    $$('.long').on('click', function () {$$('.long').removeClass('active');$$(this).addClass('active');});
    $$('.luch_start').on('click', function () {$$('.luch_start').removeClass('active');$$(this).addClass('active'); primary_start = $$(this).attr('data-action');});

    $$('.osob, .kalendar').on('click', function () { if($$(this).hasClass('active')){$$(this).removeClass('active');}else{$$(this).addClass('active');}});


    var monthNames2 = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August' , 'September' , 'October', 'November', 'December'];
    var monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август' , 'Сентябрь' , 'Октябрь', 'Ноябрь', 'Декабрь'];

    var calendarInline = myApp.calendar({
        container: '#calendar-inline-container',
        value: [new Date()],
        weekHeader: false,
        toolbarTemplate:
        '<div class="toolbar calendar-custom-toolbar">' +
        '<div class="toolbar-inner">' +
        '<div class="left">' +
        '<a href="#" class="link icon-only"><div class="smart-select-arrow-left"></div></a>' +
        '</div>' +
        '<div class="center"></div>' +
        '<div class="right">' +
        '<a href="#" class="link icon-only"><div class="smart-select-arrow-right"></div></a>' +
        '</div>' +
        '</div>' +
        '</div>',
        onOpen: function (p) {
            $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] +', ' + p.currentYear);
            $$('.calendar-custom-toolbar .left .link').on('click', function () {
                calendarInline.prevMonth();
            });
            $$('.calendar-custom-toolbar .right .link').on('click', function () {
                calendarInline.nextMonth();
            });
        },
        onMonthYearChangeStart: function (p) {
            $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] +', ' + p.currentYear);
        }
    });


    var mySwiper = new Swiper('.swiper-container', {
        loop: false,
        spaceBetween: 10,
        allowSlidePrev: false,
        allowSlideNext: false,
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
        },
    });

    var mySwiper = $$('.swiper-container')[0].swiper;


    $$('#prew_swip').on('click', function (e) {

        mySwiper.allowSlidePrev = true;
        mySwiper.slidePrev();
        mySwiper.allowSlidePrev = false;
        $$('.wizard-swip').scrollTop(0);
        $$(".page-content").scrollTop(0, 400);

    });

    $$('#next_swip, #next_swip2').on('click', function (e) {

        mySwiper.allowSlideNext = true;
        mySwiper.slideNext();
        mySwiper.allowSlideNext = false;
        if(this.activeIndex != 9) {
            $$(".page-content").scrollTop(0, 400);
        }

    });

    mySwiper.on('slideChange', function (e) {

        if(mySwiper.activeIndex == 0){
            $$("#btn-wizard-start").show();
            $$(".btn-wizard-arrow").css("display", "none");
        }

        if(this.activeIndex == 9){
            $$(".btn-wizard-arrow").css("display", "none");
            $$(".swiper-pagination").css("display", "none");
        }

        if(this.activeIndex == 1){
            $$("#btn-wizard-start").css("display", "none");
            $$(".btn-wizard-arrow").show();
        }

        if(this.activeIndex == 8){
            $$(".btn-wizard-arrow").show();
            $$(".swiper-pagination").show();
        }

    });

    $$('.show-navbar').on('click', function () {
        mainView.showNavbar();
    });

    $$('#start_traning').on('click', function (e) {

            var age = $$('#old').val();
            var diabetic = $$('#diabetic').is(':checked');
            var vegetarian = $$('#vegetarian').is(':checked');
            var handicapped = $$('#handicapped').is(':checked');
            var astmatics = $$('#astmatics').is(':checked');
            var aged = $$('#aged').is(':checked');
            var has_experience = $$('#has_experience').val();
            var best_swim = $$('#best_swim').val();
            var best_run = $$('#best_run').val();
            var best_bike = $$('#best_bike').val();
            var sprint_personal_best = $$('#sprint_personal_best').val();
            var olimpic_personal_best = $$('#olimpic_personal_best').val();
            var half_personal_best = $$('#half_personal_best').val();
            var full_personal_best = $$('#full_personal_best').val();
            var free_time = $$('#free_time').val();
            var months = [];
            var time_zone = $$('#time_zone').val();
            var start_date = new Date();

            for(i=0; i<=11; i++){
                if($$('#month'+i).is(':checked')){
                months.push(i);
                }
            }
        
        if(age.length == 0){age = 0;}
        if(has_experience.length == 0){has_experience = 0;}
        if(best_swim.length == 0){best_swim = 0;}
        if(best_run.length == 0){best_run = 0;}
        if(best_bike.length == 0){best_bike = 0;}
        if(sprint_personal_best.length == 0){sprint_personal_best = 0;}
        if(olimpic_personal_best.length == 0){olimpic_personal_best = 0;}
        if(half_personal_best.length == 0){half_personal_best = 0;}
        if(full_personal_best.length == 0){full_personal_best = 0;}
        if(free_time.length == 0){free_time = 0;}

            var arr2 = {gender: gender, age: age, diabetic: diabetic, vegetarian: vegetarian, handicapped: handicapped, astmatics: astmatics, aged: aged, has_experience: has_experience, best_swim: best_swim, best_run: best_run, best_bike: best_bike, sprint_personal_best: sprint_personal_best, olimpic_personal_best: olimpic_personal_best, half_personal_best: half_personal_best, full_personal_best: full_personal_best, primary_start: primary_start, free_time: free_time, months: months, time_zone: time_zone, start_date: start_date};

            $$.ajax({
                url: 'http://www.3go.training:8081/api/v1/profile/',
                method: 'post',
                dataType: 'json',
                data: JSON.stringify(arr2),
                crossDomain: true,
                timeout: 10000,
                beforeSend: function() {myApp.showPreloader();},
                complete: function() {myApp.hidePreloader();},
                success: function (data) {
                    mainView.router.loadPage('index.html');
                },
                error: function(data) {
                    error('Произошла ошибка. Проверьте соединение с интернетом');
                    myApp.hidePreloader();
                }
            });


});


});


myApp.onPageInit('report', function (page) {

    var slider = new Slider('#ex0');
    var slider1 = new Slider('#ex1');
    var slider2 = new Slider('#ex2');
    var slider3 = new Slider('#ex3');
    var slider4 = new Slider('#ex4');


    var jetlag = false;
    var sick = false;
    var trauma = false;

    $$('#jetlag').on('click', function () { if($$(this).hasClass('active')){$$(this).removeClass('active'); $$('#jetlag2').removeClass('white'); jetlag = false;}else{$$(this).addClass('active'); $$('#jetlag2').addClass('white');jetlag = true;}});
    $$('#sick').on('click', function () { if($$(this).hasClass('active')){$$(this).removeClass('active'); $$('#sick2').removeClass('white'); sick = false;}else{$$(this).addClass('active'); $$('#sick2').addClass('white'); sick = true;}});
    $$('#trauma').on('click', function () { if($$(this).hasClass('active')){$$(this).removeClass('active'); $$('#trauma2').removeClass('white'); trauma = false;}else{$$(this).addClass('active'); $$('#trauma2').addClass('white'); trauma = true;}});


    $$.ajax({
        url: 'http://www.3go.training:8081/api/v1/workout/',
        method: 'get',
        crossDomain: true,
        timeout: 10000,
        beforeSend: function() {myApp.showPreloader();},
        complete: function() {myApp.hidePreloader();},
        success: function (data) {
            var obj = JSON.parse(data);

            swim = obj.swim;
            bike = obj.bike;
            run = obj.run;

            swim =1;
            traning = 'Тренировка';
            if(swim > 0){traning = 'Swim';}
            if(bike > 0){traning = 'Bike';}
            if(run > 0){traning = 'Run';}
            $$('#traning').text(traning);
            $$('.hide-animate2').animate({'opacity': 1,}, {duration: 100,});

        },
        error: function(data) {
            error('Произошла ошибка. Проверьте соединение с интернетом');
            myApp.hidePreloader();
        }
    });


    $$('#report').on('click', function (e) {

        var sport = $$('#ex0').val();
        if(swim > 0){swim = sport;}
        if(bike > 0){bike = sport;}
        if(run > 0){run = sport;}
        var dream = $$('#ex1').val();
        var muscules = $$('#ex2').val();
        var pulse = $$('#ex3').val();
        var exhaustion = $$('#ex4').val();
        var date = new Date();

        var arr = { swim: swim, bike: bike, run: run, jetlag: jetlag, sick: sick, trauma: trauma,
            dream: dream, muscules: muscules, pulse: pulse, exhaustion: exhaustion, date: date};

        $$.ajax({
            url: 'http://www.3go.training:8081/api/v1/workout/report/',
            method: 'post',
            dataType: 'json',
            data: JSON.stringify(arr),
            crossDomain: true,
            timeout: 10000,
            beforeSend: function() {myApp.showPreloader();},
            complete: function() {myApp.hidePreloader();},
            success: function (data) {

                error('Отчет отправлен');
                setTimeout(function () {mainView.router.loadPage('index.html');}, 100);

            },
            error: function(data) {
                error('Произошла ошибка. Проверьте соединение с интернетом');
                myApp.hidePreloader();
            }
        });









    });

});



myApp.onPageInit('camps', function (page) {

    $$(".sport-block2").empty();

    $$.ajax({
        url: 'http://3go-api.local/3go/camps',
        method: 'post',
        dataType: 'json',
        crossDomain: true,
        timeout: 3000,
        beforeSend: function() {myApp.showPreloader();},
        complete: function() {myApp.hidePreloader();},
        success: function (data) {

            if (data.error) {
                error(data.error);
            } else {

                    var count = data.length;
                    if (count>=1) {

                        data.forEach(function(element) {

                            $$(".camps_result").append(
                                '<div class="row sport-block2">'+
                                '<div class="camp-box">'+
                                '<div class="row text-in3">'+element.created_at+'</div>'+
                                '<div class="row text-in2">'+element.name+'</div>'+
                                '</div></div>');
                        });
                    }else{

                        $$(".camps_result").append('<div class="row text-in2 sport-block2">Записи отсутствуют</div>');

                    }
            }
        },
        error: function(data) {
            error('Ппроизошла ошибка. Проверьте соединение с интернетом');
            myApp.hidePreloader();
        }
    });
});






myApp.onPageInit('extras', function (page) {
    extras(1);
});

function extras(category) {

    $$(".cat1").attr('src', './img/img_rider.svg');
    $$(".cat2").attr('src', './img/img_running.svg');
    $$(".cat3").attr('src', './img/img_swiming.svg');
    $$(".extras_video").empty();

    if(category == 1){$$(".cat1").attr('src', './img/img_rider_a.svg');}
    if(category == 2){$$(".cat2").attr('src', './img/img_running_a.svg');}
    if(category == 3){$$(".cat3").attr('src', './img/img_swiming_a.svg');}

    $$.ajax({
        url: 'http://3go-api.local/3go/extras',
        method: 'post',
        dataType: 'json',
        data: {category: category},
        crossDomain: true,
        timeout: 3000,
        beforeSend: function() {myApp.showPreloader();},
        complete: function() {myApp.hidePreloader();},
        success: function (data) {

            if (data.error) {
                error(data.error);
            } else {

                var count = data.length;
                if (count>=1) {

                    data.forEach(function(element, item) {

                        if(item == 0){
                            $$(".extras_result").append(
                                '<div class="row extras_video">' +
                                element.video +
                                '<p class="text-in2">' + element.name + '</p></div>');
                        }else{
                            $$(".extras_result").append(
                                '<div class="row extras_video">' +
                                '<div class="block_video">' +
                                '<span class="block_video_text">Разблокировать</span><span class="block_video_text2"><span class="arrow_box"></span>' + element.points + ' поинтов</span></div>' +
                                element.video +
                                '<p class="text-in2">' + element.name + '</p></div>');
                        }
                    });

                }else{

                    $$(".extras_result").append('<div class="row text-in2 extras_video">Записи отсутствуют</div>');

                }

            }
        },
        error: function(data) {
            error('Произошла ошибка. Проверьте соединение с интернетом');
            myApp.hidePreloader();
        }
    });

    $$(".block_video").css("display", "none")

}





myApp.onPageInit('statistics', function (page) {

    var stat_time = $$('.btn-stat.active').val();
    statistics(stat_time);

    $$('.btn-stat').on('click', function () {
        $$('.btn-stat').removeClass('active');
        $$(this).addClass('active');
        var stat_time = $$(this).val();
        statistics(stat_time);
    });
});

function statistics(stat_time){

    $$(".statistics_result").empty();
    $$(".statistics_result").append('<canvas id="canvas3"></canvas>');

    data1 = [40,10,30,60,30,40,40];
    data2 = [20,20,10,40,60,70,45];
    data3 = [50,10,30,60,50,40,30];
    labels = ["Sun", "Mon","Tues","Wed","Thur","Fri","Sat"];
    labels2 = ["1","30"];
    labels3 = ["1","2","3","4","5","6"];

    if(stat_time == 1){data = data1;data2 = data2;labels = labels;}
    if(stat_time == 2){data = data3;data2 = data1;labels = labels2;}
    if(stat_time == 3){data = data2;data2 = data3;labels = labels3;}

    var chartData = {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: "P1",
                fill: false,
                backgroundColor: 'transparent',
                borderColor: '#fe2d88',
                data: data
            }, {
                label: "P2",
                fill: false,
                backgroundColor: 'transparent',
                borderColor: 'white',
                data: data2
            }]
        },
        options: {
            elements: { point: { radius: 0 } },
            responsive: false,
            legend: {
                display: false
            },
            scales: {

                yAxes: [{
                    display: false,
                    ticks: {
                        beginAtZero:true
                    }
                }],
            }

        }
    }

    var canvas = document.getElementById('canvas3');
    var myChart = new Chart(canvas, chartData);
    
    // var LineChart = {
    //     labels : labels,
    //     datasets : [
    //         {
    //             fillColor : "transparent",
    //             strokeColor : "#fe2d88",
    //             pointColor : "transparent",
    //             pointStrokeColor : "transparent",
    //             data : data,
    //         },
    //         {
    //             fillColor : "transparent",
    //             strokeColor : "white",
    //             pointColor : "transparent",
    //             pointStrokeColor : "transparent",
    //             data : data2,
    //         }
    //     ],
    // }
    //
    // var options = {
    //     scaleFontSize : 12,
    //     scaleFontColor : "grey",
    //     scaleShowLabels: false,
    // }
    //
    // var ctx = document.getElementById("canvas3").getContext("2d");
    // var myLineChart = new Chart(ctx).Line(LineChart, options);

}





myApp.onPageInit('auth', function (page) {

    // FirebaseUI config.
    var uiConfig = {
        callbacks: {
            signInSuccessWithAuthResult: function(authResult, redirectUrl) {
                var user = authResult.user;
                var credential = authResult.credential;
                var isNewUser = authResult.additionalUserInfo.isNewUser;
                var providerId = authResult.additionalUserInfo.providerId;
                var operationType = authResult.operationType;
                // Do something with the returned AuthResult.
                // Return type determines whether we continue the redirect automatically
                // or whether we leave that to developer to handle.
                return true;
            },
            signInSuccess: function(currentUser, credential, redirectUrl) {

                alert("Да");
                // This callback will be deprecated. `signInSuccessWithAuthResult` should
                // be used instead.
                // Do something.
                // Return type determines whether we continue the redirect automatically
                // or whether we leave that to developer to handle.
                return true;
            },
            signInFailure: function(error) {

                alert("Да");
                // Some unrecoverable error occurred during sign-in.
                // Return a promise when error handling is completed and FirebaseUI
                // will reset, clearing any UI. This commonly occurs for error code
                // 'firebaseui/anonymous-upgrade-merge-conflict' when merge conflict
                // occurs. Check below for more details on this.
                return handleUIError(error);
            },
            uiShown: function() {
                // The widget is rendered.
                // Hide the loader.
                document.getElementById('loader').style.display = 'none';
            }
        },
        credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM,
        // Query parameter name for mode.
        queryParameterForWidgetMode: 'mode',
        // Query parameter name for sign in success url.
        queryParameterForSignInSuccessUrl: 'signInSuccessUrl',
        // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
        signInFlow: 'popup',
        signInSuccessUrl: '<url-to-redirect-to-on-success>',
        signInOptions: [
            // Leave the lines as is for the providers you want to offer your users.
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            {
                provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                // Whether the display name should be displayed in the Sign Up page.
                requireDisplayName: true
            },
            {
                provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
                // Invisible reCAPTCHA with image challenge and bottom left badge.
                recaptchaParameters: {
                    type: 'image',
                    size: 'invisible',
                    badge: 'bottomleft'
                }
            }
        ],
        // Terms of service url.
        tosUrl: '<your-tos-url>'
    };

    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig);





//     // FirebaseUI config.
//     var uiConfig = {
//         signInSuccessUrl: '<url-to-redirect-to-on-success>',
//         signInOptions: [
//             // Leave the lines as is for the providers you want to offer your users.
//             firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//             firebase.auth.FacebookAuthProvider.PROVIDER_ID,
//             firebase.auth.TwitterAuthProvider.PROVIDER_ID,
//             firebase.auth.GithubAuthProvider.PROVIDER_ID,
//             firebase.auth.EmailAuthProvider.PROVIDER_ID,
//             firebase.auth.PhoneAuthProvider.PROVIDER_ID
//         ],
//         // Terms of service url.
//         tosUrl: '<your-tos-url>'
//     };
//
//     // Initialize the FirebaseUI Widget using Firebase.
//     var ui = new firebaseui.auth.AuthUI(firebase.auth());
//     // The start method will wait until the DOM is loaded.
//     ui.start('#firebaseui-auth-container', uiConfig);
//
//
//
//     firebase.auth().onAuthStateChanged((user)=> {
//         console.log(user);
//
//     if (user) {
//         console.log('USER SERVICE : user is signed in');
//         this.user = user;
//         alert(user);
//     } else {
//         console.log('USER SERVICE : user is signed out');
//         alert(user);
//     }
// });









    $$('#reg_btn').on('click', function (e) {
        mainView.router.loadPage('registration.html');
    });

    $$('#auth_btn').on('click', function (e) {

        var auth_email = $$('#auth_email').val();
        var auth_password = $$('#auth_password').val();

        if(auth_email.length == 0 && auth_email.length == 0){
            error('Заполните пустые поля');
            return false;
        }

        $$.ajax({
            url: 'http://3go-api.local/3go/auth',
            method: 'post',
            dataType: 'json',
            data: {auth_email: auth_email, auth_password: auth_password},
            crossDomain: true,
            timeout: 3000,
            beforeSend: function() {myApp.showPreloader();},
            complete: function() {myApp.hidePreloader();},
            success: function (data) {

                if (data.error) {
                    error(data.error);
                } else {
                    mainView.router.loadPage('index.html');
                }
            },
            error: function(data) {
                error('Произошла ошибка. Проверьте соединение с интернетом');
                myApp.hidePreloader();
            }
        });

    });
    
});





myApp.onPageInit('registration', function (page) {

    $$('#register_user').on('click', function (e) {

        var reg_email = $$('#reg_email').val();
        var reg_pass = $$('#reg_pass').val();
        var reg_pass2 = $$('#reg_pass2').val();

        if(reg_pass.length == 0 && reg_pass2.length == 0){
            error('Заполните пустые поля');
            return false;
        }

        if(reg_pass != reg_pass2){
            error('Пароли не совпадают');
            return false;
        }

        if(!isValidEmailAddress(reg_email)){
            error('Не правильно введен Email');
            return false;
        }

        $$.ajax({
            url: 'http://3go-api.local/3go/registration',
            method: 'post',
            dataType: 'json',
            data: {reg_email: reg_email, reg_pass: reg_pass},
            crossDomain: true,
            timeout: 3000,
            beforeSend: function() {myApp.showPreloader();},
            complete: function() {myApp.hidePreloader();},
            success: function (data) {

                if (data.error) {
                    error(data.error);
                } else {
                    mainView.router.loadPage('index.html');
                }
            },
            error: function(data) {
                error('Произошла ошибка. Проверьте соединение с интернетом');
                myApp.hidePreloader();
            }
        });

    });

});



myApp.onPageInit('training', function (page) {

   $$('.tran').on('click', function () {$$('.tran').removeClass('active');$$(this).addClass('active');});


    $$.ajax({
        url: 'http://www.3go.training:8081/api/v1/plan/',
        method: 'get',
        crossDomain: true,
        timeout: 10000,
        beforeSend: function() {myApp.showPreloader();},
        complete: function() {myApp.hidePreloader();},
        success: function (data) {

            $$('.img_chart_scale').animate({'opacity': 1,}, {duration: 1000,});
            var obj = JSON.parse(data);

            $$('.btn-wizard3').on('click', function () {
                $$('.btn-wizard3').removeClass('active');
                $$(this).addClass('active');
                tran_time = $$(this).val();
                training(tran_time, obj);
            });

            training(1, obj);

        },
        error: function(data) {
            error('Произошла ошибка. Проверьте соединение с интернетом');
            myApp.hidePreloader();
        }
    });




});


function training(tran_time, obj){

    $$(".training_result").empty();

    setTimeout(function () {
        $$('.img_chart_scale').animate({'opacity': 1,}, {duration: 1000,});
    }, 100);

    $$(".training_result").append(
        '<div class="img_chart_scale">' +
        '<div class="first_oval2"></div>' +
        '<canvas id="skills4" style="z-index: -4;" width="239" height="239"></canvas>' +
        '<div class="first_oval"></div>' +
        '<div class="chart_scale_time"><div class="chart_scale_hour">0</div><p class="chart_scale_hour_text">часов</p></div>' +
        '<img class="img_first_oval" src="./img/img_chart_scale.svg"></div>' +
        '<div class="btn-center"><p class="buttons-row"><canvas id="canvas2"></canvas></p></div>'
        );

    if(tran_time == 1){
        var sum = obj.day['swim']+obj.day['bike']+obj.day['run'];
        pieData = [obj.day['swim'], obj.day['bike'], obj.day['run']];
        $$(".chart_scale_hour").text(sum);
    }

    if(tran_time == 2){

        labels = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];

        var sum = 0; var sum_run = 0; var sum_bike = 0; var sum_swim = 0;
        var week_swim = []; var week_run = []; var week_bike = [];

        obj.week.forEach(function(element) {
            week_swim.push(element['swim']);
            week_run.push(element['run']);
            week_bike.push(element['bike']);
            sum += element['swim']+element['bike']+element['run'];
            sum_run += element['run'];
            sum_bike += element['bike'];
            sum_swim += element['swim'];
        });

        $$(".chart_scale_hour").text(sum);
        pieData = [sum_swim, sum_bike, sum_run];
    }



    if(tran_time == 3){

        labels = [];

        for(i=1;i<=obj.month.length; i++){
            labels.push(i);
        }

        var sum = 0; var sum_run = 0; var sum_bike = 0; var sum_swim = 0;
        var week_swim = []; var week_run = []; var week_bike = [];

        obj.month.forEach(function(element) {
            week_swim.push(element['swim']);
            week_run.push(element['run']);
            week_bike.push(element['bike']);
            sum += element['swim']+element['bike']+element['run'];
            sum_run += element['run'];
            sum_bike += element['bike'];
            sum_swim += element['swim'];
        });

        $$(".chart_scale_hour").text(sum);
        pieData = [sum_swim, sum_bike, sum_run];

    }
    
    if(tran_time != 1) {
        var chartData = {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: "P1",
                    backgroundColor: '#fe2d88',
                    data: week_swim
                }, {
                    label: "P2",
                    backgroundColor: 'white',
                    data: week_run
                }, {
                    label: "P3",
                    backgroundColor: 'deepskyblue',
                    data: week_bike
                }]
            },
            options: {
                responsive: false,
                legend: {
                    display: false
                },
                scales: {
                    yAxes: [{
                        stacked: true
                    }],
                    xAxes: [{
                        stacked: true
                    }]
                },

            }
        }

        var canvas = document.getElementById('canvas2');
        var myChart = new Chart(canvas, chartData);
    }


    var ctx99 = document.getElementById("skills4").getContext('2d');
    var myChart99 = new Chart(ctx99, {
        type: 'pie',
        data: {
            datasets: [{
                backgroundColor: [
                    "#fe2d88",
                    "deepskyblue",
                    "white",
                ],
                data: pieData
            }]
        },
        options: {
            responsive: false,
            elements: {
                arc: {
                    borderWidth: 0
                }
            },
            legend: {
                display: false
            },
            tooltips: {
                enabled: false
            },
            animation: {
                duration: 0
            }
        }
    });


}






$$('.panel-close').on('click', function (e) {
    myApp.closePanel();
});

$$('#start_wizard').on('click', function (e) {
    myApp.closeModal('.start-popup');
    mainView.router.loadPage('wizard.html');
});


$$('.hide-navbar').on('click', function () {
    mainView.hideNavbar();
});

function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    return pattern.test(emailAddress);
}

function error(message){

    myApp.addNotification({
        title: 'Внимание',
        message: message,
        hold: 3000,
        button: {
            text: 'Закрыть',
            color: 'blue'
        }
    });
}

if ( !Date.prototype.toISOString ) {
    ( function() {

        function pad(number) {
            var r = String(number);
            if ( r.length === 1 ) {
                r = '0' + r;
            }
            return r;
        }

        Date.prototype.toISOString = function() {
            return this.getUTCFullYear()
                + '-' + pad( this.getUTCMonth() + 1 )
                + '-' + pad( this.getUTCDate() )
                + 'T' + pad( this.getUTCHours() )
                + ':' + pad( this.getUTCMinutes() )
                + ':' + pad( this.getUTCSeconds() )
                + '.' + String( (this.getUTCMilliseconds()/1000).toFixed(3) ).slice( 2, 5 )
                + 'Z';
        };

    }() );
}





