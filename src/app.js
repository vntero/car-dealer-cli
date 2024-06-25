import { Command } from 'commander'
import path from 'path'
import csv from 'csv-parser'
import fs from 'fs'
import { cars } from './usecases.js'

const query = new Command()

// READ THE CSV FILE
const readData = async (filePath) => {
  return new Promise((resolve, reject) => {
    const stream = fs
      .createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        cars.push(data)
      })
      .on('end', () => resolve(cars))
      .on('error', (err) => reject(err))
  })
}

const main = async () => {
  const data = path.resolve('./src/data/cars.csv')
  try {
    await readData(data)
    setupCommands()
    query.parse(process.argv)
  } catch (err) {
    console.error('Failed to load CSV file', err)
  }
}

main()
