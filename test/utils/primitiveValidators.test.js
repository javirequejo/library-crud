'use strict'
const chai = require('chai')
const assert = chai.assert
const primitiveValidators = require('../../lib/utils/primitiveValidators')

describe('Validators', () => {
    describe('String', () => {
        it ('Test String validator returns true for a string', () => {
            assert.isTrue(primitiveValidators.string("I'm a String!"))
        })

        it ('Test String validator returns false for a non string', () => {
            assert.isFalse(primitiveValidators.string([]))
        })
    })
    describe('Boolean', () => {
        it ('Test Boolean validator returns true for a boolean', () => {
            assert.isTrue(primitiveValidators.boolean(true))
        })

        it ('Test Boolean validator returns false for a number', () => {
            assert.isFalse(primitiveValidators.boolean(2))
        })
    })
    describe('Int', () => {
        it ('Test Int validator returns true for an number', () => {
            assert.isTrue(primitiveValidators.int(3343))
        })

        it ('Test Int validator returns false for a string', () => {
            assert.isFalse(primitiveValidators.int('Only a string'))
        })
    })
    describe('Array', () => {
        it ('Test Array validator returns true for a valid array', () => {
            assert.isTrue(primitiveValidators.array([1, 2, 3, 4, 5]))
        })

        it ('Test Array validator returns false for a number', () => {
            assert.isFalse(primitiveValidators.array(2))
        })
    })
})