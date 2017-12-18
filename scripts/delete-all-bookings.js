const baseUrl = 'http://integration-bookit-api.buildit.tools/v1/'
// const baseUrl = 'http://localhost:8080/v1/'
const axios = require('axios')

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vMzdmY2YwZTQtY2ViOC00ODY2LThlMjYtMjkzYmFiMWUyNmE4L3YyLjAiLCJpYXQiOjE1MTMwMjM4NDQsImV4cCI6MTkyMzI1MTIzMSwiYXVkIjoiOWE4YjgxODEtYWZiMS00OGY4LWE4MzktYTg5NWQzOWY5ZGIwIiwic3ViIjoiWjRCeVBLR3JxOXBueE9uUEdkWlFXMGI5a0pvcWNRR1RHTWp2MVpEY1VLVSIsImFpbyI6IkFUUUF5LzhHQUFBQTRFeTl2d1VrbTBUTWh1R093bjE1MWwyRENiME00TnZqSERSSDM2M2U3eEQ0WFROeTdva1NLOXFuMVpHSFVuTEYiLCJhdF9oYXNoIjoic3ZvdldwdGl5VWJ3YVpqMV81X1M4QSIsIm5hbWUiOiJNb2JpbGUgVGVzdGVyIiwibm9uY2UiOiJkYmZiY2E4Zi1kMTdkLTRiZjgtYjVjMi1hYWY5ZTY0ZWRhMGUiLCJvaWQiOiJhZWE4MjhjYy04ODk1LTRjYTYtYTFhOS01ZDNlMWEyZmZkMzAiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtb2JpbGV0ZXN0QGJ1aWxkaXRjb250b3NvLm9ubWljcm9zb2Z0LmNvbSIsInRpZCI6IjM3ZmNmMGU0LWNlYjgtNDg2Ni04ZTI2LTI5M2JhYjFlMjZhOCIsInV0aSI6IjZDQnhHT09aODBDTGgwRVdySlV3QUEiLCJ2ZXIiOiIyLjAifQ.1Q15MmitXL_vLXIiPgfIvaX38eSY2O0W7xU-ywcg6M4'

axios({
  method: 'get',
  url: `${baseUrl}booking`,
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then(bookings => Promise.all(bookings.data.map(b =>
    axios({
      method: 'delete',
      url: `${baseUrl}booking/${b.id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })))
    .then(() => console.log('deleted'))
    .catch(err => console.error(err)))
