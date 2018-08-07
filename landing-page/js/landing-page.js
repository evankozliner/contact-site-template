// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

$('div.modal').on('show.bs.modal', function() {
	var modal = this;
	var hash = modal.id;
	window.location.hash = hash;
	window.onhashchange = function() {
		if (!location.hash){
			$(modal).modal('hide');
		}
	}
});

var onContctUsSubmit = function () {
    $(document).ready(function () {
        $(".thanks").hide();
        $(".sending").hide();
        $(".errors").hide();
        if ($("#contact-us-form input[name='name']").val() === "" ||
            $("#contact-us-form input[name='email']").val() === "") {
            $(".errors").show();
            $("#contact-us-form button").show();
        } else {
            $(".errors").hide();
            $.post($("#contact-us-form").attr('action'), JSON.stringify({
                name: $("#contact-us-form input[name='name']").val(),
                email: $("#contact-us-form input[name='email']").val(),
                phone: $("#contact-us-form input[name='phone']").val(),
                message: $("#contact-us-form textarea[name='message']").val(),
                'g-recaptcha-response': $("#contact-us-form textarea[name='g-recaptcha-response']").val()
            }), function (data) {
                $(".thanks").show();
                $("#contact-us-form button").hide();
                $("#contact-us-form input[name='name']").val('');
                $("#contact-us-form input[name='email']").val('');
                $("#contact-us-form input[name='phone']").val('');
                $("#contact-us-form textarea[name='message']").val('');
            }, 'json');
        }
    });
};

$(document).ready(function () {
        $("#contact-us-form button").click(function(event) {
            $(".sending").show();
            $("#contact-us-form button").hide();
        });
    });
