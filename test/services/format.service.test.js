'use strict'
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
const sinon = require('sinon')
const formatService = require('../../lib/services/format.service')
const formatRepository = require('../../lib/repository/format.repository')
const { assert, expect } = require('chai')

describe('Format Service', () => {
    afterEach(() => {
        sinon.restore()
    })

    describe('Get all formats', () => {
        it('Returns the format list', async () => {
            const formatsList = [
                {
                    id: 1,
                    code: '01',
                    description: 'Fiction'
                },
                {
                    id: 2,
                    code: '02',
                    description: 'Travel'
                },
            ]
            const readAllStub = sinon.stub(formatRepository, "readAll")
            readAllStub.returns(formatsList)
    
            const result = await formatService.getAllFormats()
            assert.isDefined(result)
            assert.equal(result.length, 2)
        })
    })

    describe('Create a new format', () => {
        it('Creates a new format correctly', async () => {
            const newFormat = {
                code: '12',
                description: 'Food'
            }
            const formatCreated = {
                id: 18,
                code: '12',
                description: 'Food'
            }
            const writeFormatStub = sinon.stub(formatRepository, "writeFormat")
            writeFormatStub.returns(formatCreated)

            const result = await formatService.createNewFormat(newFormat)
            assert.isDefined(result)
            assert.equal(result.id, formatCreated.id)
            assert.equal(result.code, formatCreated.code)
        })
    })

    describe('Update an existing format', () => {
            const formatToUpdate = {
                code: '12',
                description: 'Business'
            }
            const existingFormat = {
                id: 24,
                code: '12',
                description: 'Food'
            }
            const formatUpdated = {
                id: 24,
                code: '12',
                description: 'Business'
            }

        it('Updates a new format correctly', async () => {
            const readFormatByIdStub = sinon.stub(formatRepository, "readFormatById")
            readFormatByIdStub.returns(existingFormat)
            const updateFormatStub = sinon.stub(formatRepository, "updateFormat")
            updateFormatStub.returns(formatUpdated)

            const result = await formatService.updateFormat(24, formatToUpdate)
            assert.isDefined(result)
            assert.equal(result.id, formatUpdated.id)
            assert.equal(result.description, formatUpdated.description)
        })

        it('Throws an error if the ID is not found', async () => {
            const updateFormatStub = sinon.stub(formatRepository, "updateFormat")
            updateFormatStub.returns(formatUpdated)

            await expect(formatService.updateFormat(24, formatToUpdate)).to.be.rejectedWith(Error)
        })
    })

    describe('Deletes an existing format', () => {
        const existingFormat = {
            id: 24,
            code: '12',
            description: 'Food'
        }
        it('Deletes an existing format correctly', async () => {
            const readFormatByIdStub = sinon.stub(formatRepository, "readFormatById")
            readFormatByIdStub.returns(existingFormat)
            const deleteFormatStub = sinon.stub(formatRepository, "deleteFormat")

            await formatService.deleteFormat(24)
            assert.isTrue(deleteFormatStub.called)
        })
    })
})