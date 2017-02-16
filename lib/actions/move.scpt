tell application "Adobe Illustrator"
    set the position of <%= type %> <%- JSON.stringify(name) %> of document <%- JSON.stringify(document) %> to {<%= x %>, <%= y %>}
    return "Bonjour"
end tell
