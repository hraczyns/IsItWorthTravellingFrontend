const api = "https://isitworthtravelling-backend.herokuapp.com"

const restService = {
    get: async (url) => {
        return await fetch(api + url)
            .then(res => res.json())
    }
}

export default restService;
