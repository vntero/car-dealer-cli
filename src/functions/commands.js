#!/usr/bin/env node

import { Command } from 'commander'
import {
  countCarsByBrand,
  listCarsByBrand,
  listCarsByMileageRange,
  getTotalValueByDealership,
} from './usecases.js'

export const cli = new Command()

export const setupCommands = () => {
  cli.on('--help', () => {
    console.log('')
    console.log('Examples:')
    console.log('  $ node src/app.js count-cars-by-brand Audi')
    console.log('  $ node src/app.js list-cars-by-brand BMW')
    console.log('  $ node src/app.js list-cars-by-mileage-range 10000 50000')
    console.log('  $ node src/app.js total-value-by-dealership "My Dealership"')
  })

  cli
    .command('count-cars-by-brand <brand>')
    .description('Counts the number of cars by brand (parameter: brand)')
    .action((brand) => {
      const response = countCarsByBrand(brand)
      response.count === 0
        ? console.log(
            `Currently there are no ${brand.trim().toUpperCase()} cars to be counted. Here's a list of available brands: ${response.availableBrands}.`,
          )
        : console.log(
            `There is a total of ${response} ${brand.trim().toUpperCase()} cars.`,
          )
    })

  cli
    .command('list-cars-by-brand <brand>')
    .description(
      'Gets the number of cars and the list of cars by brand (parameter: brand)',
    )
    .action((brand) => {
      const response = listCarsByBrand(brand)
      response.count === 0
        ? console.log(
            `Currently there are no ${brand.trim().toUpperCase()} cars to be listed. Here's a list of available brands: ${response.availableBrands}.`,
          )
        : console.log(
            `There is a total of ${response.length} ${brand.trim().toUpperCase()} cars. Find them listed below: ${JSON.stringify(response, null, 2)}`,
          )
    })

  cli
    .command('list-cars-by-mileage-range <minMileage> <maxMileage>')
    .description(
      'Counts the number of cars and lists them by mileage range (parameter: maxMileage, minMileage)',
    )
    .action((minMileage, maxMileage) => {
      const response = listCarsByMileageRange(minMileage, maxMileage)
      response === 0
        ? console.log(
            `The dealership has a total of ${response} cars with mileage between ${minMileage} and ${maxMileage}.`,
          )
        : console.log(
            `The dealership has a total of ${response.length} cars with mileage between ${minMileage} and ${maxMileage}. Find them listed below: ${JSON.stringify(response, null, 2)}`,
          )
    })

  cli
    .command('total-value-by-dealership <dealership>')
    .description(
      'Gets the total value of cars that exist in a given dealership',
    )
    .action((dealership) => {
      const response = getTotalValueByDealership(dealership)
      response.count === 0
        ? console.log(
            `Currently there is no "${dealership}" dealership in our records. Here's a list of available dealerships: ${response.availableDealerships}. Also, make sure you add quotation marks for searching dealerships with more than one word.`,
          )
        : console.log(
            `The total value of cars in the "${dealership}" dealership is: €${response}`,
          )
    })
}
