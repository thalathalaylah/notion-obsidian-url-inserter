export async function createObsidianFilesIfNotExist(filenames: string[], obsidianDirectoryPath: string) {
    const files = Deno.readDir(obsidianDirectoryPath)
    const existenceStatusArray = await Promise.all(filenames.map(v => asyncIncludes(files,  v + ".md")))
    const notExistFiles = filenames.filter((_, index) => !existenceStatusArray[index])
    if (notExistFiles.length === 0) {
        console.log("all files exist")
        return
    }
    console.log("create below files")
    console.log(notExistFiles)
    await Promise.all(notExistFiles.map(v => Deno.writeTextFile(obsidianDirectoryPath + "/" + v + ".md", "")))
}

async function asyncIncludes(asyncIterable, targetValue) {
    for await (const value of asyncIterable) {
        if (value.name === targetValue) {
            return true;
        }
    }
    return false;
}
