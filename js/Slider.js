jQuery.fn.slider = function(prefix, min, max, change) {

    // Create main container for control
    // In this way the user of this control can specify the length of
    // this control by changing the width of the parent element
    var container = document.createElement('div');
    container.classList.add('sliderControl');
    var self = $(this);
    // To the container we add a sliding element

    var slidingElement = new Draggable({
        yPos: -1,
        xPos: 0,
        width: '40px',
        height: 'calc(100% + 2px)',
        color: 'rgb(244, 244, 244)',
        xAxisOnly: true,
        stayWithinBounds: true,
        onDrag: function(x, y) {
            
            // Get hold of the element you're dragging's left
            var left = $(slidingElement.element).position().left;

            // Get hold of the width of the container minus the width of the element
            var areaToPlayWith = parseInt($(container).width() - $(slidingElement.element).width());

            // Find the percentage of how much you've dragged through
            var percentage = left / areaToPlayWith * 100;
           // console.log(percentage);

            // We now have a percentage! How the hell do we use it?!

            // First find the difference between our first and second number.
            var difference = max - min;

            // Then we find out what value of that difference is based on the percentage we have
            var value = difference / 100 * percentage;
            
            // It seems to roll over sometimes so cap it at the max
            var total = (min + value > max ? max : min + value);

            // Now you need to get this printing on the element. Either to the right of it or to the left of it
            // where ever there is room.
            
            // If the value container exists, just set its text
            $('#val').text(prefix + parseInt(total));

        
            positionAndShowCurrentValue();
            
            // Now the text is sorted out, let's sort out setting the left side to a different colour to the right to show progress

            // Finally, append this to the container!
            if(!$('.progressSide').length > 0) {
                var progressSide = document.createElement('div');
                progressSide.classList.add('progressSide');
                container.appendChild(progressSide);
            
          
            }


            // You don't need to do all of this on drag
            // We want the left to always be the same as the container
            $('.progressSide').css('left', 0 - 1);

            // We want the top to match as well
            $('.progressSide').css('top', $(slidingElement.element).parent().position().top - 1);

            // And the height
            $('.progressSide').css('height', $(slidingElement.element).parent().height() + 2);

            // Width needs calculating
            $('.progressSide').css('width', $(slidingElement.element).position().left + 1);
        }

       


    });
    console.log('attaching');
    // Apparently you can't attach a resize event to a DOM element, so here I'll attach one to the document instead
    $(window).resize(function() {
    //     console.log('resizing');

    //     // The width of the main containing div changes automatically so this is something that doesn't need adjusting

    //     // Ideally, we'll be able to take the current percentage, and use that to set the position of the sliding element
    //     console.log('min is ', min);
    //     console.log('max is ', max);

    //     // This works so all we really need is a %
    //     //$('.slidingElement').css('left', 'calc(50% - ' + $('.slidingElement').width() / 2 + 'px)' );



    //     // Then grab the current value


    //     // Find out, as a percentage, how much of the containing div that value represents


    //     // Get hold of the element you're dragging's left
         var left = $(slidingElement.element).position().left;
    //     console.log('left', left)

    //     // Get hold of the width of the container minus the width of the element
         var areaToPlayWith = parseInt($(container).width() - $(slidingElement.element).width());
    //     console.log('area to play with', areaToPlayWith);
    //     // Find the percentage of how much you've dragged through
        
    
        // I think you need the old % not the new one!!! Don't calculate a new one,
        // thus, you might be able to get it based on the value??? Or if you have the
        // variable lying around, that would be even better.
         var percentage = parseInt(left / areaToPlayWith * 100); 

         console.log('percentage:', percentage);
    //    // $('.slidingElement').css('left', percentage + '%');

    //   // $('.slidingElement').css('left', 'calc(' + percentage + '% - ' + $('.slidingElement').width() / 2 + 'px)' );

    //     console.log('container width: ', $(container).width());

    //   // Find that percentage of the parent's width
    //   //var location = $('.sliderControl').width() / 100 * percentage;
    //   // console.log('location ', location)
    //   $('.slidingElement').css('left', percentage + '%');




    });

    // Get an arrow
    var arrow = document.createElement('i');
    arrow.classList.add('arrow');
    arrow.classList.add('right');
    

    var arrowContainer = document.createElement('div');
    arrowContainer.classList.add('arrowContainer');
    arrowContainer.classList.add('vertical-center');

    arrowContainer.appendChild(arrow);
    slidingElement.element.appendChild(arrowContainer);



    function positionAndShowCurrentValue() {
        // Now we have the value in the dom but hidden we can grab its width to decide where to put it.
        var spaceOnTheRight = $(slidingElement.element).parent().width() - ($(slidingElement.element).position().left + $(slidingElement.element).width());
        var spaceOnTheLeft = $(slidingElement.element).position().left;

        if (spaceOnTheLeft > $('#val').width()) {
            $('#val').css('color', 'white');
            $('#val').css('left', $(slidingElement.element).position().left - ($('#val').width() + 5));
            $('#val').show();
        } else {
            if (spaceOnTheRight > $('#val').width() + 5) {
                $('#val').hide();
                // Put it on the right
                $('#val').css('color', 'black');
                $('#val').css('left', $(slidingElement.element).position().left + $(slidingElement.element).width() + 5);
                $('#val').show();    
            }
        }
    }












    slidingElement.element.classList.add('slidingElement');
    container.appendChild(slidingElement.element);


    $(this).append(container);

    // Add the value container
    var valueContainer = document.createElement('div');
    valueContainer.id = 'val';
    valueContainer.classList.add('valueContainer');
    valueContainer.classList.add('vertical-center');

    // Give some initial text 
    valueContainer.innerText = prefix + parseInt(min);
            
    container.append(valueContainer);
    positionAndShowCurrentValue();
};