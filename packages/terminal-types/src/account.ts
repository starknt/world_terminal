import { generateUuid } from '@terminal/kit'

export class Version {

}

export class Account {
  private readonly _id = generateUuid()

  get id() { return this._id }

  static serialize() {}

  static deserialize(a: string) {

  }
}
