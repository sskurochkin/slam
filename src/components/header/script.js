window.addEventListener('load', function() {

    let scrollTop = 0;
    let headerTopHeight = $('.js-header-top').height() || 0;

    document.documentElement.style.setProperty('--headerStickyHeight', $('.header-sticky__inner').height() + 'px');

    //hide notification and recalculate headerTopHeight for sticky header
    $(document).on('click', '.js-header-notification-close', function() {
        setCoockie('isHeaderNotificationShowed', '1', 86400);
        $(this).closest('.header-notification').slideUp(100);
        setTimeout(() => {
            headerTopHeight = $('.js-header-top').height();
        }, 100)
    })

    // const scrollHandler = () => {
    //     if ($(window).scrollTop() > scrollTop && $(window).scrollTop() > headerTopHeight) {
    //         document.querySelector(".js-header-sticky").classList.add("header-sticky--sticky");
    //         document.querySelector(".header-sticky").classList.add("header-min");
    //     } else {
    //         document.querySelector(".header-sticky").classList.remove("header-min");
    //     }
    //     if ($(window).scrollTop() <= headerTopHeight) {
    //         document.querySelector(".js-header-sticky").classList.remove("header-sticky--sticky");
    //     }
    //     scrollTop = $(window).scrollTop();
    // };

    // window.addEventListener('scroll', scrollHandler);


    $('.js-show-more-tags').click(function() {
        $(this).closest('.search-results-tags').toggleClass('active');
    })

    $('.header-mobile-search').click(function() {
        $('.header-mid__search').toggleClass('active');
    })

    // $('.header-search__input .form-control')[0].addEventListener('focus', function() {
    //     $('.search-results').addClass('active');
    // })


    $('.js-show-mini-basket').click(function(ev) {
        ev.stopPropagation();
        $('.mini-basket').addClass('active');
    })

    $(document).click(function(ev) {
        if (
            $(ev.target).closest('.mini-basket').length ||
            $(ev.target).hasClass('mini-basket')
        ) return

        $('.mini-basket').removeClass('active');

    })
})