import Lowdb, { AdapterAsync } from 'lowdb'
import path from 'path'
import FileAsync from 'lowdb/adapters/FileAsync'

interface IDB {
    path: string
    adapter: AdapterAsync
}

class DB implements IDB {
    path: string
    adapter: AdapterAsync
    constructor(path: string) {
        this.path = path
        this.adapter = new FileAsync(path)
    }
    public async connect() {
        return Lowdb(this.adapter)
    }
}
const DB_PATH = './src/db/db.json'
const db = new DB(path.join(process.cwd(), DB_PATH)).connect()

export { db }