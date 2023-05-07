import { config } from "https://deno.land/x/dotenv/mod.ts";
import {getRowByQuery} from "./methods/query_database.ts";
import {createObsidianUrl} from "./methods/obsidian_url.ts";
import {updatePage} from "./methods/update_page.ts";
import {createObsidianFilesIfNotExist} from "./methods/create_files_if_not_exist.ts";

const conf = config()

// https://www.notion.so/ja-jp/help/create-integrations-with-the-notion-api
// インテグレーションを作成してtokenを取得する
// https://zenn.dev/kou_pg_0131/articles/notion-api-usage
// 作成したインテグレーションでdatabaseにアクセスするには対象のdatabaseをインテグレーションに公開する必要がある

const token = conf["NOTION_TOKEN"]
const databaseId = conf["DATABASE_ID"]
const port = Number(conf["PORT"])
const filenameColumn = conf["FILENAME_COLUMN"]
const updateColumnName = conf["UPDATE_COLUMN"]
const obsidianDirectory = conf["OBSIDIAN_DIRECTORY"]
const obsidianPath = conf["OBSIDIAN_PATH"]

const res = await getRowByQuery(
    token,
    databaseId,
    // https://developers.notion.com/reference/post-database-query-filter#rich-text
    // updateColumnNameはurlを入れるカラムの名前
    // ドキュメントにはurlカラムはサポートしないと書いてあるが、rich_textのis_empty判定で空の判定ができる
    {
        filter: {
            property: updateColumnName,
            "rich_text": {
                "is_empty": true
            }
        }
    }
)
// filenameColumnはnotionの左端のカラムの名前であることを期待している
console.log(res.results.map(v => v.properties[filenameColumn]))
const filenames = res.results.map(v => v.properties[filenameColumn].title[0].plain_text)

await createObsidianFilesIfNotExist(filenames, obsidianPath + obsidianDirectory)

const urls = createObsidianUrl(filenames, port, obsidianDirectory)
res.results.map((v, i) => updatePage(token, updateColumnName,  v.id, urls[i]))
