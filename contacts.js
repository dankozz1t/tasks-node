const fs = require("fs").promises;
const path = require("path");
const { uid } = require("uid");

const contactsPath = path.resolve("./db/contacts.json");

const listContacts = async () => {
  try {
    const response = await fs.readFile(contactsPath, "utf-8");

    return { status: "OK", response: JSON.parse(response) };
  } catch (error) {
    console.log("ERROR: ", error.message);
    return { status: "ERROR", response: error.message };
  }
};

const getContactById = async (contactId) => {
  try {
    const { response } = await listContacts();

    const contact = response.find((contact) => contact.id === contactId);

    return { status: "OK", response: { contact } };
  } catch (error) {
    console.log("ERROR: ", error.message);
    return { status: "ERROR", response: error.message };
  }
};

const removeContact = async (contactId) => {
  try {
    const { response } = await listContacts();

    const newData = response.filter((contact) => contact.id !== contactId);
    const removedContact = response.find((contact) => contact.id === contactId);

    await fs.writeFile(contactsPath, JSON.stringify(newData), "utf-8");

    return { status: "OK", response: { removedContact } };
  } catch (error) {
    console.log("ERROR: ", error.message);
    return { status: "ERROR", response: error.message };
  }
};

const addContact = async (name, email, phone) => {
  try {
    const { response } = await listContacts();

    const addedContact = { id: uid(), name, email, phone };

    response.push(addedContact);

    await fs.writeFile(contactsPath, JSON.stringify(response), "utf-8");

    return { status: "OK", response: { addedContact } };
  } catch (error) {
    console.log("ERROR: ", error.message);
    return { status: "ERROR", response: error.message };
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
