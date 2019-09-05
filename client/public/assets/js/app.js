var _body = $('body'),
    sidebar = $('.js-sidebar'),
    bodyOverlay = $('.js-overlay'),
    hamburger = $('.hamburger'),
    profileToggler = $('.js-profile-toggler'),
    is_animating = false;

$(document).ready(function() {

    // Hamburger
    hamburger.on('touchend click', function(e) {
        e.preventDefault();
        $(this).toggleClass('open');
        sidebar.toggleClass('open');
        _body.toggleClass('o-hidden');
        bodyOverlay.toggleClass('open');
    });

    // hide sidebar 
    $('.js-sidebar-dismisser').on('touchend click', function(e) {
        e.preventDefault();
        hamburger.removeClass('open');
        sidebar.removeClass('open');
        _body.removeClass('o-hidden');
        bodyOverlay.removeClass('open');
    });

    // turn on custom accordion on submenu links
    if ($(window).width() < 768) {
        $('.js-submenu-toggler').on('touchend click', function(e) {
            e.preventDefault();

            var _this = $(this);

            if ((e.type == 'touchend' || e.type == 'click') && !$(e.target).closest('.header-submenu').length) 
            {
                _this.toggleClass('open');
                _this.find('.header-submenu').slideToggle(200);
            }
        });
    }

    // Hide certain elements on body click
    _body.on('touchend click', function(e) {
        if ((e.type == 'touchend' || e.type == 'click') && !$(e.target).closest('.hamburger, .modal, .js-sidebar, .header, .js-modal-toggler, .js-action').length) 
        {

            hamburger.removeClass('open');
            sidebar.removeClass('open');
            bodyOverlay.removeClass('open');
            _body.removeClass('o-hidden');
            profileToggler.removeClass('open');
            $('.js-action').removeClass('open');
        }
    });

    // user profile settings dropdown
    profileToggler.on('touchend click', function(e) {
        e.preventDefault();
        $(this).toggleClass('open');
    });

});