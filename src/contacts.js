import * as fs from "node:fs/promises";
import path from "path";
import crypto from "node:crypto";

const contactsPath = path.resolve("db", "contacts.json");

async function listContacts() {
  const contacts = await fs.readFile(contactsPath, { encoding: "utf-8" });
  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  const contacts = await listContacts();

  const getContact = contacts.find((contact) => contact.id === contactId);

  return getContact ? getContact : null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();

  const contactToRemove = contacts.find((contact) => contact.id === contactId);
  if (contactToRemove !== undefined) {
    const newContacts = contacts.filter((contact) => contact.id !== contactId);
    fs.writeFile(contactsPath, JSON.stringify(newContacts));
    return contactToRemove;
  } else {
    return null;
  }
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();

  const newContact = { id: crypto.randomUUID(), name, email, phone };

  contacts.push(newContact);

  fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
}

export default { listContacts, getContactById, removeContact, addContact };
