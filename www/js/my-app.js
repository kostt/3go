// Initialize app
var myApp = new Framework7();

// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var appData = {
    token: ''
};


// Add view
var mainView = myApp.addView('.view-main', {
    dynamicNavbar: true, 
    preloadPreviousPage: false
});

if(window.localStorage.getItem('has_run') == null) {
    myApp.popup('.start-popup');
    window.localStorage.setItem('has_run', 'true');

}

// mainView.router.loadPage('auth.html');

// Handle Cordova Device Ready Event
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {

}





$$(document).on('DOMContentLoaded', function(){
    
    var timer;
    $$('#img_logo_big').on("touchstart",function(){
        timer = setTimeout(function(){
            mainView.router.loadPage('wizard.html');
        },500);
    }).on("touchend",function(){
        clearTimeout(timer);
    });

    if(localStorage.getItem('displayName') != null) {
        $$('#displayName').text(localStorage.getItem('displayName'));
        $$('#displaySname').text('');
    }

    if(localStorage.getItem('displaySname') != null) {
        $$('#displaySname').text(localStorage.getItem('displaySname'));
    }

    if(localStorage.getItem('avatar') != null) {
        var image = document.getElementById('avatar');
        image.src = localStorage.getItem('avatar');
    }

});





myApp.onPageInit('*', function (page) {

    var timer;
    $$('.img_logo_big').on("touchstart",function(){
        timer = setTimeout(function(){
            mainView.router.loadPage('wizard.html');
        },500);
    }).on("touchend",function(){
        clearTimeout(timer);
    });


});

