import { countCarsByBrand } from '../functions/usecases'
import { loadData } from '../data/loadData'

await loadData('./src/data/cars.csv')

describe('countCarsByBrand', () => {
  it('should count cars of a specific brand', async () => {
    const count = await countCarsByBrand('TESLA')
    expect(count).toBe(121)
  })

  it('should return zero for a brand not in the list', () => {
    const count = countCarsByBrand('HUGO')
    expect(count).toBe(0)
  })
})

describe('countCarsByBrand', () => {
  it('should count cars of a specific brand', async () => {
    const data = await loadData('./src/data/cars.csv')
    const count = await countCarsByBrand('TESLA')
    expect(count).toBe(121)
  })

  it('should return zero for a brand not in the list', () => {
    const count = countCarsByBrand('HUGO')
    expect(count).toBe(0)
  })
})
