tell application "Adobe Illustrator"
    set itemType to <%= type %>
    set itemName to <%- JSON.stringify(name) %>
    set documentRef to document <%- JSON.stringify(document) %>
    set container to documentRef
    set newPosition to {<%= x %>, <%= y %>}
    <% if(layer) { %>
    set layerRef to layer <%- JSON.stringify(layer) %> of documentRef
    set the current layer of documentRef to layerRef
    set container to layerRef
    <% } %>
    set the position of itemType itemName of container to newPosition
end tell
