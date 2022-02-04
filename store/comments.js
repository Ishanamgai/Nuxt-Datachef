export const state = () => ({
  comments: null,
  visibleComment: null,
  updateComment: true,
  isComment: null,
})

export const mutations = {
  setIsComment (state, payload) {
    state.isComment = payload
  },
  setComments (state, payload) {
    state.comments = payload
  },
  setVisibleComment (state, payload) {
    state.visibleComment = payload
  },
  setUpdateComment (state, payload) {
    state.updateComment = payload
  },

  DELETE_COMMENT (state, id) {
    const idx = state.comments.findIndex(c => c.id === id)
    if (idx !== -1) {
      state.comments.splice(idx, 1)
    }
  },
}

export const actions = {
  async loadComments ({ commit }, id) {
    const res = await this.$axios.get(`/comments/snowflaketable/${id}/?archived=0`)
    commit('setComments', res.data.results)
  },

  async createComment ({ commit, dispatch }, { id, text }) {
    const formData = new FormData()
    formData.append('text', text)
    try {
      const res = await this.$axios.post(`/comments/snowflakecolumn/${id}/`,
        formData)
      commit('setVisibleComment', res)
      dispatch('loadComments', id)
      commit('setIsComment', true)
    } catch (err) {
      commit('setIsComment', false)
    }
  },
  async updateComment ({ commit, dispatch }, { id, text, objectId }) {
    const formData = new FormData()
    formData.append('text', text)
    commit('setUpdateComment', false)
    try {
      const res = await this.$axios.put(`/comments/update/${id}/`, formData)
      commit('setUpdateComment', true)
      dispatch('loadComments', objectId)
      // console.log(res, "ress")
    } catch (err) {
      commit('setUpdateComment', false)
    }
  },

  async deleteComment ({ commit }, id) {
    const formData = new FormData()
    formData.append('archived', '1')
    await this.$axios.put(`/comments/update/${id}/`, formData)
    commit('DELETE_COMMENT', id)
  },
}
