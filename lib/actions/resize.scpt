tell application "Adobe Illustrator"
    set itemType to <%= type %>
    set itemName to <%- JSON.stringify(name) %>
    set documentRef to document <%- JSON.stringify(document) %>
    set container to documentRef
    set newSize to {<%= width %>, <%= height %>}
    <% if(layer) { %>
    set layerRef to layer <%- JSON.stringify(layer) %> of documentRef
    set the current layer of documentRef to layerRef
    set container to layerRef
    <% } %>
    set the size of itemType itemName of container to newSize
end tell
