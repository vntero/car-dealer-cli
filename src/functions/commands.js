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
      getTotalValueByDealership(dealership)
    })
}
