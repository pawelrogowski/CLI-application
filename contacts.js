const fs = require("fs");
const path = require("path");
const nano = require("nano"); // a library for generating unique IDs

// __dirname is node.js global variable that points the the directory of file it was invoked in
// __dirname + db + contacts.json = .../goit-node-hw-01/db/contacts.json
const contactsPath = path.join(__dirname, "db", "contacts.json");

/*
    the fs.readFile method takes a filepath, optional encoding string
    and a callback function that should handle errors and the data.
    if you don't pass the encoding string the data will stay as a buffer object
    you can use toString(data) to fix it.
*/

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
    const contacts = JSON.parse(data); // converts json string into js object so we can use object methods on it
    console.log(`found ${contacts.length} contacts`);
    console.log(`${contactsPath} file contents:`, contacts);
    return contacts;
  });
}

// listContacts();

/**
 * Retrieves a contact with the specified ID from the contacts file.
 * @param {string} contactId - The ID of the contact to be retrieved.
 * @returns {Object|null} The contact object with the specified ID, or null if the contact does not exist.
 */
function getContactById(contactId) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.error(`Error Reading File: ${contactsPath}`, err);
      return;
    }
    const contacts = JSON.parse(data);
    // check if the contact even exist
    const contactExists = contacts.some((contact) => contact.id === contactId);

    if (contactExists) {
      const filteredContact = contacts.filter(
        (contact) => contact.id === contactId
      );
      console.log(filteredContact);
      return filteredContact;
    } else {
      console.log(`Contact with ID ${contactId} does not exist.`);
      return null;
    }
  });
}

// getContactById("qdggE76Jtbfd9eWJHrssH");

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
      console.log(`Contact with ID ${contactId} removed.`);
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
      id: nano(), // nano() used to generate unique ID
      name: name,
      email: email,
      phone: phone,
    };

    // Add the new contact to the contacts array
    contacts.push(newContact);

    // Write the updated contacts list back to the file
    fs.writeFile(contactsPath, JSON.stringify(contacts), (err) => {
      if (err) {
        console.error(`Error Writing File: ${contactsPath}`, err);
        return;
      }
      console.log(`New contact added:`, newContact);
    });
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
