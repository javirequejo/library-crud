'use strict'
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
const { assert, expect } = chai
const sinon = require('sinon')
const titleService = require('../../lib/services/title.service')
const titleRepository = require('../../lib/repository/title.repository')
const authorTitleRepository = require('../../lib/repository/authorTitle.repository')
const authorRepository = require('../../lib/repository/author.repository')
const formatRepository = require('../../lib/repository/format.repository')

describe('Title Service', () => {
    afterEach(() => {
        sinon.restore()
    })

    const newTitle = {
        isbn: "487474476446",
        title: "Harry Potter",
        description: "Magic wizard",
        publication_date: "2001-10-01",
        format: 1,
        authors: [1]
    }
    const titleCreated = {
        id: 1,
        isbn: "487474476446",
        title: "Harry Potter",
        description: "Magic wizard",
        publication_date: "2001-10-01",
        format: {
            id: 1,
            code: "01",
            description: "Fiction"
        },
        authors: [
            {
                id: 1,
                first_name: "JK",
                last_name: "Rowling",
                email: "jk.rowling@gmail.com",
                phone: "7515124598"
            }
        ]
    }
    const titlesList = [
        {
            id: 1,
            isbn: "487474476446",
            title: "Harry Potter",
            description: "Magic wizard",
            publication_date: "2001-10-01",
            format: {
                id: 1,
                code: "01",
                description: "Fiction"
            },
            authors: [
                {
                    id: 1,
                    first_name: "JK",
                    last_name: "Rowling",
                    email: "jk.rowling@gmail.com",
                    phone: "7515124598"
                }
            ]
        }
    ]
    const authorTitle = [{
        id: 1,
        title_id: 1,
        author: 1
    }]
    const author = {
        id: 1,
        first_name: 'JK',
        last_name: 'Rowling',
        email: 'jk.rowling@gmail.com',
        phone: '7564748494'
    }
    const format = {
        id: 1,
        code: '01',
        description: 'Fiction'
    }

    describe('Get all titles', () => {
        it('Returns the titles list', async () => {
            const readAllStub = sinon.stub(titleRepository, "readAll")
            readAllStub.returns(titlesList)
            const readAuthorTitlesByTitleStub = sinon.stub(authorTitleRepository, "readAuthorTitlesByTitle")
            readAuthorTitlesByTitleStub.returns(authorTitle)
            const readAuthorByIdStub = sinon.stub(authorRepository, "readAuthorById")
            readAuthorByIdStub.returns(author)
            const readFormatByIdStub = sinon.stub(formatRepository, "readFormatById")
            readFormatByIdStub.returns(format)
    
            const result = await titleService.getAllTitles()
            assert.isTrue(readAllStub.called)
            assert.isTrue(readAuthorTitlesByTitleStub.called)
            assert.isTrue(readAuthorByIdStub.called)
            assert.isTrue(readFormatByIdStub.called)
            assert.isDefined(result)
            assert.equal(result.length, 1)
        })
    })

    describe('Create a new title', () => {
        it('Create a new title correctly', async () => {
            const readFormatByIdStub = sinon.stub(formatRepository, "readFormatById")
            readFormatByIdStub.returns(format)
            const readAuthorByIdStub = sinon.stub(authorRepository, "readAuthorById")
            readAuthorByIdStub.returns(author)
            const writeTitleStub = sinon.stub(titleRepository, "writeTitle")
            writeTitleStub.returns(titleCreated)
            const writeAuthorTitleStub = sinon.stub(authorTitleRepository, "writeAuthorTitle")
            const readAuthorTitlesByTitleStub = sinon.stub(authorTitleRepository, "readAuthorTitlesByTitle")
            readAuthorTitlesByTitleStub.returns(authorTitle)

            const result = await titleService.createNewTitle(newTitle)
            assert.isDefined(result)
            assert.isTrue(readFormatByIdStub.called)
            assert.isTrue(readAuthorByIdStub.called)
            assert.isTrue(writeTitleStub.called)
            assert.isTrue(writeAuthorTitleStub.called)
            assert.equal(result.id, titleCreated.id)
            assert.equal(result.isbn, titleCreated.isbn)
        })

        it('Returns error because the format is not found', async () => {
            const readFormatByIdStub = sinon.stub(formatRepository, "readFormatById")
            await expect(titleService.createNewTitle(newTitle)).to.be.rejectedWith(Error)
        })
    })
})