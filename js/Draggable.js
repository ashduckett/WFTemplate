var Draggable = function(options) {
    this.options = options;
    this.element = document.createElement('div');
    this.element.style.display = 'block';
    this.element.style.position = 'absolute';

    if (options && options.yPos) {
        this.element.style.top = options.yPos + 'px';    
    }

    if (options && options.xPos) {
        this.element.style.left = options.xPos + 'px';    
    }

    if (options && options.width) {
        this.element.style.width = options.width;    
    } else {
        this.element.style.width = '0px';
    }

    if (options && options.height) {
        this.element.style.height = options.height;    
    } else {
        this.element.style.height = '0px';
    }
    
    if (options && options.color) {
        this.element.style.backgroundColor = options.color;
    }

    this.clickX = 0;
    this.clickY = 0;
    this.beingDragged = false;
    this.homeX = this.element.style.left;
    this.homeY = this.element.style.top;

    this.returnHome = false;
    this.allowDrag = true;

    this.dragRegion = null;

    this.friends = [];

    this.element.addEventListener('mouseup', function() {

        this.beingDragged = false;
        if(this.returnHome == true) {            
            this.element.style.left = this.homeX + 'px';
            this.element.style.top = this.homeY + 'px';
        }
    }.bind(this, false));

    document.documentElement.addEventListener('mouseup', function() {
        if(!event) {
            event = window.event;
        }
        this.beingDragged = false;
        if(this.returnHome) {
            this.element.style.left = this.homeX;
            this.element.style.top = this.homeY;
        }
    }.bind(this, false));

    document.documentElement.addEventListener('mousemove', function(event) {
        if(!event) {
            event = window.event;
        }
        if (this.beingDragged) {
           

            // Code in here should probably be in a function as it's called on the element as well.
            // Obtain proposed top, bottom, left and right of element
            var containerWidth = $(this.element).parent().width();
            var containerHeight = $(this.element).parent().height();
            var proposedRight = event.pageX - this.clickX + $(this.element).width();
            var proposedLeft = event.pageX - this.clickX;
            var proposedTop = event.pageX - this.clickY;
            var proposedBottom = event.pageX - this.clickY + $(this.element).height();
 
            if (!options.yAxisOnly) {
        
                if (!options.stayWithinBounds) {
                    this.element.style.left = (event.pageX - this.clickX) + 'px';
                    console.log('reset 3')
                } else {
                    
                    if (proposedRight < containerWidth && proposedLeft > 0) {                 
                        this.element.style.left = (event.pageX - this.clickX) + 'px';
                        console.log('reset 1')
                    } else {
                        if(proposedRight >= containerWidth) {
                            this.element.style.left = containerWidth - $(this.element).width() + 'px';
                            console.log('reset')
                        }
    
                        if(proposedLeft <= 0) {

                            this.element.style.left = '0px';
                        }
                    }
                }
            }

            if (!options.xAxisOnly) {
                if (!options.stayWithinBounds) {
                    this.element.style.top = (event.pageY - this.clickY) + 'px';
                } else {
                    if (proposedBottom < containerHeight && proposedTop > 0) {                 
                        this.element.style.top = (event.pageY - this.clickY) + 'px';
                    } else {
                        if(proposedBottom >= containerHeight) {
                            this.element.style.top = containerHeight - $(this.element).height() + 'px';
                            
                        }
    
                        if(proposedTop <= 0) {
                            this.element.style.top = '0px';
                        }
                    }
                }
            }


            if (options.onDrag) {
                options.onDrag(event.clientX, event.clientY);
            }
        }
    }.bind(this, false));

    this.element.addEventListener('mousedown', function(event) {
        if(!event) {
            event = window.event;
        }

        this.clickX = event.pageX - $(this.element).position().left;
        this.clickY = event.pageY - $(this.element).position().top;

        if(this.allowDrag) {
            if(this.dragRegion) {
                if (this.clickX >= this.dragRegion.xPos && this.clickX <= this.dragRegion.xPos + this.dragRegion.width) {
                    if (this.clickY >= this.dragRegion.yPos && this.clickY <= this.dragRegion.yPos + this.dragRegion.height) {
                        this.beingDragged = true;
                    }
                }
            } else {
                this.beingDragged = true;
            }

            // Replicate this same event for friends of this object
            var evt = document.createEvent('MouseEvents');
            evt.initMouseEvent(event.type, event.bubbles, event.cancelable, event.view, event.detail,
                event.screenX, event.screenY, event.clientX, event.clientY,
                event.ctrlKey, event.altKey, event.shiftKey, event.metaKey,
                event.button, document.body.parentNode);
            
            // Iterate over friends and set off the same event
            for(friend of this.friends) {
                friend.element.dispatchEvent(evt);
            }
        
        
        }
        
        
    }.bind(this, false));

    this.element.addEventListener('mousemove', function(event) {

        if(!event) {
            event = window.event;
        }

        if (this.beingDragged) {
            // Obtain proposed top, bottom, left and right of element
            var containerWidth = $(this.element).parent().width();
            var containerHeight = $(this.element).parent().height();
            var proposedRight = event.pageX - this.clickX + $(this.element).width();
            var proposedLeft = event.pageX - this.clickX;
            var proposedTop = event.pageX - this.clickY;
            var proposedBottom = event.pageX - this.clickY + $(this.element).height();


            // Both x and y axis are false.
            // Since both are false, both will fire.
            // But will be contained within bounds!

            if (!options.yAxisOnly) {
                if (!options.stayWithinBounds) {
                    this.element.style.left = (event.pageX - this.clickX) + 'px';
                } else {
                    if (proposedRight < containerWidth && proposedLeft > 0) {                 
                        this.element.style.left = (event.pageX - this.clickX) + 'px';
                    } else {
                        if(proposedRight >= containerWidth) {
                            this.element.style.left = containerWidth - $(this.element).width() + 'px';
                        }
    
                        if(proposedLeft <= 0) {
                            this.element.style.left = '0px';
                        }
                    }
                }
            }

            if (!options.xAxisOnly) {
                if (!options.stayWithinBounds) {
                    this.element.style.top = (event.pageY - this.clickY) + 'px';
                } else {
                    if (proposedBottom < containerHeight && proposedTop > 0) {                 
                        this.element.style.top = (event.pageY - this.clickY) + 'px';
                    } else {
                        if(proposedBottom >= containerHeight) {
                            this.element.style.top = containerHeight - $(this.element).height() + 'px';
                            
                        }
    
                        if(proposedTop <= 0) {
                            this.element.style.top = '0px';
                        }
                    }
                }
            }
        }
    }.bind(this, false));
}

Draggable.prototype.addToParent = function(parent) {
    parent.appendChild(this.element);
};

Draggable.prototype.setDraggable = function(draggable) {
    this.allowDrag = draggable;
};

Draggable.prototype.addFriend = function(friend) {
    this.friends.push(friend);
}

Draggable.prototype.setHomeToMatchPos = function() {
    this.homeX = this.xPos;
    this.homeY = this.yPos;
};

Draggable.prototype.setTop = function(top) {
    this.element.style.top = top + 'px';
    this.yPos = top;
};

Draggable.prototype.setLeft = function(left) {
    this.element.style.left = left + 'px';
    this.xPos = left;
};

Draggable.prototype.getWidth = function() {
    return this.element.offsetWidth;
};

Draggable.prototype.setImage = function(path, x, y) {
    this.element.style.backgroundImage = 'url(' + path + ')';
    if(x && y) {
        this.element.style.backgroundPosition = x + 'px ' + y + 'px';
    }
}