import { cars } from '../data/loadData.js'
import { numberValidation, stringValidation } from './validation.js'

const processCarsByBrand = (brand, actionType) => {
  if (!stringValidation(brand)) {
    return console.error('Input must be a non-empty string.')
  }

  brand = brand.trim().toUpperCase()
  const filteredCarsByBrand = cars.filter((car) => car.Car === brand)
  const uniqueBrands = [...new Set(cars.map((car) => car.Car))]

  if (filteredCarsByBrand.length === 0) {
    console.log(
      `Currently there are no ${brand} cars to be ${actionType}. Here's a list of available brands: ${uniqueBrands}.`,
    )
  } else {
    if (actionType === 'counted') {
      console.log(
        `There is a total of ${filteredCarsByBrand.length} ${brand} cars.`,
      )
    } else if (actionType === 'listed') {
      console.log(
        `There is a total of ${filteredCarsByBrand.length} ${brand} cars. Find them listed below: ${JSON.stringify(filteredCarsByBrand, null, 2)}`,
      )
    }
  }
}

export const countCarsByBrand = (brand) => {
  processCarsByBrand(brand, 'counted')
}

export const listCarsByBrand = (brand) => {
  processCarsByBrand(brand, 'listed')
}

export const listCarsByMileageRange = (minMileage, maxMileage) => {
  if (!numberValidation(minMileage) || !numberValidation(maxMileage)) {
    return console.error(
      'Both minMileage and maxMileage must be valid numbers.',
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

export const getTotalValueByDealership = (dealership) => {
  const filteredCars = cars.filter((car) => car.Dealership === dealership)
  const uniqueDealerships = [...new Set(cars.map((car) => car.Dealership))]
  const totalValue = filteredCars.reduce(
    (sum, car) => sum + parseFloat(car.Price),
    0,
  )
  filteredCars.length === 0
    ? console.log(
        `Currently there is no "${dealership}" dealership in our records. Here's a list of available dealerships: ${uniqueDealerships}. Also, make sure you add quotation marks for searching dealerships with more than one word.`,
      )
    : console.log(
        `The total value of cars in the "${dealership}" dealership is: €${totalValue}`,
      )
}
