'use strict'

function inputValidate(input, validationStructure) {
    const missingKeys = []
    for(let key in validationStructure) {
        if (key in input) validateKey(key, input[key], validationStructure[key])
        else missingKeys.push(key)
    }   
    checkMissingKeys(missingKeys)
    return true
}

function validateKey(key, input, validator) {
    if(validator(input) !== true) throw Error(`Incorrect value in key: ${key}`)
}

function checkMissingKeys(missingKeys) {
    if(missingKeys.length > 0) throw Error(`Keys missing: ${missingKeys.join(', ')}`)
}

module.exports = {inputValidate}