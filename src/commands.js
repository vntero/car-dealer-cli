import { Command } from 'commander'
import {
  countCarsByBrand,
  listCarsByBrand,
  listCarsByMileageRange,
  getTotalValueByDealership,
} from './usecases.js'

export const query = new Command()

export const setupCommands = () => {
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
    .description(
      'Gets the total value of cars that exist in a given dealership',
    )
    .action((dealership) => {
      getTotalValueByDealership(dealership)
    })
}
