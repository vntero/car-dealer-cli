import { Command } from 'commander'
import path from 'path'
import csv from 'csv-parser'
import fs from 'fs'
import {
  cars,
  countCarsByBrand,
  listCarsByBrand,
  listCarsByMileageRange,
  getTotalValueByDealership,
} from './usecases.js'

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

// PROMPTS
query
  .command('count-cars-by-brand <brand>')
  .description('Counts the number of cars by brand (parameter: brand)')
  .action((brand) => {
    countCarsByBrand(brand)
  })

query
  .command('list-cars-by-brand <brand>')
  .description(
    'Gets the number of cars and the list of cars by brand (parameter: brand)',
  )
  .action((brand) => {
    listCarsByBrand(brand)
  })

query
  .command('list-cars-by-mileage-range <minMileage> <maxMileage>')
  .description(
    'Counts the number of cars and lists them by mileage range (parameter: maxMileage, minMileage)',
  )
  .action((minMileage, maxMileage) => {
    listCarsByMileageRange(minMileage, maxMileage)
  })

query
  .command('total-value-by-dealership <dealership>')
  .description('Gets the total value of cars that exist in a given dealership')
  .action((dealership) => {
    getTotalValueByDealership(dealership)
  })

const main = async () => {
  const filePath = path.resolve('./src/data/cars.csv')
  try {
    await readData(filePath)
    query.parse(process.argv)
  } catch (err) {
    console.error('Failed to load CSV file', err)
  }
}

main()
