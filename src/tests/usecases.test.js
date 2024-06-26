import { countCarsByBrand } from '../functions/usecases'

describe('countCarsByBrand', () => {
  it('should count cars of a specific brand', () => {
    const cars = [
      {
        Car: 'TESLA',
        Dealership: 'Caetano Power',
        Mileage: '19202',
        Price: '42828',
      },
      {
        Car: 'TESLA',
        Dealership: 'Auto Machado',
        Mileage: '19475',
        Price: '21945',
      },
      {
        Car: 'AUDI',
        Dealership: 'Santogal Jump',
        Mileage: '19026',
        Price: '18776',
      },
    ]

    const count = countCarsByBrand('TESLA')
    expect(count).toBe(2)
  })

  it('should return zero for a brand not in the list', () => {
    const count = countCarsByBrand('BMW')
    expect(count).toBe(0)
  })
})
