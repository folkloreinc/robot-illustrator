tell application "Adobe Illustrator"
    make new text frame in document <%- JSON.stringify(document) %> with properties {name:<%- JSON.stringify(name) %>, contents:<%- JSON.stringify(text) %>, position:{<%= x %>, <%= y %>}}
end tell
