tell application "Adobe Illustrator"
    set documentRef to document <%- JSON.stringify(document) %>
    set containerRef to documentRef
    <% if(layer) { %>
    set layerRef to layer <%- JSON.stringify(layer) %> of documentRef
    set the current layer of documentRef to layerRef
    set containerRef to layerRef
    <% } %>
    <% if(scale) { %>
    set startGeoBounds to geometric bounds of <%= type %> <%- JSON.stringify(name) %> of containerRef
	set {itemLeft, itemTop, itemRight, itemBottom} to startGeoBounds
	set itemWidth to itemRight - itemLeft
	set itemHeight to itemTop - itemBottom
    set newWidth to (itemWidth * <%= scale %>)
    set newHeight to (itemHeight * <%= scale %>)
    <% } else { %>
    set newWidth to <%= width %>
    set newHeight to <%= height %>
    <% } %>

    set width of <%= type %> <%- JSON.stringify(name) %> of containerRef to newWidth
    set height of <%= type %> <%- JSON.stringify(name) %> of containerRef to newHeight

end tell
