tell application "Adobe Illustrator"
    set documentRef to document <%- JSON.stringify(document) %>
    set destination to documentRef
    set itemName to <%- JSON.stringify(name) %>
    set itemBounds to {<%= x %>, <%= -y %>, <%= x + width %>, <%= -y - height %>}
    set docColorSpace to color space of current document
    set fillColor to {red:<%= color.r %>, green:<%= color.g %>, blue:<%= color.b %>}
    set itemProperties to {name:itemName, bounds:itemBounds, fill color:fillColor, stroke color:fillColor}
    <% if(layer) { %>
    set layerRef to layer <%- JSON.stringify(layer) %> of documentRef
    set the current layer of documentRef to layerRef
    set destination to layerRef
    <% } %>
    <% if(shape === 'ellipse') { %>
    make new ellipse at beginning of destination with properties itemProperties
    <% } else if(shape === 'rectangle') { %>
    make new rectangle at beginning of destination with properties itemProperties
    <% } %>
    set selection of document <%- JSON.stringify(document) %> to 0
    set selection of documentRef to 0
end tell
