const contacts = require("./contacts"); //functions can be normally destructured here
// USING yargs
const argv = require("yargs").argv;

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      contacts.listContacts();
      break;

    case "get":
      contacts.getContactById(id);
      break;

    case "add":
      contacts.addContact(name, email, phone);
      break;

    case "remove":
      contacts.removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
//node index --action=list
//node index --action=add --name="some name" --email="some@email.duh" --phone="22-222-222"

//----------------------------------------------

// // using commander
// const { Command } = require("commander");

// const program = new Command();

// program
//   .command("list")
//   .description("List all contacts")
//   .action(() => {
//     contacts.listContacts();
//   });

// program
//   .command("get <id>")
//   .description("Get a contact by ID")
//   .action((id) => {
//     contacts.getContactById(id);
//   });

// program
//   .command("add")
//   .description("Add a new contact")
//   .requiredOption("-n, --name <name>", "Contact name")
//   .requiredOption("-e, --email <email>", "Contact email")
//   .requiredOption("-p, --phone <phone>", "Contact phone number")
//   .action((options) => {
//     const { name, email, phone } = options;
//     contacts.addContact(name, email, phone);
//   });

// program
//   .command("remove <id>")
//   .description("Remove a contact by ID")
//   .action((id) => {
//     contacts.removeContact(id);
//   });

// program.parse(process.argv);
