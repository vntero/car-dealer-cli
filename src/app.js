import { Command } from 'commander'
import path from 'path'
import csv from 'csv-parser'
import fs from 'fs'
import * as csvFile from './data/cars.csv'

const query = new Command()

const cars = []

// send welcome message to user
console.log(
  'Hey there, stranger! I am here to help you find out more about our fleet. Write <help> to know all the commands available.',
)

// read the csv file
const readData = async (csvFile) => {
  return new Promise((resolve, reject) => {
    const stream = fs
      .createReadStream(csvFile)
      .pipe(csv())
      .on('data', (data) => cars.push(data))
      .on('end', () => resolve(cars))
      .on('error', (err) => reject(err))
  })
}

// execute commands
// ----- help
query
  .command('help')
  .description('Displays the available functions and what they do')
  .action(() => {
    query.outputHelp()
  })

// ----- number-of-cars-by-brand
query
  .command('get-cars-by-brand <brand>')
  .description('Gets the number of cars by brand')
  .action()

// ----- list-of-cars-by-brand
query.command().description().action()

// ----- list-of-cars-by-mileage-range
query.command().description().action()

// ----- total-value-by-dealership
// ---------- make sure that user knows which dealerships are there
query.command().description().action()
