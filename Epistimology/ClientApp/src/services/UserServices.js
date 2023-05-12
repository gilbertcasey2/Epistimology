
export async function getAllUsers() {
    const response = await fetch('https://localhost:7115/api/users').catch((e) => {
        console.log("Request for users returned an error " + e);
        return null;
    });
    const userdata = await response.json();
    console.log("we get response")
    console.log("Userdata: " + userdata);
return userdata;
}

export async function createUser(data) {
    const infoToSend = JSON.stringify(data);
    const response = await fetch('https://localhost:7115/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: infoToSend
    })
    return await response.json();
}
