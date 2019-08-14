module.exports = {
    filenameHashing: false,
    publicPath: "/app/",
    css: {
        extract: {
            filename: "[name].css",
            chunkFilename: "[name].css"
        },
        loaderOptions: {
            sass: {
                data: `
                    @import "@/styles/_color-style.scss";
                    @import "@/styles/_mixins.scss";
                `
            }
        }
    },
}