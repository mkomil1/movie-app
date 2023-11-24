import axios from "axios"

export const apiRequest = async(endpoint, params) => {
    ///endpoint bu url dan keyin keladigan narsalardir misol uchun url?api_key=""
    const options = {
         method: "GET",
         url: endpoint,
         params: params ? params : {}
    }
    try {
        //// biz request qilib unversal qilshimiz mumkin va uni ichiga get post url va boshq narsalar yoza olamiz
        const {data} = await axios.request(options)
        return data
    } catch (error) {
        console.log("error", error);
    }
} 