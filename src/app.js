import path from 'path'
import { loadData } from './data/loadData.js'
import { setupCommands, cli } from './functions/commands.js'

const main = async () => {
  const data = path.resolve('./src/data/cars.csv')
  try {
    await loadData(data)
    setupCommands()
    cli.parse(process.argv)
  } catch (err) {
    console.error('Failed to load CSV file', err)
  }
}

main()
