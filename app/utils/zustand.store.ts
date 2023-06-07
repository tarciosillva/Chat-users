import { create } from 'zustand';
import { UserInterface } from '../interfaces/user.interface';

type UserStore = {
    users: UserInterface[];
    setUsers: (newUsers: UserInterface[]) => void;
};

const useStore = create<UserStore>((set) => ({
    users: [],
    setUsers: (newUsers) => set(() => ({ users: newUsers })),
}));

export default useStore;