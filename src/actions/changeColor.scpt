tell application "Adobe Illustrator"
    set documentRef to document <%- JSON.stringify(document) %>
    set containerRef to documentRef
    set fillColor to {red:<%= color.r %>, green:<%= color.g %>, blue:<%= color.b %>}
    set the fill color of <%= type %> <%- JSON.stringify(name) %> of containerRef to fillColor
    set the stroke color of <%= type %> <%- JSON.stringify(name) %> of containerRef to fillColor
end tell
