export function createObsidianUrl(names: string[], port: string) {
    return names.map(v => {
        return `http://localhost:${port}/common/` + encodeURI(v)
    })
}
