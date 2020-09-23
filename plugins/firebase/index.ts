import firebase from 'firebase'
import { Plugin } from '@nuxt/types'

declare module 'vue/types/vue' {
  interface Vue {
    $fb: {
      getApp(): firebase.app.App,
      getDB(): firebase.firestore.Firestore,
      getAuth(): firebase.auth.Auth,
      logout(): Promise<void>,
      loginGoogle(): Promise<firebase.auth.UserCredential>,
      loginTwitter(): Promise<firebase.auth.UserCredential>
    }
  }
}
declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $fb: {
      getApp(): firebase.app.App,
      getDB(): firebase.firestore.Firestore,
      getAuth(): firebase.auth.Auth,
      logout(): Promise<void>,
      loginGoogle(): Promise<firebase.auth.UserCredential>,
      loginTwitter(): Promise<firebase.auth.UserCredential>
    }
  }
}
declare module 'vuex/types/index' {
  interface Store<S> {
    $fb: {
      getApp(): firebase.app.App,
      getDB(): firebase.firestore.Firestore,
      getAuth(): firebase.auth.Auth,
      logout(): Promise<void>,
      loginGoogle(): Promise<firebase.auth.UserCredential>,
      loginTwitter(): Promise<firebase.auth.UserCredential>
    }
  }
}

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyBZj7K-61GQwbM8WIOkyUyxRxR16hHEtf4',
    authDomain: 'test-5183e.firebaseapp.com',
    databaseURL: 'https://test-5183e.firebaseio.com',
    projectId: 'test-5183e',
    storageBucket: 'test-5183e.appspot.com',
    messagingSenderId: '103937709281',
    appId: '1:103937709281:web:b79335933f8391cb36d3a0',
    measurementId: 'G-KKL19TT422'
  })
  firebase.analytics()
}

const getApp = () => firebase
const getDB = () => firebase.firestore()
const getAuth = () => firebase.auth()
const logout = async () => {
  await firebase.auth().signOut()
}
const loginGoogle = async () => {
  const provider = new firebase.auth.GoogleAuthProvider()
  firebase.auth().signInWithRedirect(provider)
  return await firebase.auth().getRedirectResult()
}
const loginTwitter = async () => {
  const provider = new firebase.auth.TwitterAuthProvider()
  firebase.auth().signInWithRedirect(provider)
  return await firebase.auth().getRedirectResult()
}

const plugin: Plugin = (_, inject) => {
  inject('fb', {
    getApp,
    getDB,
    getAuth,
    logout,
    loginGoogle,
    loginTwitter
  })
}

export default plugin
