export const webhook = async (url: string, object: any) => {
    await fetch(url, {
        body: JSON.stringify(object),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};