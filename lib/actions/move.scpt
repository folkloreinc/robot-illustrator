tell application "Adobe Illustrator"
    set documentRef to document <%- JSON.stringify(document) %>
    set containerRef to documentRef
    set newPosition to {<%= x %>, <%= -y %>}
    <% if(layer) { %>
    set layerRef to layer <%- JSON.stringify(layer) %> of documentRef
    set the current layer of documentRef to layerRef
    set containerRef to layerRef
    <% } %>

    <% if(type === 'path item') { %>
    set startGeoBounds to geometric bounds of <%= type %> <%- JSON.stringify(name) %> of containerRef
	set {itemLeft, itemTop, itemRight, itemBottom} to startGeoBounds
    set {positionX, positionY} to  newPosition
	tell containerRef to translate <%= type %> <%- JSON.stringify(name) %> delta x (positionX - itemLeft) delta y (positionY - itemTop)
    <% } else { %>
    set the position of <%= type %> <%- JSON.stringify(name) %> of containerRef to newPosition
    <% } %>
end tell
