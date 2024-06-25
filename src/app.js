import { Command } from 'commander'
import path from 'path'
import csv from 'csv-parser'
import fs from 'fs'

const query = new Command()

const cars = []

// USECASES
const getCarsByBrand = (brand) => {
  const filteredCarsByBrand = cars.filter((car) => car.brand === brand)
  console.log(
    `For the brand you entered, the dealership has a total of ${filteredCarsByBrand.length} cars`,
  )
}

const listCarsByBrand = (brand) => {
  const filteredCarsByBrand = cars.filter((car) => car.brand === brand)
  console.log(
    `For the brand you entered, the dealership has a total of ${filteredCarsByBrand.length} cars`,
  )
  console.log(
    `Here's a list of the ${brand} cars we have: `,
    filteredCarsByBrand,
  )
}

const listCarsByMileageRange = (minMileage, maxMileage) => {
  const filteredCars = cars.filter(
    (car) => car.mileage >= minMileage && car.mileage <= maxMileage,
  )
  console.log(
    `Number of cars with mileage between ${minMileage} and ${maxMileage}: ${filteredCars.length}`,
  )
  console.log(`Here's a list of the ${brand} cars we have: `)
}

const getTotalValueByDealership = (dealership) => {
  const filteredCars = cars.filter((car) => car.dealership === dealership)
  const totalValue = filteredCars.reduce(
    (sum, car) => sum + parseFloat(car.price),
    0,
  )
  console.log(
    `Total value of cars in the "${dealership}" dealership is: €${totalValue}`,
  )
}

// READ THE CSV FILE
const readData = async (filePath) => {
  return new Promise((resolve, reject) => {
    const stream = fs
      .createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => cars.push(data))
      .on('end', () => resolve(cars))
      .on('error', (err) => reject(err))
  })
}

// PROMPTS
query
  .command('get-cars-by-brand <brand>')
  .description('Gets the number of cars by brand (parameter: brand)')
  .action((brand) => {
    getCarsByBrand(brand)
  })

query
  .command('list-cars-by-brand <brand>')
  .description(
    'Get the number of cars and the list of cars by brand (parameter: brand)',
  )
  .action((brand) => {
    listCarsByBrand(brand)
  })

query
  .command('list-cars-by-mileage-range <minMileage> <maxMileage>')
  .description(
    'Get the number of cars and the list by mileage range (parameter: maxMileage, minMileage)',
  )
  .action((minMileage, maxMileage) => {
    listCarsByMileageRange(Number(minMileage), Number(maxMileage))
  })

// ---------- make sure that user knows which dealerships are there
query
  .command('total-value-by-dealership <dealership>')
  .description('Get the total value of cars that exist in a given dealership')
  .action((dealership) => {
    getTotalValueByDealership(dealership)
  })

const temp = './data/cars.csv'
;(async () => {
  const filePath = path.resolve(
    '/Users/vntero/Desktop/github/car-dealer-cli/src/data/cars.csv',
  )
  try {
    await readData(filePath)
    query.parse(process.argv)
  } catch (err) {
    console.error('Failed to load CSV file', err)
  }
})()
