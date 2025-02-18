import * as SQLite from 'expo-sqlite'
import { Product } from './interfaces/product'

export const DATABASE_NAME = 'little_lemon'

export async function initDatabase() {
  const database = await SQLite.openDatabaseAsync(DATABASE_NAME)
  // Create table **products**
  // `execAsync()` is useful for bulk queries when you want to execute altogether.
  await database.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY NOT NULL,
      name TEXT,
      price REAL,
      description TEXT,
      image TEXT,
      category TEXT
    );
  `)

  return database
}

export const dbPromise = initDatabase()

async function getProducts(): Promise<Product[]> {
  const database = await dbPromise
  // `getAllAsync()` is useful when you want to get all results as an array of objects.
  const products = await database.getAllAsync('SELECT * FROM products')
  return products as Product[]
}

async function saveProducts(items: Product[]) {
  const database = await dbPromise
  /**
   * Note: Remember to call finalizeAsync() or finalizeSync() method
   * to release the prepared statement after you finish using the statement.
   * try-finally block is recommended to ensure the prepared statement is finalized.
   */
  const statement = await database.prepareAsync(
    `INSERT INTO products (name, price, description, image, category) VALUES ($name, $price, $description, $image, $category)`,
  )
  try {
    //
    for (const item of items) {
      await statement.executeAsync(
        item.name,
        item.price,
        item.description,
        item.image,
        item.category,
      )
    }
  } catch (err) {
    console.log('[saveProducts] Error', err)
  } finally {
    statement.finalizeAsync()
  }
}

async function filterByQueryAndCategories(
  query: string,
  activeCategories: string[],
): Promise<Product[]> {
  const database = await dbPromise

  console.log('Filtering with:', { query, activeCategories })

  // If no query and no categories, return all products
  if (!query.trim() && activeCategories.length === 0) {
    return await database.getAllAsync('SELECT * FROM products')
  }

  // Prepare base query and parameters
  let sqlQuery = 'SELECT * FROM products WHERE 1=1'
  const params: any[] = []

  // Handle search query
  if (query.trim()) {
    sqlQuery +=
      ' AND (LOWER(name) LIKE LOWER(?) OR LOWER(description) LIKE LOWER(?))'
    params.push(`%${query}%`, `%${query}%`)
  }

  // Handle category filtering
  if (activeCategories.length > 0) {
    sqlQuery += ` AND LOWER(category) IN (${activeCategories
      .map(() => 'LOWER(?)')
      .join(',')})`
    params.push(...activeCategories)
  }

  console.log('Final SQL Query:', sqlQuery)
  console.log('Query Parameters:', params)

  // Execute the dynamic query
  const products = await database.getAllAsync(sqlQuery, ...params)

  console.log('Filtered Products Count:', products.length)
  return products as Product[]
}

export { getProducts, saveProducts, filterByQueryAndCategories }
