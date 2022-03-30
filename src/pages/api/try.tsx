import axios from "axios";
// import * as imagef from '../../../public/images/try.jpg'
// const imagef = require('../../../public/images/try.jpg')

const imagef = "https://www.melhoresdestinos.com.br/wp-content/uploads/2019/02/passagens-aereas-roma-capa2019-01.jpg"


export function postAPI() {
    console.log("trying");
    let form_data = new FormData();
    form_data.append("image", imagef);
    form_data.append('key', process.env.NEXT_PUBLIC_IMGBB_API_KEY);
  
    axios
        .post(`https://api.imgbb.com/1/upload?expiration=600&key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`, {
            form_data
        })
        .then((response) => console.log(response))
        .catch((error) => {
            console.log(error);
        });
}