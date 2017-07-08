var init;
(function() {
    listItems = [
        'Apples',
        'Bananas',
        'Strawberries',
        'Raspberries',
        'Orchids',
        'Firewood',
        'Junk TV Shows',
        'Albert Einstein',
        'Pool Party',
        'Objective-C',
        'What are you doing here?',
        'Kid 4',
        'Galileo',
        'Luna',
        'etc.'
    ];
    function updateRow(e, i) {
        e.setAttribute('data-id', i);
        e.innerHTML = listItems[i];
        return e;
    }
    function row(i) {
        var div = document.createElement('div');
        div.setAttribute('class', 'row');
        return updateRow(div, i);
    }
    function getUnusedRow() {
        var div;
        if (unusedElements.length) {
            div = unusedElements.pop();
        } else {
            div = document.createElement('div');
            div.setAttribute('class', 'row');
        }
        return div;
    }

    var margin = 30; // px
    var unusedElements = [];

    function onContainerScroll(event) {
        var content = event.target;
        var rect = content.getBoundingClientRect();

        var topmost = null;
        var bottommost = null;
        children = Array.prototype.slice.call(content.children);

        children.forEach(function(child) {
            var n = parseInt(child.getAttribute('data-id'), 10);
            var c = child.getBoundingClientRect();

            // child's bottom edge now appears at top
            if (c.bottom >= rect.top - margin) {
                if (topmost === null) {
                    topmost = n;
                }
            } else if (c.bottom < rect.top - margin) {
                // child is hidden above
                unusedElements.push(content.removeChild(child));
            }
            // child's top edge now disappears below bottom
            if (c.top > rect.bottom + margin) {
                unusedElements.push(content.removeChild(child));
            } else {
                bottommost = n;
            }
        });

        if (topmost !== null && topmost !== 0) {
            var div = getUnusedRow();
            updateRow(div, topmost - 1);
            content.insertBefore(div, content.children[0]);
        }
        if (bottommost !== null && bottommost !== listItems.length-1) {
            var bdiv = getUnusedRow();
            updateRow(bdiv, bottommost + 1);
            content.appendChild(bdiv);
        }
    }

    init = function() {
        var content = document.getElementById('content');
        var crect = content.getBoundingClientRect();
        content.onscroll = onContainerScroll;

        for (var i = 0; i < listItems.length; i++) {

            var d = row(i);
            content.appendChild(d);
        }
    };
})();
