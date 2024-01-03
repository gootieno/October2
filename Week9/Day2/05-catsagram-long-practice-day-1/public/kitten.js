const kittenContainer = async () => {
    // kitten heading 
    
    // fetch from cat api
    const imgUrl = await getKittenImage()
    img.src = imgUrl
}

const getKittenImage = async () => {
    // returns kitten image url
}