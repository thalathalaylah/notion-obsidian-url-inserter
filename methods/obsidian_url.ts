export function createObsidianUrl(names: string[], port: string, obsidianDirectory: string) {
    return names.map(v => {
        return `http://localhost:${port}${obsidianDirectory}/` + encodeURI(v)
    })
}
