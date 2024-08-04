import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { addContact, editContact } from "../store/contactsSlice";
import { Contact } from "../store/types";
// import { v4 as uuidv4 } from "uuid";

interface ContactFormProps {
  contactToEdit: Contact | null;
  onCancelEdit: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({
  contactToEdit,
  onCancelEdit,
}) => {
  // const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(contactToEdit?.firstName || "");
  const [lastName, setLastName] = useState(contactToEdit?.lastName || "");
  const [status, setStatus] = useState(contactToEdit?.status || "inactive");

  useEffect(() => {
    if (contactToEdit) {
      setFirstName(contactToEdit.firstName);
      setLastName(contactToEdit.lastName);
      setStatus(contactToEdit.status);
    }
  }, [contactToEdit]);

  const handleSave = () => {
    if (firstName && lastName) {
      // if (contactToEdit) {
      //   dispatch(
      //     editContact({ id: contactToEdit.id, firstName, lastName, status })
      //   );
      // } else {
      //   dispatch(addContact({ id: uuidv4(), firstName, lastName, status }));
      // }
      setFirstName("");
      setLastName("");
      setStatus("inactive");
      onCancelEdit();
    }
  };

  return (
    <div className="border p-4 rounded shadow-md max-w-sm mx-auto">
      <h2 className="text-xl mb-4">
        {contactToEdit ? "Edit Contact" : "Create Contact"}
      </h2>
      <div className="mb-4">
        <label className="block mb-2">First Name</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Last Name</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Status</label>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="active"
              checked={status === "active"}
              onChange={(e) => setStatus(e.target.value)}
            />
            <span className="ml-2">Active</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="inactive"
              checked={status === "inactive"}
              onChange={(e) => setStatus(e.target.value)}
            />
            <span className="ml-2">Inactive</span>
          </label>
        </div>
      </div>
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Save Contact
      </button>
      {contactToEdit && (
        <button onClick={onCancelEdit} className="ml-4 text-gray-700 underline">
          Cancel
        </button>
      )}
    </div>
  );
};

export default ContactForm;
