tell application "Adobe Illustrator"
    set the position of <%= type %> <%- JSON.stringify(name) %> of document 1 to {<%= x %>, <%= y %>}
end tell
