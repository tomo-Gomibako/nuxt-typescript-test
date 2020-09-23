import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { User, userConverter } from '@/assets/classes/User'

export class AuthUser {
  uid: string
  displayName: string | null
  photoURL: string | null
  email: string | null

  constructor (
    uid: string,
    displayName: string | null,
    photoURL: string | null,
    email: string | null
  ) {
    this.uid = uid
    this.displayName = displayName
    this.photoURL = photoURL
    this.email = email
  }
}

interface State {
  user: AuthUser | null | undefined,
  _unsubscribe: firebase.Unsubscribe | null
}

export const state: () => State = () => ({
  user: undefined,
  _unsubscribe: null
})

export type AuthState = ReturnType<typeof state>

export const getters: GetterTree<AuthState, AuthState> = {
  user (state) {
    return state.user
  },
  _unsubscribe (state) {
    return state._unsubscribe || (() => {})
  }
}

export const mutations: MutationTree<AuthState> = {
  onAuthStateChanged (state, user: AuthUser) {
    state.user = user
  },
  _setUnsubscribe (state, f: firebase.Unsubscribe = () => {}) {
    state._unsubscribe = f
  }
}

export const actions: ActionTree<AuthState, AuthState> = {
  init (ctx) {
    if (ctx.getters.user !== undefined) {
      return
    }
    console.log('auth store has initialized!')

    const convertUser: (fbUser: firebase.User | null) => Promise<AuthUser | null> = async (fbUser) => {
      if (!fbUser) {
        return null
      }
      const uid = fbUser.uid
      const name = fbUser.displayName
      const photoURL = fbUser.photoURL
      const email = fbUser.email

      const db = this.$fb.getDB()
      const userRef = db.collection('users').doc(uid)
      const user = await userRef.get()
      if (!user.exists) {
        const newUser = new User({
          name: name || '',
          iconURL: photoURL || ''
        })
        await userRef.withConverter(userConverter).set(newUser)
      }
      return new AuthUser(
        uid,
        name,
        photoURL,
        email
      )
    }

    ctx.getters._unsubscribe()
    const unsubscribe = this.$fb.getAuth().onAuthStateChanged(async (user) => {
      ctx.commit('onAuthStateChanged', await convertUser(user))
      console.log('auth state has changed!')
    })
    ctx.commit('_setUnsubscribe', unsubscribe)
  }
}