myApp.onPageInit('index', function (page) {

    if(localStorage.getItem('displayName') != null) {
        $$('#displayName').text(localStorage.getItem('displayName'));
        $$('#displaySname').text('');
    }

    if(localStorage.getItem('displaySname') != null) {
        $$('#displaySname').text(localStorage.getItem('displaySname'));
    }

    if(localStorage.getItem('avatar') != null) {
        var image = document.getElementById('avatar');
        image.src = localStorage.getItem('avatar');
    }

    $$('.avatar, .profile-box').on('click', function (e) {
        avatar();
    });


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
        '</div><canvas id="canvas4"></canvas>'
    );

    var chartData_line = {
        type: 'line',
        data: {
            labels: ["10", "20","30","40","50","60"],
            datasets: [{
                label: "P1",
                fill: false,
                backgroundColor: 'transparent',
                borderColor: '#fe2d88',
                borderWidth: 4,
                data: [10,60,20,40,80,10],
            }]
        },
        options: {
            elements: { point: { radius: 0 } },
            responsive: false,
            legend: {
                display: false,
            },
            scales: {

                yAxes: [{
                    display: false,
                    ticks: {
                        beginAtZero:true,
                    },
                }],
                xAxes: [{
                    gridLines: {
                        display: false,
                    },
                    ticks: {
                        fontColor: "white",
                        beginAtZero:true,
                    },
                }],
            }

        }
    }

    var canvas_line = document.getElementById('canvas4');
    var myChart_line = new Chart(canvas_line, chartData_line);

    var time = new Date();
    var now_time = time.setHours(time.getHours());
    var cache_time = time.setHours(time.getHours() + 3);

    if(now_time > localStorage.getItem('workout_cache_time')) {

        $$.ajax({
            url: 'http://www.3go.training:8081/api/v1/workout/',
            method: 'get',
            crossDomain: true,
            timeout: 10000,
            cache: true,
            beforeSend: function () {
                myApp.showPreloader();
            },
            complete: function () {
                myApp.hidePreloader();
            },
            success: function (data) {

                localStorage.setItem('workout_cache', data);
                localStorage.setItem('workout_cache_time', cache_time);

                $$('.img_chart_scale').animate({'opacity': 1,}, {duration: 1000,});
                var obj = JSON.parse(data);

                if (obj.bike > 0) {
                    $$(".chart_scale_hour").text(obj.bike);
                    $$(".cat1").attr('src', './img/img_rider.svg');
                    $$(".cat2").attr('src', './img/img_running.svg');
                    $$(".cat3").attr('src', './img/img_swiming.svg');
                    $$(".cat1").attr('src', './img/img_rider_a.svg');
                    plan(1, obj);
                }

                if (obj.run > 0) {
                    $$(".chart_scale_hour").text(obj.run);
                    $$(".cat1").attr('src', './img/img_rider.svg');
                    $$(".cat2").attr('src', './img/img_running.svg');
                    $$(".cat3").attr('src', './img/img_swiming.svg');
                    $$(".cat2").attr('src', './img/img_running_a.svg');
                    plan(2, obj);
                }

                if (obj.swim > 0) {
                    $$(".chart_scale_hour").text(obj.swim);
                    $$(".cat1").attr('src', './img/img_rider.svg');
                    $$(".cat2").attr('src', './img/img_running.svg');
                    $$(".cat3").attr('src', './img/img_swiming.svg');
                    $$(".cat3").attr('src', './img/img_swiming_a.svg');
                    plan(3, obj);
                }

                $$('.hide-animate').animate({'opacity': 1,}, {duration: 100,});

            },
            error: function (data) {
                error('Произошла ошибка. Проверьте соединение с интернетом');
                myApp.hidePreloader();
            }
        });

    }else{

        data = localStorage.getItem('workout_cache');

        $$('.img_chart_scale').animate({'opacity': 1,}, {duration: 1000,});
        var obj = JSON.parse(data);

        if (obj.bike > 0) {
            $$(".chart_scale_hour").text(obj.bike);
            $$(".cat1").attr('src', './img/img_rider.svg');
            $$(".cat2").attr('src', './img/img_running.svg');
            $$(".cat3").attr('src', './img/img_swiming.svg');
            $$(".cat1").attr('src', './img/img_rider_a.svg');
            plan(1, obj);
        }

        if (obj.run > 0) {
            $$(".chart_scale_hour").text(obj.run);
            $$(".cat1").attr('src', './img/img_rider.svg');
            $$(".cat2").attr('src', './img/img_running.svg');
            $$(".cat3").attr('src', './img/img_swiming.svg');
            $$(".cat2").attr('src', './img/img_running_a.svg');
            plan(2, obj);
        }

        if (obj.swim > 0) {
            $$(".chart_scale_hour").text(obj.swim);
            $$(".cat1").attr('src', './img/img_rider.svg');
            $$(".cat2").attr('src', './img/img_running.svg');
            $$(".cat3").attr('src', './img/img_swiming.svg');
            $$(".cat3").attr('src', './img/img_swiming_a.svg');
            plan(3, obj);
        }

        $$('.hide-animate').animate({'opacity': 1,}, {duration: 100,});


    }


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
        '</div><canvas id="canvas4"></canvas>'
    );

    pieData = [obj.swim, obj.run, obj.bike];
    $$(".chart_scale_hour").text(obj.bike+obj.run+obj.swim);

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


    var chartData_line = {
        type: 'line',
        data: {
            labels: ["10", "20","30","40","50","60"],
            datasets: [{
                label: "P1",
                fill: false,
                backgroundColor: 'transparent',
                borderColor: '#fe2d88',
                borderWidth: 4,
                data: [10,60,20,40,80,10],
            }]
        },
        options: {
            elements: { point: { radius: 0 } },
            responsive: false,
            legend: {
                display: false,
            },
            scales: {

                yAxes: [{
                    display: false,
                    ticks: {
                        beginAtZero:true,
                    },
                }],
                xAxes: [{
                    gridLines: {
                        display: false,
                    },
                    ticks: {
                        fontColor: "white",
                        beginAtZero:true,
                    },
                }],
            }

        }
    }

    var canvas_line = document.getElementById('canvas4');
    var myChart_line = new Chart(canvas_line, chartData_line);



}





