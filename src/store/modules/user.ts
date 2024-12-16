import type { User } from './type'
import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user', // id必填，且需要唯一
  // state
  state: (): User => {
    return {
      userInfo: {
        name: 'admin',
      },
    }
  },

})
