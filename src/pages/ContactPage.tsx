import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ContactForm from "../components/ContactForm";
import ContactList from "../components/ContactList";
import { Contact } from "../store/types";
import { deleteContact } from "../store/contactsSlice";

const ContactPage: React.FC = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  const handleEditContact = (contact: Contact) => {
    setSelectedContact(contact);
    setIsEditing(true);
  };

  const handleDeleteContact = (contactId: string) => {
    dispatch(deleteContact(contactId));
  };

  const handleCancelEdit = () => {
    setSelectedContact(null);
    setIsEditing(false);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleAddContact = () => {
    setSelectedContact(null);
    setIsEditing(true);
  };

  const handleContainerClick = (e: any) => {
    e.stopPropagation();
  };

  return (
    <div className="p-4">
      <button
        onClick={handleAddContact}
        className="bg-black text-white px-4 py-2 rounded mb-4"
      >
        + Add Contact
      </button>

      {isEditing && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={handleCancelEdit}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-[20%]"
            onClick={handleContainerClick}
          >
            <ContactForm
              contactToEdit={selectedContact}
              onCancelEdit={handleCancelEdit}
              onSave={handleSave}
            />
          </div>
        </div>
      )}

      <ContactList onEdit={handleEditContact} onDelete={handleDeleteContact} />
    </div>
  );
};

export default ContactPage;
