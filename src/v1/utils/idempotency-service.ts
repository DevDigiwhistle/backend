import { AppLogger } from '../../utils'
import * as sqlite3 from 'sqlite3'

interface IIdempotencyService {}

class IdempotencyService {
  private static instance: IIdempotencyService | null = null
  private readonly db: sqlite3.Database

  static getInstance() {
    if (IdempotencyService.instance === null) {
      IdempotencyService.instance = new IdempotencyService()
    }
    return IdempotencyService.instance
  }

  private constructor() {
    this.db = new sqlite3.Database('./database/idempotency.db')
    this.db.serialize(() => {
      this.db.run(
        'CREATE TABLE IF NOT EXISTS cache (id INTEGER PRIMARY KEY, key TEXT, response TEXT)'
      )
    })
    this.db.close()
  }

  async addIdempotency(key: string, response: string): Promise<void> {
    try {
      this.db.run(
        'INSERT INTO cache (key, response) VALUES (?, ?)',
        key,
        response
      )

      this.db.close()
    } catch (e) {
      AppLogger.getInstance().error(`Error: ${e} in Idempotency key: ${key}`)
    }
  }
}
