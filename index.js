const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.join(__dirname, "db", "contacts.json");
console.log(contactsPath);

async function listContacts(pathToContacts) {
  try {
    const data = await fs.readFile(pathToContacts, "utf-8");
    console.log(JSON.parse(data));
  } catch (err) {
    console.error(err);
  }
}

listContacts(contactsPath);

// async function getContactById(filePath, contactId) {
//   try {
//     const data = await fs.readFile(filePath, "utf-8");
//     console.log(data);
//     const contacts = JSON.parse(data);
//     const filteredContact = contacts.filter(
//       (contact) => contact.id === contactId
//     );
//     if (filteredContact.length === 0) {
//       console.log(`no contact with id ${contactId} found`);
//     } else {
//       // console.log(filteredContact);
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }

// const jsonData = JSON.parse(data);
// jsonData.push(newObject);

// getContactById(contactsPath, 15);

// async function removeContact(filePath, contactId) {
//   try {
//     const data = await fs.readFile(filePath, "utf-8");
//     if (data.includes(`id: ${contactId}`)) {
//       console.log("it exists");
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }
