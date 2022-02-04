import client from '~/plugins/contentful'

export const state = () => ({
  posts: null,
  suggestions: [],
  loading: true,
  organization: null,
})

export const mutations = {
  UPDATE_POSTS (state) {
    state.loading = true
  },

  UPDATE_POSTS_OK (state, posts) {
    state.loading = false
    state.posts = posts
  },

  UPDATE_POSTS_ERR (state) {
    state.loading = false
  },

  GET_ORGANIZATION (state) {
    state.loading = true
  },

  GET_ORGANIZATION_OK (state, payload) {
    state.loading = false
    state.organization = payload
  },

  GET_ORGANIZATION_ERR (state) {
    state.loading = false
  },

  GET_SUGGESTIONS (state) {
    state.loading = true
  },

  GET_SUGGESTIONS_OK (state, payload) {
    state.loading = false
    console.log(payload)
    state.suggestions.push(...payload)
  },

  GET_SUGGESTIONS_ERR (state) {
    state.loading = false
  },

  UPDATE_SUGGESTION (state) {
    state.loading = true
  },

  UPDATE_SUGGESTION_OK (state) {
    state.loading = false
  },

  UPDATE_SUGGESTION_ERR (state) {
    state.loading = false
  },
  UPDATE_SUGGESTION_ITEM (state, payload) {
    console.log(payload)
    for (let index = 0; index < state.suggestions.length; index++) {
      const element = state.suggestions[index];
      console.log(element)
    }
  },
}

export const actions = {

  async getPosts ({ commit }) {
    try {
      if (!client) { return }
      commit('UPDATE_POSTS')
      const response = await client.getEntries({ content_type: 'blogPost' })
      if (response.items.length > 0) {
        commit('UPDATE_POSTS_OK', response.items)
      }
    } catch (err) {
      commit('UPDATE_POSTS_ERR', err)
    }
  },

  async getOrganization ({ commit }, accounts) {
    try {
      commit('GET_ORGANIZATION')
      const res = await this.$axios.get('/organization')
      commit('GET_ORGANIZATION_OK', res.data.results[0])
      // const currentArr = []
      // accounts.forEach((account)=>organizations.forEach((organization)=>{if(organization.id !== account.organization_id){
      //  currentArr.push(account)
      // }}))
      // commit('setCurrentAccount', currentArr[0])
    } catch (err) {
      commit('GET_ORGANIZATION_ERR', err)
    }
  },

  async getSuggestions ({ commit, dispatch }) {
    try {
      commit('GET_SUGGESTIONS')
      const response = await this.$axios.get('/suggestions/?status=NEW')
      commit('GET_SUGGESTIONS_OK', response.data.results)
      const response1 = await this.$axios.get('/suggestions/?status=APPROVED')
      commit('GET_SUGGESTIONS_OK', response1.data.results)
      const response2 = await this.$axios.get('/suggestions/?status=DECLINED')
      commit('GET_SUGGESTIONS_OK', response2.data.results)
      // dispatch('getOrganization', response.data.results)
    } catch (err) {
      commit('GET_SUGGESTIONS_ERR', err)
    }
  },

  async updateSuggestionApproved ({ commit, dispatch }, id) {
    const formData = new FormData()
    formData.append('status', 'APPROVED')
    try {
      commit('UPDATE_SUGGESTION')
      const response = await this.$axios.patch(`/suggestions/${id}/`, formData)
      dispatch('getSuggestions')
      commit('UPDATE_SUGGESTION_OK')
    } catch (err) {
      commit('UPDATE_SUGGESTION_ERR')
    }
  },
  
  async updateSuggestionDeclined ({ commit, dispatch }, id) {
    const formData = new FormData()
    formData.append('status', 'DECLINED')
    try {
      commit('UPDATE_SUGGESTION')
      const response = await this.$axios.patch(`/suggestions/${id}/`, formData)
      dispatch('getSuggestions')
      commit('UPDATE_SUGGESTION_OK')
    } catch (err) {
      commit('UPDATE_SUGGESTION_ERR')
    }
  },
}

export const getters = {
  getSuggestion: state => (id) => {
    return state.suggestions.find(a => a.id === id)
  },
}
