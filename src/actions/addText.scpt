tell application "Adobe Illustrator"
    make new text frame in document 1 with properties {name:"text 1", contents:<%- JSON.stringify(text) %>, position:{<%= x %>, <%= y %>}}
end tell
