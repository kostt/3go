// Initialize app
var myApp = new Framework7();

// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: false

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
        preventClicks: false,
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
        },
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







