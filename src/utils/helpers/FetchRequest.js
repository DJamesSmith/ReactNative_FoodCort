import constants from "./constants";

export async function fetchPost(url, payload, header) {
    console.log('fetchPost: ', `${constants.BASE_URL}/${url}`, header, payload)


    // return await fetch(`${constants.BASE_URL}/${url}`, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'multipart/form-data',
    //         // Accept: header.Accept,
    //         // 'Content-Type': header.contenttype,
    //         // 'x-access-token': header.accesstoken,
    //         // Authorization: 'Bearer' + ' ' + header.accesstoken,
    //     },
    //     body: payload,
    // });

    const response = await fetch(`${constants.BASE_URL}/${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        body: payload,
    });

    const data = await response.json();
    console.log('response -- ', response);
    console.log('Registration response:', data);

    // return await {};
}