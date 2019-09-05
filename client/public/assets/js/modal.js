var _body = $('body');

$(document).ready(function() {

	var transitionEnd = function() {
        var t,
            e = document.createElement('div');

        var transitions = {
            "transition": "transitionend",
            "OTransition": "oTransitionEnd",
            "MozTransition": "transitionend",
            "WebkitTransition": "webkitTransitionEnd"
        };

        for (t in transitions) {
            if (e.style[t] !== undefined) {
                return transitions[t];
            }
        }
    }();

    window.Modal = function() {
        var obj = function(options) {
            var _ = this;

            _.modal = options.modal;
            _.openBtn = options.openBtn;
            _.closeBtn = options.closeBtn;
            _.modal_content = _.modal.find('.modal__content');
            _.isOpen = false;
            _.isAnimating = false;
            _.fadeDuration = options.fadeDuration || 400;

            _.afterClose = options.afterClose || null;

            _.init();
        };

        var _proto = obj.prototype;

        _proto.init = function() {
            var _ = this;

            _.openBtn.click(function(e) {
                e.preventDefault();

                if (!_.isOpen && !_.isAnimating) {
                    _.openModal();
                }
            });

            _.closeBtn.click(function(e) {
                e.preventDefault();

                if (_.isOpen && !_.isAnimating) {
                    _.closeModal();
                }
            });

            _.modal.click(function(e) {
                if (_.isOpen && !_.isAnimating) {
                    if ($(e.target).is(_.modal)) {
                        _.closeModal();
                    }
                }
            });
        };

        _proto.openModal = function() {
            var _ = this;

            _.isAnimating = true;

            _body.addClass('o-hidden');

            _.modal.fadeIn(_.fadeDuration);

            window.setTimeout(function() {
                _.modal_content.addClass('modal__content--in').one(transitionEnd, function() {
                    _.isAnimating = false;
                    _.isOpen = true;
                });
            }, _.fadeDuration / 1.5);
        };

        _proto.closeModal = function() {
            var _ = this;

            _.isAnimating = true;

            _.modal_content.removeClass('modal__content--in').one(transitionEnd, function() {
                _.modal.fadeOut(_.fadeDuration, function() {
                    _.isAnimating = false;
                    _.isOpen = false;
                    _body.removeClass('o-hidden');

                    if(_.afterClose != null)
                        _.afterClose();
                });
            });
        };
        return obj;
    }();
 
    // services modal
    var servicesModal = new Modal({
        modal: $('.js-services-modal'),
        openBtn: $('.js-services-modal-toggler'),
        closeBtn: $('.js-services-modal-close'),
    });
    // support modal
    window.supportModal = new Modal({
        modal: $('.js-support-modal'),
        openBtn: $('.js-support-modal-toggler'),
        closeBtn: $('.js-support-modal-close'),
    });

});