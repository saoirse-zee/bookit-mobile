let axios = jest.genMockFromModule('axios')

const mockPostResponse = {
  data: { whatever: 'data the server responds with' },
}

axios = (options) => {
  switch (options.method) {
    case 'post': {
      return Promise.resolve(mockPostResponse)
    }
    default: {
      return Promise.reject('The test runner should not be here.')
    }
  }
}

axios.get = () => Promise.resolve({
  data: [1, 2, 3],
})

module.exports = axios
