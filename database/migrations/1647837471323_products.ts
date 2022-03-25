import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Products extends BaseSchema {
  protected tableName = 'products'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name', 50).notNullable()
      table.string('thumbnail').notNullable()
      table.integer('rate').nullable()
      table.integer('price').notNullable()
      table.text('description').nullable()
      table.string('category').notNullable()
      table.integer('cart_id').unsigned().nullable()
      table.timestamps(true, true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
