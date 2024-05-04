export function roundToNearestInteger(number) {
    if (number - Math.floor(number) < 0.5) {
        return Math.floor(number);
    } else {
        return Math.ceil(number);
    }
}
// export function nearestCoordinate(coordinate, axis, elementWidth, elementHeight, boundaryWidth, boundaryHeight) {
//     const spacing = 20;
//     let num = roundToNearestInteger(((coordinate - 10) / (axis === 'x' ? elementWidth + spacing : elementHeight + spacing)) + 1);
//     let adjustedCoordinate = ((num - 1) * (axis === 'x' ? elementWidth + spacing : elementHeight + spacing)) + 10;
//
//     if (axis === 'x') {
//         if (adjustedCoordinate + elementWidth > boundaryWidth) {
//             adjustedCoordinate = boundaryWidth - elementWidth - spacing;
//         }
//     } else {
//         if (adjustedCoordinate + elementHeight > boundaryHeight) {
//             adjustedCoordinate = boundaryHeight - elementHeight - spacing;
//         }
//     }
//
//     return adjustedCoordinate;
// }

export function nearestCoordinate(coordinate, axis, elementWidth, elementHeight, boundaryWidth, boundaryHeight, existingItems) {
    const spacing = 20;
    let num = roundToNearestInteger(((coordinate - 10) / (axis === 'x' ? elementWidth + spacing : elementHeight + spacing)) + 1);
    let adjustedCoordinate = ((num - 1) * (axis === 'x' ? elementWidth + spacing : elementHeight + spacing)) + 10;

    if (axis === 'x') {
        if (adjustedCoordinate + elementWidth > boundaryWidth) {
            adjustedCoordinate = boundaryWidth - elementWidth - spacing;
        }
    } else {
        if (adjustedCoordinate + elementHeight > boundaryHeight) {
            adjustedCoordinate = boundaryHeight - elementHeight - spacing;
        }
    }

    // Check if existingItems is an array
    if (!Array.isArray(existingItems)) {
        existingItems = [];
    }

    // Check if the adjusted coordinate overlaps with any existing items
    for (const item of existingItems) {
        if (axis === 'x' && item.left === adjustedCoordinate) {
            // Adjust the coordinate if it overlaps with an existing item's left position
            adjustedCoordinate += elementWidth + spacing;
        } else if (axis === 'y' && item.top === adjustedCoordinate) {
            // Adjust the coordinate if it overlaps with an existing item's top position
            adjustedCoordinate += elementHeight + spacing;
        }
    }

    return adjustedCoordinate;
}


export function addNewItem(array, newItem, boundaryWidth, boundaryHeight) {
    const maxTop = Math.max(...array.map(item => item.top));
    const maxLeft = Math.max(...array.map(item => item.left));

    const adjustedTop = nearestCoordinate(maxTop +70, 'y', newItem.height, newItem.width, boundaryWidth, boundaryHeight);
    const adjustedLeft = nearestCoordinate(maxLeft, 'x', newItem.width, newItem.height, boundaryWidth, boundaryHeight);

    const newItemWithCoordinates = {
        ...newItem,
        top: adjustedTop,
        left: adjustedLeft
    };

    array.push(newItemWithCoordinates);

    return array;
}




export function hasSamePosition(items,preItems) {
    const positions = new Set();
    for (const item of items) {
        const positionKey = `${item.top},${item.left}`;
        if (positions.has(positionKey)) {
            console.log('items,preItems',{items,preItems})
            return true;
        }
        positions.add(positionKey);
    }
    return false;
}
