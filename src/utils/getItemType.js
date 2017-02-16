const getItemType = (type) => {
    let itemType = 'item';
    if (type === 'text') {
        itemType = 'text frame';
    } else if (type === 'image') {
        itemType = 'placed item';
    } else if (type === 'shape') {
        itemType = 'placed item';
    }
    return itemType;
};

export default getItemType;