myApp.onPageInit('wizard', function (page) {

    // $$('#old').on("change keyup input click",function(){
    //     if(this.value.match(/[^0-9]/g)){
    //         this.value=this.value.replace(/[^0-9]/g,'');
    //     }
    // });

    var x = new Date();
    var currentTimeZoneOffsetInHours = x.getTimezoneOffset() / 60;
    if(currentTimeZoneOffsetInHours !=null){
        $$("#time_zone").val(currentTimeZoneOffsetInHours).change();
    }

    var gender = 'm';
    var primary_start = 'sprint';

    $$('.pol').on('click', function () {$$('.pol').removeClass('active');$$(this).addClass('active'); gender = $$(this).attr('data-action');});
    $$('.half').on('click', function () {$$('.half').removeClass('active');$$(this).addClass('active');});
    $$('.long').on('click', function () {$$('.long').removeClass('active');$$(this).addClass('active');});
    $$('.luch_start').on('click', function () {$$('.luch_start').removeClass('active');$$(this).addClass('active'); primary_start = $$(this).attr('data-action');});
    $$('.triatlon_y').on('click', function () {$$('.triatlon_n').removeClass('active');$$(this).addClass('active');$$('#has_experience').prop("disabled", false);});
    $$('.triatlon_n').on('click', function () {$$('.triatlon_y').removeClass('active');$$(this).addClass('active');$$('#has_experience').prop("disabled", true);$$('#has_experience').val('');});
    $$('.sprint_y').on('click', function () {$$('.sprint_n').removeClass('active');$$(this).addClass('active');$$('#sprint_personal_best').prop("disabled", false);});
    $$('.sprint_n').on('click', function () {$$('.sprint_y').removeClass('active');$$(this).addClass('active');$$('#sprint_personal_best').prop("disabled", true);$$('#sprint_personal_best').val('');});
    $$('.ol_triat_y').on('click', function () {$$('.ol_triat_n').removeClass('active');$$(this).addClass('active');$$('#olimpic_personal_best').prop("disabled", false);});
    $$('.ol_triat_n').on('click', function () {$$('.ol_triat_y').removeClass('active');$$(this).addClass('active');$$('#olimpic_personal_best').prop("disabled", true);$$('#olimpic_personal_best').val('');});
    $$('.half_y').on('click', function () {$$('.half_n').removeClass('active');$$(this).addClass('active');$$('#half_personal_best').prop("disabled", false);});
    $$('.half_n').on('click', function () {$$('.half_y').removeClass('active');$$(this).addClass('active');$$('#half_personal_best').prop("disabled", true);$$('#half_personal_best').val('');});
    $$('.long_y').on('click', function () {$$('.long_n').removeClass('active');$$(this).addClass('active');$$('#full_personal_best').prop("disabled", false);});
    $$('.long_n').on('click', function () {$$('.long_y').removeClass('active');$$(this).addClass('active');$$('#full_personal_best').prop("disabled", true);$$('#full_personal_best').val('');});


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

        $$(".page-content").scrollTop(0, 400);
        mySwiper.allowSlidePrev = true;
        mySwiper.slidePrev();
        mySwiper.allowSlidePrev = false;


    });

    $$('#next_swip, #next_swip2').on('click', function (e) {
        
        if ($$('#old').val().length != 0 && !$$('#old').val().match(/^\d+$/)) {
            error('Значение возраст должно быть положительным целым числом без точки или запятой');
            return false;
        }

        if ($$('#has_experience').val().length != 0 && !$$('#has_experience').val().match(/^\d+$/)) {
            error('Значение опыт в триатлоне должно быть положительным целым числом без точки или запятой');
            return false;
        }

        if ($$('#best_swim').val().length != 0 && !$$('#best_swim').val().match(/^\d+$/)) {
            error('Значение плавание 100 м должно быть положительным целым числом без точки или запятой');
            return false;
        }

        if ($$('#best_bike').val().length != 0 && !$$('#best_bike').val().match(/^\d+$/)) {
            error('Значение велосипед 40 км должно быть положительным целым числом без точки или запятой');
            return false;
        }

        if ($$('#best_run').val().length != 0 && !$$('#best_run').val().match(/^\d+$/)) {
            error('Значение бег 10 км должно быть положительным целым числом без точки или запятой');
            return false;
        }

        if ($$('#sprint_personal_best').val().length != 0 && !$$('#sprint_personal_best').val().match(/^\d+$/)) {
            error('Значение личный рекорд в спринте должно быть положительным целым числом без точки или запятой');
            return false;
        }

        if ($$('#olimpic_personal_best').val().length != 0 && !$$('#olimpic_personal_best').val().match(/^\d+$/)) {
            error('Значение личный рекорд в олимпийском триатлоне должно быть положительным целым числом без точки или запятой');
            return false;
        }

        if ($$('#half_personal_best').val().length != 0 && !$$('#half_personal_best').val().match(/^\d+$/)) {
            error('Значение Личный рекорд half (70.3) должно быть положительным целым числом без точки или запятой');
            return false;
        }

        if ($$('#full_personal_best').val().length != 0 && !$$('#full_personal_best').val().match(/^\d+$/)) {
            error('Значение Личный рекорд full (long distance) должно быть положительным целым числом без точки или запятой');
            return false;
        }

        if ($$('#free_time').val().length != 0 && !$$('#free_time').val().match(/^\d+$/)) {
            error('Значение должно быть положительным целым числом без точки или запятой');
            return false;
        }

        $$(".page-content").scrollTop(0, 400);
        mySwiper.allowSlideNext = true;
        mySwiper.slideNext();
        mySwiper.allowSlideNext = false;

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
                    mainView.router.loadPage('auth.html');
                },
                error: function(data) {
                    error('Произошла ошибка. Проверьте соединение с интернетом');
                    myApp.hidePreloader();
                }
            });


});


});


