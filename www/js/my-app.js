// Initialize app
var myApp = new Framework7();

// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: false,

});

// if(window.localStorage.getItem('has_run') == null) {
//     myApp.popup('.start-popup');
    // window.localStorage.setItem('has_run', 'true');
// }

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});


myApp.onPageInit('plan', function (page) {

    myApp.showPreloader();
    setTimeout(function () {
        myApp.hidePreloader();
        $$('.img_chart_scale').animate(
            {
                'opacity': 1,
            }, {
                duration: 1000,
            }
        );
    }, 500);


    var LineChart = {
        labels : ["10", "20","30","40","50","60"],
        datasets : [
            {
                fillColor : "transparent",
                strokeColor : "#fe2d88",
                pointColor : "transparent",
                pointStrokeColor : "transparent",
                data : [10,20,10,30,10,40,10,50,10,60],
            }
        ],
    }

    var options = {
        scaleFontSize : 14,
        scaleFontColor : "white",
        scaleShowLabels: false,
        scaleShowGridLines : false,
    }

    var myLineChart = new Chart(document.getElementById("canvas").getContext("2d")).Line(LineChart, options);

    var pieData1 = [{value: 90, color: 'deepskyblue', highlight: "transparent",}, {value: 10, color: 'transparent'}];
    var options1 = {segmentShowStroke: false}
    var context1 = document.getElementById('skills').getContext('2d');
    var skillsChart1 = new Chart(context1).Pie(pieData1, options1);

    var pieData2 = [{value: 70, color: 'white', highlight: "transparent",}, {value: 30, color: 'transparent'}];
    var options2 = {segmentShowStroke: false}
    var context2 = document.getElementById('skills2').getContext('2d');
    var skillsChart2 = new Chart(context2).Pie(pieData2, options2);

    var pieData3 = [{value: 50, color: '#fe2d88', highlight: "transparent",}, {value: 50, color: 'transparent'}];
    var options3 = {segmentShowStroke: false}
    var context3 = document.getElementById('skills3').getContext('2d');
    var skillsChart3 = new Chart(context3).Pie(pieData3, options3);

    $$("#create_report").click(function(){
        mainView.router.loadPage('report.html')
    });

});

myApp.onPageInit('wizard', function (page) {

    var mySwiper = new Swiper('.swiper-container', {
        loop: false,
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
        },
    });

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

    $$('#prew_swip').on('click', function (e) {
        var mySwiper = $$('.swiper-container')[0].swiper;
        mySwiper.slidePrev();
        if(mySwiper.activeIndex == 0){
            $$("#btn-wizard-start").show();
            $$(".btn-wizard-arrow").css("display", "none");
        }
    });

    $$('#next_swip').on('click', function (e) {
        var mySwiper = $$('.swiper-container')[0].swiper;
        mySwiper.slideNext();
    });

    $$('#next_swip2').on('click', function (e) {
        var mySwiper = $$('.swiper-container')[0].swiper;
        mySwiper.slideNext();

        if(mySwiper.activeIndex == 9){
            $$(".btn-wizard-arrow").css("display", "none");
            $$(".swiper-pagination").css("display", "none");
        }


    });

    $$('.show-navbar').on('click', function () {
        mainView.showNavbar();
    });

    $$('#start_traning').on('click', function (e) {

        $$.ajax({
            url: 'http://3go-api.local/3go/start',
            method: 'post',
            dataType: 'json',
            data: {},
            crossDomain: true,
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

    $$('#btn-wizard-start').on('click', function (e) {
        $$("#btn-wizard-start").css("display", "none");
        $$(".btn-wizard-arrow").show();
    });

});


myApp.onPageInit('report', function (page) {
    var slider = new Slider('#ex1');
    var slider2 = new Slider('#ex2');
    var slider3 = new Slider('#ex3');
    var slider4 = new Slider('#ex4');
});



myApp.onPageInit('camps', function (page) {

    $$(".sport-block2").empty();

    $$.ajax({
        url: 'http://3go-api.local/3go/camps',
        method: 'post',
        dataType: 'json',
        crossDomain: true,
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

    $$(".extras_video").empty();

    $$.ajax({
        url: 'http://3go-api.local/3go/extras',
        method: 'post',
        dataType: 'json',
        data: {category: category},
        crossDomain: true,
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

    var LineChart = {
        labels : ["Sun", "Mon","Tues","Wed","Thur","Fri","Sat"],
        datasets : [
            {
                fillColor : "transparent",
                strokeColor : "#fe2d88",
                pointColor : "transparent",
                pointStrokeColor : "transparent",
                data : [10,20,10,30,10,40,10],
            },
            {
                fillColor : "transparent",
                strokeColor : "white",
                pointColor : "transparent",
                pointStrokeColor : "transparent",
                data : [20,30,20,50,20,60,20],
            }
        ],
    }

    var options = {
        scaleFontSize : 12,
        scaleFontColor : "grey",
        scaleShowLabels: false,
    }

    var ctx = document.getElementById("canvas").getContext("2d");
    var myLineChart = new Chart(ctx).Line(LineChart, options);

});


myApp.onPageInit('auth', function (page) {

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

    myApp.showPreloader();
    setTimeout(function () {
        myApp.hidePreloader();
        $$('.img_chart_scale').animate(
            {
                'opacity': 1,
            }, {
                duration: 1000,
            }
        );
    }, 500);


    var LineChart = {
        labels : ["Sun", "Mon","Tues","Wed","Thur","Fri","Sat"],
        datasets : [
            {
                fillColor : "#fe2d88",
                strokeColor : "#fe2d88",
                pointColor : "#fe2d88",
                pointStrokeColor : "#fe2d88",
                data : [10,20,30,40,50,60,70],
            }
        ],
    }

    var options = {
        scaleFontSize : 14,
        scaleFontColor : "white",
        scaleShowLabels: false,
        scaleShowGridLines : false,
    }

    var myLineChart = new Chart(document.getElementById("canvas2").getContext("2d")).Bar(LineChart, options);
    
    var pieData4 = [{value: 50, color: '#fe2d88', highlight: "transparent",}, {value: 50, color: 'transparent'}];
    var options4 = {segmentShowStroke: false}
    var context4 = document.getElementById('skills4').getContext('2d');
    var skillsChart4 = new Chart(context4).Pie(pieData4, options4);

    

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





