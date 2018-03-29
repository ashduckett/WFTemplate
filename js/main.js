$(document).ready(function() {

    function createGenericOverlay() {
        var overlay = document.createElement('div');
        overlay.style.position = 'absolute';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundPosition = 'center';
        overlay.style.backgroundRepeat = 'no-repeat';
        return overlay;
    }

    function createOpacityOverlay() {
        var opacityBg = createGenericOverlay();
        opacityBg.style.backgroundColor = 'black';
        opacityBg.style.backgroundSize = '50%';
        opacityBg.style.opacity = '0.5';
        return opacityBg;
    }

    function createImageOverlay(imageName) {
        var overlay = createGenericOverlay();
        overlay.style.backgroundImage = 'url(img/' + imageName + ')';
        overlay.style.backgroundSize = '30%';
        return overlay;
    }

    $('.slider').slider('£', 50, 10000);

    var scrollElementOne = new ScrollElement('scroller1 - Copy.jpeg', [createOpacityOverlay(), createImageOverlay('no1.png')]);
    var scrollElementTwo = new ScrollElement('scroller2.jpeg', [createOpacityOverlay(), createImageOverlay('no2.png')]);
    var scrollElementThree = new ScrollElement('scroller3.jpeg', [createOpacityOverlay(), createImageOverlay('no3.png')]);
    var scrollElementFour = new ScrollElement('scroller4.jpeg', [createOpacityOverlay(), createImageOverlay('no4.png')]);

    $('.scroller').scroller([scrollElementOne, scrollElementTwo, scrollElementThree, scrollElementFour]);
    $('.combo-box.business-type').combo('HOME', ['Commercial', 'Home']);
    $('.combo-box.flooring-style').combo('WE\'VE GOT SO MUCH CHOICE, BUT SOMETIMES YOU KNOW WHAT YOU\'RE AFTER', ['Laminate', 'Hardwood', 'Stone', 'Tile', 'Carpet']);
    $('.combo-box.which-room').combo('IF WE KNOW WHAT ROOM, WE CAN ADVISE YOU ON WHAT MIGHT WORK FOR YOU', ['Living Room', 'Bedroom', 'Bathroom', 'Kitchen', 'Hall', 'Landing']);

    $('.hamburger').click(function() {
        $(this).toggleClass('is-active');
        $('.mobile-menu').toggleClass('displayed');
        $('nav').toggleClass('mobile-menu-open');
    });

    $(window).scroll(function() {
        if($(this).scrollTop() > 400) {
            $('nav').addClass('block-black')
        } else {
            $('nav').removeClass('block-black')
        }
    });
});