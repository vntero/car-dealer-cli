import csv from 'csv-parser'
import fs from 'fs'

export const cars = []

export const loadData = async (filePath) => {
  const stream = fs.createReadStream(filePath).pipe(csv())

  for await (const data of stream) {
    cars.push(data)
  }

  return cars
}
