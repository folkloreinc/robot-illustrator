tell application "Adobe Illustrator"
    set documentRef to document <%- JSON.stringify(document) %>
    set destination to documentRef
    set itemName to <%- JSON.stringify(name) %>
    set itemContents to <%- JSON.stringify(text) %>
    set itemPosition to {<%= x %>, <%= y %>}
    set itemProperties to {name:itemName, contents:itemContents, position:itemPosition}
    <% if(layer) { %>
    set layerRef to layer <%- JSON.stringify(layer) %> of documentRef
    set the current layer of documentRef to layerRef
    set destination to layerRef
    <% } %>
    make new text frame in destination with properties itemProperties
end tell
