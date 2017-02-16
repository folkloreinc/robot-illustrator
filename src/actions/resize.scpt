tell application "Adobe Illustrator"
    set the size of <%= type %> <%- JSON.stringify(name) %> of document <%- JSON.stringify(document) %> to {<%= width %>, <%= height %>}
end tell
