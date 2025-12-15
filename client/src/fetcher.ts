export default function fetcher(url: string, accessToken: string | null) : Promise<any> {
    const headers : Record<string, string> = {};
    if (accessToken) {
        headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return fetch(url, {
        headers
    }).then(res => {
        return res.json();
    })
    .catch(err => {
        console.error('Problem with the fetcher', err);
        throw err;
    });
}