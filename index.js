const axios = require("axios");
const cheerio = require("cheerio");

const { downloadImage } = require("./utils");

const baseURL = "https://icanhas.cheezburger.com/";

[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((page) => {
    let url = page == 1 ? `${baseURL}` : `${baseURL}/page/${page}`;
    axios.get(url).then((resp) => {
        const $ = cheerio.load(resp.data);
        Object.values($(".resp-media")).forEach((e, i) => {
            let imageName = `image-${page}-${i}.jpeg`;
            if (typeof e !== "object") return;
            let attribs = e.attribs ? e.attribs : null;
            if (attribs) {
                downloadImage(
                    attribs.class.includes("lazyload")
                        ? attribs["data-src"]
                        : attribs.src,
                    imageName
                );
            }
            return;
        });
    });
});
