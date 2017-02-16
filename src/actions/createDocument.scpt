tell application "Adobe Illustrator"
    set documentColorSpace to CMYK
    set documentWidth to <%= width %>
    set documentHeight to <%= height %>
    set documentOrigin to {0, documentHeight}
    set documentProperties to {color space:documentColorSpace, width:documentWidth, height:documentOrigin, ruler origin: documentOrigin}
    set newDocument to make new document with properties documentProperties
end tell
