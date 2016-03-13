import $ from 'jquery'

const UPLOAD_URL = 'https://api.imgur.com/3/image'
const IMAGE_URL = 'https://imgur.com/gallery'
const CLIENT_ID = '0fc1ab7322aa20c'

let Imgur = {
  upload: (options) => {
    options = options || {}

    let type = options.type || 'URL'
    let image = options.data

    return $.ajax({
      url: UPLOAD_URL,
      type: 'POST',
      headers: {
        Authorization: "Client-ID " + CLIENT_ID,
        Accept: 'application/json'
      },
      data: {
        image: image,
        type: type
      }
    }).then((data) => {
      return data.data
    })
  }
}

export default Imgur
