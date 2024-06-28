import {
  countCarsByBrand,
  listCarsByBrand,
  listCarsByMileageRange,
  getTotalValueByDealership,
} from '../functions/usecases'
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

describe('listCarsByMileageRange', () => {
  it('should list cars given a mileage range', async () => {
    const list = await listCarsByMileageRange(19000, 20000)
    expect(list.length).toBe(52)
    expect(list[51].Car).toBe('SEAT')
    expect(list[51].Dealership).toBe('Cucujães Sport Auto')
    expect(list[51].Mileage).toBe(19177)
    expect(list[51].Price).toBe(32489)
  })

  it('should return zero for a mileage range out of bounds', () => {
    const list = listCarsByMileageRange(0, 1)
    expect(list).toBe(0)
  })
})

describe('getTotalValueByDealership', () => {
  it('should get the total value of cars in a given dealership ', async () => {
    const total = await getTotalValueByDealership('Santogal Jump')
    expect(total).toBe(6204043)

    const total1 = await getTotalValueByDealership('Cucujães Sport Auto')
    expect(total1).toBe(6370799)

    const total2 = await getTotalValueByDealership('Auto Jamor')
    expect(total2).toBe(5754176)

    const total3 = await getTotalValueByDealership('Caetano Power')
    expect(total3).toBe(5700107)

    const total4 = await getTotalValueByDealership('Auto Machado')
    expect(total4).toBe(5925481)
  })

  it('should return zero for a dealership that does not exist', () => {
    const total = getTotalValueByDealership('Automóveis Aljezur')
    expect(total).toBe(0)
  })
})
