var ScrollElement = function(imagePath, overlays) {
    this.imagePath = imagePath;
    this.overlays = overlays;
};

jQuery.fn.scroller = function(scrollElements) {
    elements = [];

    for(var i = 0; i < 4; i++) {
        var element = document.createElement('div');
        element.classList.add('scrollerElement');

        var image = document.createElement('img');
        image.style.width = '100%';
        image.style.height = '100%';
        
        
        image.src = 'img/' + scrollElements[i].imagePath;
        image.classList.add('scrollerImage');
        element.appendChild(image);

        // Iterate over overlays for current scroll element here
        for (var j = 0; j < scrollElements[i].overlays.length; j++) {
            scrollElements[i].overlays[j].classList.add('scrollerOverlay');
            element.appendChild(scrollElements[i].overlays[j]);
        }
        elements.push(element);
    }

    elements[0].style.left = '-16.665%';
    $(this).append(elements[0]);

    elements[1].style.backgroundColor = 'yellow';
    elements[1].style.left = '16.665%';
    $(this).append(elements[1]);

    elements[2].style.backgroundColor = 'green';
    elements[2].style.left = '50%';
    $(this).append(elements[2]);

    elements[3].style.backgroundColor = 'blue';
    elements[3].style.left = '83.33%';
    $(this).append(elements[3]);

    // Left and right arrow container
    var arrowContainer = document.createElement('div');
    arrowContainer.classList.add('arrowContainer');

    var leftControl = document.createElement('a');
    leftControl.classList.add('leftControl');
    leftControl.href = '#';


    var leftSymbol = document.createElement('i');
    leftSymbol.classList.add('arrow');
    leftSymbol.classList.add('left');
    leftControl.appendChild(leftSymbol);

    arrowContainer.appendChild(leftControl);

    var rightControl = document.createElement('a');
    rightControl.classList.add('rightControl');
    rightControl.href = '#';


    var rightSymbol = document.createElement('i');
    rightSymbol.classList.add('arrow');
    rightSymbol.classList.add('right');
    rightControl.appendChild(rightSymbol);

    arrowContainer.appendChild(rightControl);


    

    // Using this and the on ready function below feels awfully wrong
    // However, I struggled to get the ScrollerElements to sit just outside of each side of the screen
    // and not have them absolutely positioned, and if absolutely positioned, they won't cause their
    // parent to grow. Worth fixing?
    var image = $('.scrollerElement');
    
    $(window).resize(function() {
        $('.scroller').css('height', image.css('width'));
        $('.scrollerOverlay').css('height', image.css('width'));
    });

    $(document).ready(function() {
        // This should be making the scroller the same height as the first scroller element
        // You should actually define this yourself, and just make it a square. So base it on the width of
        // each scroller element so they are the same? Giving you squares?
        $('.scroller').css('height', image.css('width'));
        $('.scrollerOverlay').css('height', image.css('width'));
    });
 
    $(this).append(arrowContainer);

    var duration = 1000;


    $('.leftControl').click(function() {
        event.preventDefault();

        
        for(var i = 0; i < elements.length; i++) {
            switch(elements[i].style.left) {
                case '-16.665%':
                    $(elements[i]).animate({
                        left: '-33.33%'
                    }, duration / 2, 'linear', function() {
                        // why can't I access elements[i].style.left in here to set it?
                        this.style.left = '100%';
                        
                        $(this).animate({
                            left: '83.33%'
                        }, duration / 2, 'linear');
                    });
                    break;
                case '16.665%':
                    $(elements[i]).animate({
                        left: '-16.665%'
                    }, duration, 'linear');
                    break;
                case '50%':
                    $(elements[i]).animate({
                        left: '16.665%'
                    }, duration, 'linear');
                    break;
                case '83.33%':
                    $(elements[i]).animate({
                        left: '50%'
                    }, duration, 'linear');
                    break;
            }
        }
    });

    $('.rightControl').click(function(event) {
        event.preventDefault();
        for(var i = 0; i < elements.length; i++) {
            switch(elements[i].style.left) {
                case '83.33%':
                    $(elements[i]).animate({
                        left: '100%'
                    }, duration / 2, 'linear', function() {
                        this.style.left = '-33%';
                        $(this).animate({
                            left: '-16.665%'
                        }, duration / 2, 'linear');
                    });
                    break;
                case '50%':
                    $(elements[i]).animate({
                        left: '83.33%'
                    }, duration, 'linear');
                    break;
                case '16.665%':
                    $(elements[i]).animate({
                        left: '50%'
                    }, duration, 'linear');
                    break;
                case '-16.665%':
                    $(elements[i]).animate({
                        left: '16.665%'
                    }, duration, 'linear');
                    break;
            }
        }
    });
};