export async function getRowByQuery(token: string, databaseId: string, query: Object) {
    const req = new Request(`https://api.notion.com/v1/databases/${databaseId}/query`)
    const headers = {
        Authorization: `Bearer ${token}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json"
    }

    return await fetch(req, {
        headers,
        method: 'POST',
        body: JSON.stringify(query)
    }).then(res => res.json())
}
