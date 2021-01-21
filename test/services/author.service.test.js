'use strict'
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
const { assert, expect } = chai
const sinon = require('sinon')
const authorService = require('../../lib/services/author.service')
const authorRepository = require('../../lib/repository/author.repository')

describe('Author Service', () => {
    afterEach(() => {
        sinon.restore()
    })

    describe('Get all authors', () => {
        it('Returns the authors list', async () => {
            const authorsList = [
                {
                    first_name: 'John',
                    last_name: 'Smith',
                    email: 'j.smith@gmail.com',
                    phone: '7567568345'
                },
                {
                    first_name: 'JK',
                    last_name: 'Rowling',
                    email: 'jk.rowling@gmail.com',
                    phone: '7564748494'
                }
            ]
            const readAllStub = sinon.stub(authorRepository, "readAll")
            readAllStub.returns(authorsList)
    
            const result = await authorService.getAllAuthors()
            assert.isDefined(result)
            assert.equal(result.length, 2)
        })
    })

    describe('Create a new author', () => {
        it('Create a new author correctly', async () => {
            const newAuthor = {
                first_name: 'John',
                last_name: 'Smith',
                email: 'j.smith@gmail.com',
                phone: '7567568345'
            }
            const authorCreated = {
                id: 36,
                first_name: 'John',
                last_name: 'Smith',
                email: 'j.smith@gmail.com',
                phone: '7567568345'
            }

            const writeAuthorStub = sinon.stub(authorRepository, "writeAuthor")
            writeAuthorStub.returns(authorCreated)

            const result = await authorService.createNewAuthor(newAuthor)
            assert.isDefined(result)
            assert.equal(result.id, authorCreated.id)
            assert.equal(result.first_name, authorCreated.first_name)
        })
    })

    describe('Update an existing author', () => {
        const authorToUpdate = {
            first_name: 'John',
            last_name: 'Hopkins',
            email: 'j.hopkins@gmail.com',
            phone: '7567568345'
        }
        const existingAuthor = {
            id: 36,
            first_name: 'John',
            last_name: 'Smith',
            email: 'j.smith@gmail.com',
            phone: '7567568345'
        }
        const authorUpdated = {
            id: 36,
            first_name: 'John',
            last_name: 'Hopkins',
            email: 'j.hopkins@gmail.com',
            phone: '7567568345'
        }

        it('Updates a new author correctly', async () => {
            const readAuthorByIdStub = sinon.stub(authorRepository, "readAuthorById")
            readAuthorByIdStub.returns(existingAuthor)
            const updateAuthorStub = sinon.stub(authorRepository, "updateAuthor")
            updateAuthorStub.returns(authorUpdated)

            const result = await authorService.updateAuthor(36, authorToUpdate)
            assert.isDefined(result)
            assert.equal(result.id, authorUpdated.id)
            assert.equal(result.email, authorUpdated.email)
        })

        it('Throws an error if the ID is not found', async () => {
            const updateAuthorStub = sinon.stub(authorRepository, "updateAuthor")
            updateAuthorStub.returns(authorUpdated)

            await expect(authorService.updateAuthor(42, authorToUpdate)).to.be.rejectedWith(Error)
        })
    })

    describe('Deletes an existing author', () => {
        const existingAuthor = {
            id: 36,
            first_name: 'John',
            last_name: 'Smith',
            email: 'j.smith@gmail.com',
            phone: '7567568345'
        }
        it('Deletes an existing author correctly', async () => {
            const readAuthorByIdStub = sinon.stub(authorRepository, "readAuthorById")
            readAuthorByIdStub.returns(existingAuthor)
            const deleteAuthorStub = sinon.stub(authorRepository, "deleteAuthor")

            await authorService.deleteAuthor(36)
            assert.isTrue(deleteAuthorStub.called)
        })
    })
})