myApp.onPageInit('report', function (page) {


    var slider1 = new Slider('#ex1');
    var slider2 = new Slider('#ex2');
    var slider3 = new Slider('#ex3');
    var slider4 = new Slider('#ex4');
    var slider5 = new Slider('#ex5');
    var slider6 = new Slider('#ex6');
    var slider7 = new Slider('#ex7');


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

            if(swim > 0){$$('#traning_swim').show(); $$('#traning_swim').animate({'opacity': 1,}, {duration: 100,});}
            if(bike > 0){$$('#traning_bike').show();$$('#traning_bike').animate({'opacity': 1,}, {duration: 100,});}
            if(run > 0){$$('#traning_run').show();$$('#traning_run').animate({'opacity': 1,}, {duration: 100,});}

            $$('.hide-animate2').animate({'opacity': 1,}, {duration: 100,});

        },
        error: function(data) {
            error('Произошла ошибка. Проверьте соединение с интернетом');
            myApp.hidePreloader();
        }
    });


    $$('#report').on('click', function (e) {

        if(swim > 0){swim = $$('#ex7').val();}else{swim = 0;}
        if(bike > 0){bike = $$('#ex6').val();}else{bike = 0;}
        if(run > 0){run = $$('#ex5').val();}else{run = 0;}

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
        url: 'http://www.3go.training:8081/api/v1/camps/',
        method: 'get',
        dataType: 'json',
        crossDomain: true,
        timeout: 10000,
        beforeSend: function() {myApp.showPreloader();},
        complete: function() {myApp.hidePreloader();},
        success: function (data) {

            if (data.error) {
                error(data.error);
            } else {

                            $$(".camps_result").append(
                                '<div class="row sport-block2">'+
                                data.body+
                               '</div>');
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
        url: 'http://www.3go.training:8081/api/v1/extras/',
        method: 'get',
        dataType: 'json',
        crossDomain: true,
        timeout: 10000,
        beforeSend: function() {myApp.showPreloader();},
        complete: function() {myApp.hidePreloader();},
        success: function (data) {

            if (data.error) {
                error(data.error);
            } else {


                var count = data.extras.length;
                if (count>=1) {

                    data.extras.forEach(function(element, item) {

                        $$(".extras_result").append(
                            '<div class="row extras_video">' +
                            '<iframe width="100%" height="auto" src="' + element.url + '" wmode="opaque" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen=""></iframe>'+
                            '<p class="text-in2">' + element.title + '</p></div>');

                    });

                }else{
                    $$(".extras_result").append('<div class="row text-in2 extras_video">Записи отсутствуют</div>');
                }


                // var count = data.length;
                // if (count>=1) {
                //
                //     data.forEach(function(element, item) {
                //
                //         if(item == 0){
                //             $$(".extras_result").append(
                //                 '<div class="row extras_video">' +
                //                 element.video +
                //                 '<p class="text-in2">' + element.name + '</p></div>');
                //         }else{
                //             $$(".extras_result").append(
                //                 '<div class="row extras_video">' +
                //                 '<div class="block_video">' +
                //                 '<span class="block_video_text">Разблокировать</span><span class="block_video_text2"><span class="arrow_box"></span>' + element.points + ' поинтов</span></div>' +
                //                 element.video +
                //                 '<p class="text-in2">' + element.name + '</p></div>');
                //         }
                //     });
                //
                // }else{
                //
                //     $$(".extras_result").append('<div class="row text-in2 extras_video">Записи отсутствуют</div>');
                //
                // }

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


    $$.ajax({
        url: 'http://www.3go.training:8081/api/v1/stats/',
        method: 'get',
        crossDomain: true,
        timeout: 10000,
        beforeSend: function() {myApp.showPreloader();},
        complete: function() {myApp.hidePreloader();},
        success: function (data) {
            var obj = JSON.parse(data);

            var week = obj.week;
            var month = obj.month;
            var halfyear = obj.halfyear;

            labels = ["Sun", "Mon","Tues","Wed","Thur","Fri","Sat"];
            labels2 = [];
            labels3 = [];

            for(i=1;i<=week.expected.length; i++){
                if(week.real.length < i){
                    week.real.push(0);
                }
            }

            for(i=1;i<=month.expected.length; i++){
                labels2.push(i);
                if(month.real.length < i){
                    month.real.push(0);
                }
            }

            for(i=1;i<=halfyear.expected.length; i++){
                labels3.push(i);
                if(halfyear.real.length < i){
                    halfyear.real.push(0);
                }
            }


            if(stat_time == 1){data = week.expected;data2 = week.real;labels = labels;}
            if(stat_time == 2){data = month.expected;data2 = month.real;labels = labels2;}
            if(stat_time == 3){data = halfyear.expected;data2 = halfyear.real;labels = labels3;}

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
                        xAxes: [{
                            display: false
                        }]
                    }

                }
            }

            var canvas = document.getElementById('canvas3');
            var myChart = new Chart(canvas, chartData);

        },
        error: function(data) {
            error('Произошла ошибка. Проверьте соединение с интернетом');
            myApp.hidePreloader();
        }
    });




}





myApp.onPageInit('auth', function (page) {
    
    firebase.auth().onAuthStateChanged((user)=> {
        console.log(user);

    if (user) {

        console.log('USER SERVICE : user is signed in');
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var uid = user.uid;
        var phoneNumber = user.phoneNumber;
        var providerData = user.providerData;

        displayName = displayName.split(' ');
        
        if(displayName[0]){
            localStorage.setItem('displayName', displayName[0]); 
        }
        
        // if(displayName[1]){
        //     localStorage.setItem('displaySname', displayName[1]);
        // }

        user.getIdToken().then(function(accessToken) {

            appData.token = accessToken;
            window.localStorage.setItem('token', accessToken);
            autorization(appData.token);

        });

    } else {

        console.log('USER SERVICE : user is signed out');
        // FirebaseUI config.
        var uiConfig = {
            signInSuccessUrl: 'auth.html',
            signInOptions: [
                // Leave the lines as is for the providers you want to offer your users.
                // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
                // firebase.auth.GithubAuthProvider.PROVIDER_ID,
                firebase.auth.EmailAuthProvider.PROVIDER_ID,
                // firebase.auth.PhoneAuthProvider.PROVIDER_ID
            ],
            callbacks: {
                'signInSuccess': function (currentUser, credential, redirectUrl) {
                    mainView.router.loadPage('index.html');
                    return false;
                }
            },
            // Terms of service url.
            tosUrl: 'auth.html',
        };


        let ui = firebaseui.auth.AuthUI.getInstance();
        if (!ui) {
            ui = new firebaseui.auth.AuthUI(window.firebase.auth());
        }
        ui.start('#firebaseui-auth-container', uiConfig);
    }

});

});


function autorization(token){

    $$('#firebaseui-auth-container').text('Проверка авторизации');

    $$.ajax({
        url: 'http://www.3go.training:8081/api/v1/',
        method: 'get',
        crossDomain: true,
        timeout: 10000,
        beforeSend: function(xhr) {xhr.setRequestHeader('Authorization', token); myApp.showPreloader();},
        complete: function() {myApp.hidePreloader();},
        success: function (data) {

            $$('#firebaseui-auth-container').text('Проверка авторизации');
            myApp.showPreloader();
            
            setTimeout(function () {
                myApp.hidePreloader();
                mainView.router.loadPage('index.html');
            }, 1500);


        },
        error: function(data) {
            error('Произошла ошибка. Проверьте соединение с интернетом');
            myApp.hidePreloader();

            $$('#firebaseui-auth-container').text('Повторное подключение через 5 секунд');

            setTimeout(function () {
                autorization(token);
            }, 5000);
            
        }
    });

}


myApp.onPageInit('training', function (page) {

   $$('.tran').on('click', function () {$$('.tran').removeClass('active');$$(this).addClass('active');});


    var time = new Date();
    var now_time = time.setHours(time.getHours());
    var cache_time = time.setHours(time.getHours() + 3);

    if(now_time > localStorage.getItem('plan_cache_time')) {

        $$.ajax({
            url: 'http://www.3go.training:8081/api/v1/plan/',
            method: 'get',
            crossDomain: true,
            timeout: 10000,
            cache: true,
            beforeSend: function () {
                myApp.showPreloader();
            },
            complete: function () {
                myApp.hidePreloader();
            },
            success: function (data) {

                localStorage.setItem('plan_cache', data);
                localStorage.setItem('plan_cache_time', cache_time);

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
            error: function (data) {
                error('Произошла ошибка. Проверьте соединение с интернетом');
                myApp.hidePreloader();
            }
        });

    }else{

        data = localStorage.getItem('plan_cache');

        $$('.img_chart_scale').animate({'opacity': 1,}, {duration: 1000,});
        var obj = JSON.parse(data);

        $$('.btn-wizard3').on('click', function () {
            $$('.btn-wizard3').removeClass('active');
            $$(this).addClass('active');
            tran_time = $$(this).val();
            training(tran_time, obj);
        });

        training(1, obj);
    }




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


myApp.onPageInit('settings', function (page) {

    if(localStorage.getItem('push_note') == null) {
        localStorage.setItem('push_note', 'false');
        $$('#push_note').removeAttr("checked");
    }else{
        if(localStorage.getItem('push_note') == 'true'){
            $$('#push_note').attr('checked', 'checked');
        }else{
            $$('#push_note').removeAttr("checked");
        }
    }

    if(localStorage.getItem('online_back') == null) {
        localStorage.setItem('online_back', 'false');
        $$('#online_back').removeAttr("checked");
    }else{
        if(localStorage.getItem('online_back') == 'true'){
            $$('#online_back').attr('checked', 'checked');
        }else{
            $$('#online_back').removeAttr("checked");
        }
    }

    if(localStorage.getItem('data_sys') == null) {
        localStorage.setItem('data_sys', 'false');
        $$('#data_sys').removeAttr("checked");
    }else{
        if(localStorage.getItem('data_sys') == 'true'){
            $$('#data_sys').attr('checked', 'checked');
        }else{
            $$('#data_sys').removeAttr("checked");
        }
    }

    if(localStorage.getItem('adapt_plan') == null) {
        localStorage.setItem('adapt_plan', 'false');
        $$('#adapt_plan').removeAttr("checked");
    }else{
        if(localStorage.getItem('adapt_plan') == 'true'){
            $$('#adapt_plan').attr('checked', 'checked');
        }else{
            $$('#adapt_plan').removeAttr("checked");
        }
    }

    $$('#push_note_lab').on('click', function (e) {
        if(localStorage.getItem('push_note') == 'true') {
            localStorage.setItem('push_note', 'false');
        }else{
            localStorage.setItem('push_note', 'true');
        }
    });

    $$('#online_back_lab').on('click', function (e) {
        if(localStorage.getItem('online_back') == 'true') {
            localStorage.setItem('online_back', 'false');
        }else{
            localStorage.setItem('online_back', 'true');
        }
    });

    $$('#data_sys_lab').on('click', function (e) {
        if(localStorage.getItem('data_sys') == 'true') {
            localStorage.setItem('data_sys', 'false');
        }else{
            localStorage.setItem('data_sys', 'true');
        }
    });

    $$('#adapt_plan_lab').on('click', function (e) {
        if(localStorage.getItem('adapt_plan') == 'true') {
            localStorage.setItem('adapt_plan', 'false');
        }else{
            localStorage.setItem('adapt_plan', 'true');
        }
    });

});




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


function validate(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode( key );
    var regex = /[0-9]|\.\,/;
    if( !regex.test(key) ) {
        theEvent.returnValue = false;
        if(theEvent.preventDefault) theEvent.preventDefault();
    }
}


$$('.avatar, .profile-box').on('click', function (e) {
    avatar();
});


function avatar(){

    myApp.modal({
        title:  'Мой профиль',
        text: 'Настройки',
        verticalButtons: true,
        buttons: [
            {
                text: 'Изменить имя',
                onClick: function() {
                    myApp.prompt('Введите ваше имя', 'Изменить имя', function (value) {
                        localStorage.setItem('displayName', value);
                        $$('#displayName').text(localStorage.getItem('displayName'));
                    });
                }
            },
            {
                text: 'Изменить фамилию',
                onClick: function() {
                    myApp.prompt('Введите вашу фамилию', 'Изменить фамилию', function (value) {
                        localStorage.setItem('displaySname', value);
                        $$('#displaySname').text(localStorage.getItem('displaySname'));
                    });
                }
            },
            {
                text: 'Изменить фото',
                onClick: function() {

                    navigator.camera.getPicture(onPhotoURISuccess, onFail, {
                        allowEdit: true,
                        correctOrientation: true,
                        targetHeight: window.innerHeight,
                        targetWidth: window.innerWidth,
                        quality: 50,
                        destinationType: Camera.DestinationType.DATA_URL,
                        sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
                    });

                    function onPhotoURISuccess(imageData) {

                        var image = document.getElementById('avatar');
                        var path = "data:image/jpeg;base64," + imageData;
                        image.src = path;
                        localStorage.setItem('avatar', path);

                    }

                    function onFail(message) {

                    }


                }
            },
            {
                text: 'Отмена',
                color: 'red',
            }
        ]
    });
}



myApp.onPageInit('1on1', function (page) {

    $$('#1on1_btn').on('click', function (e) {

        arr = [];

        $$.ajax({
            url: 'http://www.3go.training:8081/api/v1/oneonone/',
            method: 'post',
            dataType: 'json',
            crossDomain: true,
            data: JSON.stringify(arr),
            timeout: 10000,
            beforeSend: function() {myApp.showPreloader();},
            complete: function() {myApp.hidePreloader();},
            success: function (data) {

                if (data.error) {
                    error(data.error);
                } else {
                    error(data.result);
                }
            },
            error: function(data) {
                error('Произошла ошибка. Проверьте соединение с интернетом');
                myApp.hidePreloader();
            }
        });

    });


});









