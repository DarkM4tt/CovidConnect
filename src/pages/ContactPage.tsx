import React, { useState } from "react";
import ContactList from "../components/ContactList";
import ContactForm from "../components/ContactForm";
import { Contact } from "../store/types";

const ContactPage: React.FC = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const handleEditContact = (contact: Contact) => {
    setSelectedContact(contact);
  };

  const handleCancelEdit = () => {
    setSelectedContact(null);
  };

  return (
    <div className="p-4">
      <ContactForm
        contactToEdit={selectedContact}
        onCancelEdit={handleCancelEdit}
      />
      <ContactList onEdit={handleEditContact} />
    </div>
  );
};

export default ContactPage;
