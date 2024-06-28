import { countCarsByBrand, listCarsByBrand } from '../functions/usecases'
import { loadData } from '../data/loadData'

await loadData('./src/data/cars.csv')

describe('countCarsByBrand', () => {
  it('should count cars of a specific brand', async () => {
    const count = await countCarsByBrand('TESLA')
    expect(count).toBe(121)
  })

  it('should still count cars of existing brand entered in lowercase', async () => {
    const count = await countCarsByBrand('tesla')
    expect(count).toBe(121)
  })

  it('should return zero for a brand not in the list', () => {
    const count = countCarsByBrand('FIELD')
    expect(count).toBe(0)
  })
})

describe('listCarsByBrand', () => {
  it('should list cars of a specific brand', async () => {
    const list = await listCarsByBrand('BMW')
    expect(list.length).toBe(117)
    expect(list[0].Car).toBe('BMW')
    expect(list[0].Dealership).toBe('Santogal Jump')
    expect(list[0].Mileage).toBe(5502)
    expect(list[0].Price).toBe(26082)
  })

  it('should still list cars of existing brand entered in lowercase', async () => {
    const list = await listCarsByBrand('audi')
    expect(list.length).toBe(131)
    expect(list[0].Car).toBe('AUDI')
    expect(list[0].Dealership).toBe('Cucujães Sport Auto')
    expect(list[0].Mileage).toBe(13885)
    expect(list[0].Price).toBe(35976)
  })

  it('should return zero for a brand not in the list', () => {
    const count = countCarsByBrand('PROCIMO')
    expect(count).toBe(0)
  })
})
