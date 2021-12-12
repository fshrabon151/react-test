const initialState = [
  { id: 0, name: "Raman Sharma", email: "email@email.com", phone: 1234567890 },
  { id: 1, name: "Test Name", email: "test@test.com", phone: 4567891230 },
];
export const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CONTACT":
      return [...state, action.payload];
    case "UPDATE_CONTACT":
      const contactUpdate = state.filter((contact) =>
        contact.id === action.payload.id
          ? Object.assign(contact, action.payload)
          : contact
      );
      return contactUpdate;
    case "DELETE_CONTACT":
      const contactFilter = state.filter(
        (contact) => contact.id !== action.payload
      );
      state = contactFilter;
      return state;
    default:
      return state;
  }
};
