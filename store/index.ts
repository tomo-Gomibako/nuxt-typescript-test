import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  isLoading: false
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  isLoading (state) {
    return state.isLoading
  }
}

export const mutations: MutationTree<RootState> = {
  setLoadingState (state, isLoading: boolean) {
    if (isLoading === undefined) {
      isLoading = !state.isLoading
    }
    state.isLoading = !!isLoading
  }
}

export const actions: ActionTree<RootState, RootState> = {
  startLoading (ctx) {
    ctx.commit('setLoadingState', true)
  },
  finishLoading (ctx) {
    ctx.commit('setLoadingState', false)
  }
}
