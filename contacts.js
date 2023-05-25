const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const contactsPath = path.join(__dirname, "db", "contacts.json");

/**
 * Reads the contents of the contacts file and returns it as a JavaScript object.
 * @returns {Object} The contents of the contacts file as a JavaScript object.
 */
function listContacts() {
  const data = fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.error(`Error Reading File: ${contactsPath}`, err);
      return;
    }
    const contacts = JSON.parse(data);
    console.table(contacts);
    return contacts;
  });
}

/**
 * Retrieves a contact with the specified ID from the contacts file asynchronously.
 * @param {string} contactId - The ID of the contact to be retrieved.
 * @returns {Object|null} The contact object with the specified ID, or null if the contact does not exist.
 * @throws {Error} If an error occurs while reading the file or parsing the data.
 */
async function getContactById(contactId) {
  try {
    const data = await fs.promises.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const filteredContact = contacts.find(
      (contact) => contact.id === contactId
    );
    console.table(filteredContact);
    return filteredContact;
  } catch (err) {
    console.error(`Error Reading File: ${contactsPath}`, err);
  }
}

/**
 * Removes a contact with the specified ID from the contacts file.
 * @param {string} contactId - The ID of the contact to be removed.
 */
function removeContact(contactId) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.error(`Error Reading File: ${contactsPath}`, err);
      return;
    }
    const contacts = JSON.parse(data);

    // Filter out the contact with the specified ID
    const updatedContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );

    // Write the updated contacts list back to the file
    fs.writeFile(contactsPath, JSON.stringify(updatedContacts), (err) => {
      if (err) {
        console.error(`Error Writing File: ${contactsPath}`, err);
        return;
      }
      console.log(`Removed contact with ID: ${contactId}`);
    });
  });
}

/**
 * Adds a new contact with the specified name, email, and phone to the contacts file.
 * @param {string} name - The name of the contact.
 * @param {string} email - The email address of the contact.
 * @param {string} phone - The phone number of the contact.
 */
function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.error(`Error Reading File: ${contactsPath}`, err);
      return;
    }
    const contacts = JSON.parse(data);

    // Create a new contact object with a unique ID
    const newContact = {
      id: uuidv4(),
      name: name,
      email: email,
      phone: phone,
    };

    contacts.push(newContact);

    fs.writeFile(contactsPath, JSON.stringify(contacts), (err) => {
      if (err) {
        console.error(`Error Writing File: ${contactsPath}`, err);
        return;
      }
      console.table(newContact);
    });
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
