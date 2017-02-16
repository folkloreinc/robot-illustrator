tell application "Adobe Illustrator"
    set itemPosition to {<%= x %>, <%= y %>}
    make new placed item in document <%- JSON.stringify(document) %> with properties {name:<%- JSON.stringify(name) %>, file path:<%- JSON.stringify(path) %>, position:itemPosition}
end tell
