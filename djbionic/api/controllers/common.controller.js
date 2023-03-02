const { NotFound } = require("../utils/error");
const { GeneralResponse } = require("../utils/response");

exports.getApiDocs = (req, res, next) => {
    try {
        const apiDocsFolder = process.env.API_DOCS_FOLDER_PATH;
        const fs = require('fs');
        let listofFiles = [];
        fs.readdirSync(apiDocsFolder).forEach(file => {
            listofFiles.push(file)
        })
        next(new GeneralResponse('Record found!', listofFiles));
    } catch (error) {
        next(new NotFound('No record found!',error));
    }
}