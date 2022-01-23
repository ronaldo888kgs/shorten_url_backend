export const getLinks = async () => {
    let links = [];
    await axios.post('http://127.0.0.1:8000/api/links').then(res => {
        links = res.data;
    });
    return links;
}

export const deleteLink = async (id) => {
    let shortenUrl = '';
    const fd = new FormData();
    fd.append('id', id);
    await axios.post('http://127.0.0.1:8000/api/delete_link', fd).then(res => {shortenUrl = res.data});
    return shortenUrl;
}

export const shortenLink = async (originUrl) => {
    let shortenUrl = '';
    const fd = new FormData();
    fd.append('origin_url', originUrl);
    await axios.post('http://127.0.0.1:8000/api/shorten_link', fd).then(res => {shortenUrl = res.data});
    return shortenUrl;
}

export const editOriginLink = async (id, originUrl) => {
    let shortenUrl = '';
    const fd = new FormData();
    fd.append('id', id);
    fd.append('origin_url', originUrl);
    await axios.post('http://127.0.0.1:8000/api/edit_link', fd).then(res => {shortenUrl = res.data});
    return shortenUrl;
}

export const getOriginUrl = async(shortUrl) => {
    let origin_url= '';
    const fd = new FormData();
    fd.append('short_url', shortUrl);
    await axios.post('http://127.0.0.1:8000/api/origin_url', fd).then(res => {origin_url = res.data});
    return origin_url;
}