const restService = {
    get: async (url) => {
        return await fetch(url)
            .then(res => res.json())
    }
}

export default restService;
