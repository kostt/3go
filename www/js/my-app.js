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

setTimeout(function () {
    var mySwiper = new Swiper ('.swiper-container', {
        // Optional parameters
        direction: 'horizontal',
        loop: false,

        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
        }
    });
}, 2000);


// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});

myApp.onPageInit('plan', function (page) {
    $$("#create_report").click(function(){
        mainView.router.loadPage('report.html')
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
    myApp.popup('.wizard-popup');
});







