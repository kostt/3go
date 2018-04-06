// Initialize app
var myApp = new Framework7();

// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;




// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true,

});

$$('.hide-navbar').on('click', function () {
    mainView.hideNavbar();
});







if(window.localStorage.getItem('has_run') == null) {
    myApp.popup('.start-popup');
    // window.localStorage.setItem('has_run', 'true');
}



// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});


myApp.onPageInit('plan', function (page) {
    $$("#create_report").click(function(){
        mainView.router.loadPage('report.html')
    });

});

myApp.onPageInit('wizard', function (page) {

    var mySwiper = new Swiper('.swiper-container', {
        speed: 400,
        spaceBetween: 100,
        preventClicks: true,
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

    $$('.show-navbar').on('click', function () {
        mainView.showNavbar();
    });

    $$('#start_traning').on('click', function (e) {
        mainView.router.loadPage('index.html');
    });


});





myApp.onPageInit('report', function (page) {
    var slider = new Slider('#ex1');
    var slider2 = new Slider('#ex2');
    var slider3 = new Slider('#ex3');
    var slider4 = new Slider('#ex4');
});


$$('.panel-close').on('click', function (e) {
    myApp.closePanel();
});


$$('#start_wizard').on('click', function (e) {
    myApp.closeModal('.start-popup');
    mainView.router.loadPage('wizard.html');
});






$$('#next_swip').on('click', function (e) {
    var mySwiper = $$('.swiper-container')[0].swiper;
// Here you can use all slider methods like:
});






