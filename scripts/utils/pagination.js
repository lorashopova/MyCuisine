function createImagesOnPage(array, pageNumber, imagesOnPageCount) {
    const newArray = array.slice((pageNumber - 1) * imagesOnPageCount, (pageNumber - 1) * imagesOnPageCount + imagesOnPageCount);
    return newArray;
}

function createPageIndeces(array, imagesOnPageCount) {
    const totalImages = array.length;
    const buttonsCount = Math.ceil(totalImages / imagesOnPageCount);
    const arrayImg = [];
    for (let i = 1; i <= buttonsCount; i++) {
        arrayImg.push(i);
    }

    return arrayImg;
}

const pagination = {
    createImagesOnPage,
    createPageIndeces
};

export { pagination };

