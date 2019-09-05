var allInput = $('.js-input');

// make action on following forms' send-button click
$('.js-submit-form').on('submit', function(e) {
    var _this = $(this);

    checkInputs(e, _this);
});
$('.js-submit-form-1').on('submit', function(e) {
    var _this = $(this);

    checkInputs(e, _this);
});
$('.js-submit-form-btn').on('touchend click', function(e) {
    checkInputs(e, $('.js-submit-form'));
});

// check if input has value
allInput.on('input', function() {
    var _this = $(this);

    if (_this.val() != '') {
        _this.parent().removeClass('form-group--error');
    }
})

$('.js-checkbox-input').on('input', function() {
    $('.js-checkbox').parent().removeClass('checkbox--error');
});

$('.js-checkbox').on('change', function() {
    $('.js-checkbox-input').parent().removeClass('form-group--error');
});

$('.js-upload').on('change', function() {
    $(this).parent().removeClass('btn--danger-border');
});

// main check function
function checkInputs(e, formName) {
    var cInput = formName.find('.js-input'),
        cSelect = formName.find('select.js-input'),
        cCheckBox = formName.find('.js-checkbox'),
        cFileUpload = formName.find('.js-upload');

    // check inputs
    var cInputValidatedCount = null;
    cInput.each(function(i, item) {
        if (item.hasAttribute('readonly')) {
            return '';
        }

        if ($(item).val() == '') {
            e.preventDefault();
            $(item).parent().addClass('form-group--error');
            formName.removeClass('validated');
        }
        else {
            cInputValidatedCount += 1;
            if (cInputValidatedCount == cInput.length) {
                formName.addClass('validated');
            }
        }
    });

    // check selectboxes
    var cSelectValidatedCount = null;
    cSelect.each(function(i, item) {
        if ($(item).find('option:selected').val() == 'disabled') {
            e.preventDefault();
            $(item).parent().addClass('form-group--error');
            formName.removeClass('validated');
        }
        else {
            cSelectValidatedCount += 1;
            if (cSelectValidatedCount == cSelect.length) {
                formName.addClass('validated');
            }
        }
    })

    // check checkboxes
    var cCheckBoxValidatedCount = null;
    cCheckBox.each(function(i, item) {
        if ($('.js-checkbox-input').val() != '') {
            $(item).parent().removeClass('form-group--error');
            return '';
        }
        
        if (!$(item).is(":checked")) {
            e.preventDefault();
            $(item).parent().addClass('checkbox--error');
            formName.removeClass('validated');
        }
        else {
            cCheckBoxValidatedCount += 1;
            if (cCheckBoxValidatedCount == cSelect.length) {
                formName.addClass('validated');
            }
        }
    })

    // check fileUpload Inputs
    var cFileUploadValidatedCount = null;
    cFileUpload.each(function(i, item) {
        if (!$(item).val() != "") {
            e.preventDefault();
            $(item).parent().addClass('btn--danger-border');
            formName.removeClass('validated');
        }
        else {
            cFileUploadValidatedCount += 1;
            if (cFileUploadValidatedCount == cSelect.length) {
                formName.addClass('validated');
            }
        }
    })

    // trigger focus on first not filled input
    $('.form-group--error').first().find('.input').trigger('focus');
}