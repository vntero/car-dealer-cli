import path from 'path'
import csv from 'csv-parser'
import fs from 'fs'
import { cars } from './usecases.js'
import { setupCommands, cli } from './commands.js'

const readData = async (filePath) => {
  return new Promise((resolve, reject) => {
    const stream = fs
      .createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        cars.push(data)
      })
      .on('end', () => resolve(cars))
      .on('error', (err) => reject(`Error reading CSV file: ${err.message}`))
  })
}

const main = async () => {
  const data = path.resolve('./src/data/cars.csv')
  try {
    await readData(data)
    setupCommands()
    cli.parse(process.argv)
  } catch (err) {
    console.error('Failed to load CSV file', err)
  }
}

main()
