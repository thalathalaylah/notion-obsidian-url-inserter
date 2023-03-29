export async function updatePage(token: string, updateColumnName: string, pageId: string, url: string) {
    const path = pageId.replace(/-/g, "")
    const req = new Request(`https://api.notion.com/v1/pages/${path}`)
    const headers = {
        Authorization: `Bearer ${token}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json"
    }


    const update = {
        properties: {
            [updateColumnName]: {
                url: url
            }
        }
    }

    const res = await fetch(req, {
        headers,
        method: 'PATCH',
        body: JSON.stringify(update)
    }).then(res => res.json())
}
