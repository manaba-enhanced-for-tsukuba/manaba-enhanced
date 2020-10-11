"use strict"

const path = require("path")
const admZip = require("adm-zip")
const zip = new admZip()

const packageVersion = require(path.join(__dirname, "../package.json")).version

zip.addLocalFolder(path.join(__dirname, "../build"))
zip.writeZip(path.join(__dirname, `../${packageVersion}.zip`))
