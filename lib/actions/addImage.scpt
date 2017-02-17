tell application "Adobe Illustrator"
    set documentRef to document <%- JSON.stringify(document) %>
    set containerRef to documentRef
    set itemName to <%- JSON.stringify(name) %>
    set itemPosition to {<%= x %>, <%= -y %>}
    set filePath to <%- JSON.stringify(path) %>
    set imageWidth to <%= JSON.stringify(Math.round(width)) %>.0
    set imageHeight to <%= JSON.stringify(Math.round(height)) %>.0
    <% if(layer) { %>
    set layerRef to layer <%- JSON.stringify(layer) %> of documentRef
    set the current layer of documentRef to layerRef
    set containerRef to layerRef
    <% } %>
    set groupRef to make new group item in containerRef with properties {name:itemName}
    set imageRef to make new placed item in groupRef with properties {file path:filePath, position:itemPosition, width: imageWidth, height: imageHeight} without dialogs
    embed imageRef
    set selection of document <%- JSON.stringify(document) %> to 0
    set selection of documentRef to 0
end tell
