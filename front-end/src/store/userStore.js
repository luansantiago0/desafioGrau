// useUserStore.js
import { create } from "zustand";

const useUserStore = create((set) => ({
  users: JSON.parse(localStorage.getItem("users")) || [],
  addUser: (user) => {
    set((state) => {
      const updatedUsers = [...state.users, user];
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      return { users: updatedUsers };
    });
  },
  editUser: (editedUser) => {
    set((state) => {
      const updatedUsers = state.users.map((user) =>
        user.id === editedUser.id ? editedUser : user
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      return { users: updatedUsers };
    });
  },
  deleteUser: (userId) => {
    set((state) => {
      const updatedUsers = state.users.filter((user) => user.id !== userId);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      return { users: updatedUsers };
    });
  },
}));

export default useUserStore;
