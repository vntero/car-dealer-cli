import csv from 'csv-parser'
import fs from 'fs'

export const cars = []

export const loadData = async (filePath) => {
  const stream = fs.createReadStream(filePath).pipe(csv())

  for await (const data of stream) {
    const parsedData = {
      Car: data.Car,
      Dealership: data.Dealership,
      Mileage: parseFloat(data.Mileage),
      Price: parseFloat(data.Price),
    }
    cars.push(parsedData)
  }

  return cars
}
