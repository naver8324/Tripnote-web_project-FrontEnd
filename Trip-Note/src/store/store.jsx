import create from 'zustand';

const useProfileStore = create((set) => ({
  email: 'user@example.com',
  nickname: 'userId',
  isNicknameChanged: false,
  setNickname: (nickname) => set({ nickname, isNicknameChanged: true }),
  resetNicknameChanged: () => set({ isNicknameChanged: false }),
}));

export default useProfileStore;
