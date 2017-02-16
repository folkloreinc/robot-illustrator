tell application "Adobe Illustrator"
    set itemPosition to {<%= x %>, <%= y %>}
    set placedRef to make new placed item in document 1 with properties {file path:<%- JSON.stringify(path) %>, position:itemPosition}
end tell
