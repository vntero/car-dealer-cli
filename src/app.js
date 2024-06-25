import { Command } from 'commander'
import path from 'path'
import csv from 'csv-parser'
import fs from 'fs'

const query = new Command()

const cars = []

// USECASES
const countCarsByBrand = (brand) => {
  const filteredCarsByBrand = cars.filter((car) => car.Car === brand)
  console.log(
    `For the brand ${brand}, the dealership has a total of ${filteredCarsByBrand.length} cars.`,
  )
}

const listCarsByBrand = (brand) => {
  const filteredCarsByBrand = cars.filter((car) => car.Car === brand)

  filteredCarsByBrand.length === 0
    ? console.log(
        `For the brand ${brand}, the dealership has a total of ${filteredCarsByBrand.length} cars.`,
      )
    : console.log(
        `For the brand ${brand}, the dealership has a total of ${filteredCarsByBrand.length} cars. Find them listed below: ${JSON.stringify(filteredCarsByBrand, null, 2)}`,
      )
}

const listCarsByMileageRange = (minMileage, maxMileage) => {
  if (isNaN(minMileage) || isNaN(maxMileage)) {
    return console.error(
      'Error: Both minMileage and maxMileage must be valid numbers.',
    )
  }
  const filteredCarsByMileageRange = cars.filter(
    (car) => car.Mileage >= minMileage && car.Mileage <= maxMileage,
  )
  filteredCarsByMileageRange.length === 0
    ? console.log(
        `The dealership has a total of ${filteredCarsByMileageRange.length} cars with mileage between ${minMileage} and ${maxMileage}`,
      )
    : console.log(
        `The dealership has a total of ${filteredCarsByMileageRange.length} cars with mileage between ${minMileage} and ${maxMileage}. Find them listed below: ${JSON.stringify(filteredCarsByMileageRange, null, 2)}`,
      )
}

const getTotalValueByDealership = (dealership) => {
  const filteredCars = cars.filter((car) => car.Dealership === dealership)
  const totalValue = filteredCars.reduce(
    (sum, car) => sum + parseFloat(car.Price),
    0,
  )
  console.log(
    `The total value of cars in the "${dealership}" dealership is: €${totalValue}`,
  )
}

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
  .description('Gets the number of cars by brand (parameter: brand)')
  .action((brand) => {
    countCarsByBrand(brand)
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
    'Count the number of cars and the list them by mileage range (parameter: maxMileage, minMileage)',
  )
  .action((minMileage, maxMileage) => {
    listCarsByMileageRange(minMileage, maxMileage)
  })

query
  .command('total-value-by-dealership <dealership>')
  .description('Get the total value of cars that exist in a given dealership')
  .action((dealership) => {
    getTotalValueByDealership(dealership)
  })
;(async () => {
  const filePath = path.resolve('./src/data/cars.csv')
  try {
    await readData(filePath)
    query.parse(process.argv)
  } catch (err) {
    console.error('Failed to load CSV file', err)
  }
})()
