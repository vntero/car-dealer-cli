// get the number of cars by brand (parameter: brand)
export const getCarsByBrand = (brand) => {
  const filteredCarsByBrand = cars.filter(car => car.brand === brand)
  console.log(
    `For the brand you entered, the dealership has a total of ${filteredCarsByBrand.length} cars`
  )
}

// get the number of cars and the list of cars by brand (parameter: brand)
export const listCarsByBrand = (brand) => {
  const filteredCarsByBrand = cars.filter(car => car.brand === brand)
  console.log(
    `For the brand you entered, the dealership has a total of ${filteredCarsByBrand.length} cars`
  )
  console.log(`Here's a list of the ${brand} cars we have: `, filteredCarsByBrand)
}

// get the number of cars and the list by mileage range (parameter: maxMileage, minMileage)
export const listCarsByMileageRange = (minMileage, maxMileage) => {
  const filteredCars = cars.filter(car => car.mileage >= minMileage && car.mileage <= maxMileage);
  console.log(`Number of cars with mileage between ${minMileage} and ${maxMileage}: ${filteredCars.length}`)
  console.log(`Here's a list of the ${brand} cars we have: `);
}


// get the total value of cars that exist in a given dealership
export const getTotalValueByDealership = (dealership) => {
  const filteredCars = cars.filter(car => car.dealership === dealership);
  const totalValue = filteredCars.reduce((sum, car) => sum + parseFloat(car.price), 0)
  console.log(`Total value of cars in the "${dealership}" dealership is: €${totalValue}`)
}