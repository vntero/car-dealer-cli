// get the number of cars by brand (parameter: brand)
export const getCarsByBrand = (brand) => {
  const filteredCarsByBrand = cars.map((cars) => cars.brand === brand)
  console.log(
    `For the brand you entered, the dealership has a total of ${filteredCarsByBrand.length} cars`
  )
}

// get the number of cars and the list of cars by brand (parameter: brand)

// get the number of cars and the list by mileage range (parameter: maxMileage, minMileage)

// get the total value of cars that exist in a given dealership
