import { ref, watchEffect } from 'vue'
import axios from 'axios'
const searchTimeout = ref(null)

export function useUsernameCheck(usernameCheck) {
  const usernameFound = ref('')
  const loadingUsername = ref(false)
  const username = ref('')

  async function usernameFinder() {
    loadingUsername.value = true
    usernameFound.value = false
    await axios.post('/api/user/check_username', {
      username: username.value
    }).then(response => {
      if (response.data) {
        usernameFound.value = response.data
      }
    })
    await axios.post('/api/doctor/check_username', {
      username: username.value
    }).then(response => {
      if (response.data) {
        usernameFound.value = response.data
      }
    })
    await axios.post('/api/manager/check_username', {
      username: username.value
    }).then(response => {
      if (response.data) {
        usernameFound.value = response.data
      }
    })
    if (username.value == '') {
      usernameFound.value = ''
    }
    loadingUsername.value = false
  }

  watchEffect(() => {
    username.value = usernameCheck.value
    usernameFound.value = ''
    loadingUsername.value = false

    if (searchTimeout.value) {
      clearTimeout(searchTimeout.value)
      searchTimeout.value = null
    }
    searchTimeout.value = setTimeout(usernameFinder, 500)
  })

  return { usernameFound, loadingUsername }
}