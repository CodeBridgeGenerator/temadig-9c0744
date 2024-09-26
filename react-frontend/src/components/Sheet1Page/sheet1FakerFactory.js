
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
titleNo: faker.lorem.sentence(""),
area: faker.lorem.sentence(""),
planNo: faker.lorem.sentence(""),
location: faker.lorem.sentence(""),
uomAreaDesc: faker.lorem.sentence(""),
ownerName: faker.lorem.sentence(""),
address1: faker.lorem.sentence(""),
telNo: faker.lorem.sentence(""),
address2: faker.lorem.sentence(""),
address3: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
