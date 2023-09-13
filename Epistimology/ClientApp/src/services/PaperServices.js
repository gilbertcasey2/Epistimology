export async function getPapers() {
    const response = await fetch('https://localhost:7115/api/papers').catch((e) => {
        console.log("Request for users returned an error " + e);
    });
    if(response.status !== 200) {
        console.log("Error getting papers. Status: " + response.status)
        return null;
    } else {
        const papers = await response.json();
        return papers;
    }
}

export async function addPaper(data) {
    console.log("paper in save: " + JSON.stringify(data))
    const response = await fetch('https://localhost:7115/api/addpaper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    return await response.json();
}

export async function savePaper(data) {
    const response = await fetch('https://localhost:7115/api/savepaper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    return await response.json();
}

