jQuery.fn.combo = function(initialPlaceholderText, items) {

    // Can't be sure of the classname so I've just left these
    // here for now...may change.
    // $(this).css('display', 'inline-block');
    $(this).css('position', 'relative');

    // Get a height of ten pixels
    var textHolder = document.createElement('div');
    textHolder.classList.add('dropdownTextHolder');

    // Allow styling of unselected item state
    textHolder.classList.add('unselected');

    textHolder.innerText = initialPlaceholderText;

    $(this).append(textHolder);

    // Create the arrow div for the drop down click aspect
    var dropDownButton = document.createElement('div');
    dropDownButton.classList.add('dropdownButton');

    var arrowIcon = document.createElement('i');
    arrowIcon.classList.add('arrow');
    arrowIcon.classList.add('down');
    dropDownButton.append(arrowIcon);
    $(this).append(dropDownButton);

    var dropDownContent = document.createElement('div');
    dropDownContent.classList.add('dropdownContent');

    for (var i = 0; i < items.length; i++) {
        var dropDownItem = document.createElement('a');

        dropDownItem.href = '#';
        dropDownItem.innerText = items[i];
        dropDownItem.classList.add('dropdownItem');

    
        $(dropDownItem).click(function(event) {
            event.preventDefault();
            textHolder.innerText = $(this).text();
            $(textHolder).css('color', 'black');
            $(dropDownContent).toggle();
        });


        dropDownContent.appendChild(dropDownItem);
    }

    


    $(this).append(dropDownContent);

    $(dropDownButton).click(function() {
        $(dropDownContent).toggle();
    });
};