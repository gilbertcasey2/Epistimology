/** Categories */

export async function getCategories() {
    const response = await fetch('https://localhost:7115/api/categories').catch((e) => {
        console.log("Request for categories returned an error." + e)
        return null;
    });
    const categories = await response.json();
    return categories;
}

export async function addCategory(data) {
    const response = await fetch('https://localhost:7115/api/addcategory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    return await response.json();
}

export async function deleteCategory(id) {
    const response = await fetch('https://localhost:7115/api/deletecategory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(id)
    })
    return await response.json();
}

export async function editCategory(data) {
    const response = await fetch('https://localhost:7115/api/editcategory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    return await response.json();
}


/** Columns */

export async function getColumns() {
    const response = await fetch('https://localhost:7115/api/columns').catch((e) => {
        console.log("Request for columns returned an error " + e);
    });
    if(response.status !== 200) {
        console.log("Error getting columns. Status: " + response.status)
        return null;
    } else {
        const columns = await response.json();
        return columns;
    }
}
export async function addColumn(data) {
    const response = await fetch('https://localhost:7115/api/addcolumn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    return await response.json();
}

export async function deleteColumn(id) {
    const response = await fetch('https://localhost:7115/api/deletecolumn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(id)
    })
    return await response.json();
}

export async function editColumn(data) {
    const response = await fetch('https://localhost:7115/api/editcolumn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    return await response.json();
}

/** Tags */

export async function getTags() {
    const response = await fetch('https://localhost:7115/api/tags').catch((e) => {
        console.log("Request for columns returned an error " + e);
    });
    if(response.status !== 200) {
        console.log("Error getting tags. Status: " + response.status + " Response: " + JSON.stringify(response))
        return null;
    } else {
        const tags = await response.json();
        return tags;
    }
}

export async function addTag(data) {
    const response = await fetch('https://localhost:7115/api/addtag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    return await response.json();
}

export async function deleteTag(id) {
    const response = await fetch('https://localhost:7115/api/deletetag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(id)
    })
    return await response.json();
}

export async function editTag(data) {
    const response = await fetch('https://localhost:7115/api/edittag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    return await response.json();
}
