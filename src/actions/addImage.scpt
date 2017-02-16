tell application "Adobe Illustrator"
    set documentRef to document <%- JSON.stringify(document) %>
    set destination to documentRef
    set itemName to <%- JSON.stringify(name) %>
    set itemPosition to {<%= x %>, <%= y %>}
    set filePath to <%- JSON.stringify(path) %>
    set itemProperties to {name:itemName, file path:filePath, position:itemPosition}
    <% if(layer) { %>
    set layerRef to layer <%- JSON.stringify(layer) %> of documentRef
    set the current layer of documentRef to layerRef
    set destination to layerRef
    <% } %>
    set imageRef to make new placed item in destination with properties itemProperties
    embed imageRef
    set selection of documentRef to 0
end tell
