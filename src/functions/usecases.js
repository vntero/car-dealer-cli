import { cars } from '../data/loadData.js'
import { numberValidation, stringValidation } from './validations.js'

const processCarsByBrand = (brand, actionType) => {
  if (!stringValidation(brand)) {
    return console.error('Input must be a non-empty string.')
  }

  brand = brand.trim().toUpperCase()
  const filteredCarsByBrand = cars.filter((car) => car.Car === brand)
  const uniqueBrands = [...new Set(cars.map((car) => car.Car))]

  if (filteredCarsByBrand.length === 0) {
    return 0
  } else {
    if (actionType === 'counted') {
      return filteredCarsByBrand.length
    } else if (actionType === 'listed') {
      // return JSON.stringify(filteredCarsByBrand, null, 2)
      return filteredCarsByBrand
    }
  }
}

export const countCarsByBrand = (brand) => {
  return processCarsByBrand(brand, 'counted')
}

export const listCarsByBrand = (brand) => {
  return processCarsByBrand(brand, 'listed')
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

  return filteredCarsByMileageRange.length === 0
    ? 0
    : filteredCarsByMileageRange
}

export const getTotalValueByDealership = (dealership) => {
  if (!stringValidation(dealership)) {
    return console.error('Input must be a non-empty string.')
  }
  const filteredCarsByDealership = cars.filter(
    (car) => car.Dealership === dealership,
  )
  const uniqueDealerships = [...new Set(cars.map((car) => car.Dealership))]
  const totalValue = filteredCarsByDealership.reduce(
    (sum, car) => sum + parseFloat(car.Price),
    0,
  )
  return filteredCarsByDealership.length === 0 ? 0 : totalValue
}
