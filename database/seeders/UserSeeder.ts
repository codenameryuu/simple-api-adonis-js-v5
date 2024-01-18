import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Hash from "@ioc:Adonis/Core/Hash";
import { faker } from "@faker-js/faker/locale/id_ID";

import User from "App/Models/User";

export default class extends BaseSeeder {
  public async run() {
    const firstName = faker.person.firstName("male");
    const lastName = faker.person.firstName("male");

    const email = firstName.toLowerCase() + lastName.toLowerCase() + "@gmail.com";
    const password = firstName.toLowerCase() + lastName.toLowerCase();

    await User.create({
      email: email,
      password: await Hash.make(password),
    });
  }
}
