import React from "react";
// import { useSelector, useDispatch } from "react-redux";
import { Contact } from "../store/types";
// import { RootState } from "../store";
// import { deleteContact } from "../store/contactsSlice";
// import { Contact } from "../types";

const ContactList: React.FC<{ onEdit: (contact: Contact) => void }> = ({
  onEdit,
}) => {
  // const contacts = useSelector((state: any) => state.contacts);
  // const dispatch = useDispatch();

  let contacts: any = [];

  return (
    <div className="flex flex-col items-center">
      {contacts.length === 0 ? (
        <div className="text-center">
          <div className="text-6xl text-red-600">✖</div>
          <p>No Contact Found</p>
          <p>Please add contact from Create Contact Button</p>
        </div>
      ) : (
        contacts.map((contact: any) => (
          <div
            key={contact.id}
            className="flex items-center mb-4 border p-4 rounded shadow-lg"
          >
            <div className="flex-1">
              <h2 className="text-xl">
                {contact.firstName} {contact.lastName}
              </h2>
              <p>Status: {contact.status}</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => onEdit(contact)}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Edit
              </button>
              <button
                // onClick={() => dispatch(deleteContact(contact.id))}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ContactList;
