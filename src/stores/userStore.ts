import { defineStore } from 'pinia'
import { auth } from '../main'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as firebaseSignOut, type User } from 'firebase/auth'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,
    loading: false,
    error: null as string | null
  }),

  actions: {
    async signIn(email: string, password: string) {
      this.loading = true
      this.error = null
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        this.user = userCredential.user
      } catch (err) {
        this.error = (err as Error).message
        throw err
      } finally {
        this.loading = false
      }
    },

    async signUp(email: string, password: string) {
      this.loading = true
      this.error = null
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        this.user = userCredential.user
      } catch (err) {
        this.error = (err as Error).message
        throw err
      } finally {
        this.loading = false
      }
    },

    async signOut() {
      try {
        await firebaseSignOut(auth)
        this.user = null
      } catch (err) {
        this.error = (err as Error).message
        throw err
      }
    }
  },

  persist: true
})