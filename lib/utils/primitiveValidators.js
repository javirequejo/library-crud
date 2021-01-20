'use strict'

function string(param) {
	return typeof param === "string"
}

function boolean(boolean) {
    return typeof boolean === "boolean"
}

function int(int) {
	return typeof int === "number"
}

function array(array) {
	return Array.isArray(array)
}

module.exports = {
    string, boolean, int, array
}