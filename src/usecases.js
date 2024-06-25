export const cars = []

export const countCarsByBrand = (brand) => {
  const filteredCarsByBrand = cars.filter((car) => car.Car === brand)
  console.log(
    `For the brand ${brand}, the dealership has a total of ${filteredCarsByBrand.length} cars.`,
  )
}

export const listCarsByBrand = (brand) => {
  const filteredCarsByBrand = cars.filter((car) => car.Car === brand)

  filteredCarsByBrand.length === 0
    ? console.log(
        `For the brand ${brand}, the dealership has a total of ${filteredCarsByBrand.length} cars.`,
      )
    : console.log(
        `For the brand ${brand}, the dealership has a total of ${filteredCarsByBrand.length} cars. Find them listed below: ${JSON.stringify(filteredCarsByBrand, null, 2)}`,
      )
}

export const listCarsByMileageRange = (minMileage, maxMileage) => {
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

export const getTotalValueByDealership = (dealership) => {
  const filteredCars = cars.filter((car) => car.Dealership === dealership)
  const totalValue = filteredCars.reduce(
    (sum, car) => sum + parseFloat(car.Price),
    0,
  )
  console.log(
    `The total value of cars in the "${dealership}" dealership is: €${totalValue}`,
  )
}
