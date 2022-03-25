import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Cart from './Cart'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public thumbnail: string

  @column()
  public rate: number

  @column()
  public price: number

  @column()
  public description: string

  @column()
  public category: string

  @column()
  public cartId: number


  @belongsTo(()=>Cart, {
    foreignKey: 'id'
  })
  public carts: BelongsTo<typeof Cart>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
