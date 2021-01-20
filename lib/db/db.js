'use strict'
const mysql = require('mysql')
const config = require('./db.config')

const db = {
    connection: undefined,
    dataBaseName: config.DB_NAME,
    host: config.DB_HOST,
    port: config.DB_PORT,
    user: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    getConnection: () => {
        if (db.connection === undefined){
            db.connection = mysql.createConnection({
                host: db.host,
                user: db.user,
                port: db.port,
                password: db.password,
                database: db.dataBaseName
            })
            db.connection.on('error',()=>{})
            db.connection.connect()
        }
        return db.connection
    },
    closeConnection: async ()=>{
        if(db.connection!==undefined){
            await db.connection.end()
            db.connection=undefined
        }
    },
    startTransaction:async ()=>{
        await db.executeQuery('START TRANSACTION')
    },
    rollbackTransaction: async ()=>{
        await db.executeQuery('ROLLBACK')
    },
    commitTransaction: async ()=>{
        await db.executeQuery('COMMIT')
    },
    executeQuery: (query) => {
        return new Promise((resolve, reject) => {
            db.connection = db.getConnection()
            db.connection.query(query, (error, res) => {
                if (error) {
                    reject(error)
                    return
                }
                if (res) {
                    resolve(res)
                }
            })
        })
    },
    executeQueryWithValuesAndAutoIncrement: async (query, values) =>{
        return new Promise((resolve, reject) => {
            db.connection = db.getConnection()
            db.connection.query(query,values, (error, res) => {
                if (error) {
                    reject(error)
                    return
                }
                if (res) {
                    if (res.constructor.name === 'OkPacket') {
                        resolve(res.insertId)
                    }
                    resolve(res)
                }
            })
        })
    },
    insert: async (query) => {
        const result = await db.executeQuery(query)
        if (result.constructor.name === 'OkPacket') {
            return result.insertId
        }
        return result
    },
    select: async (query) => {
        const result = await db.executeQuery(query)
        let obj = []
        if (Array.isArray(result)) {
            for (let u in result) {
                obj.push(Object.assign({}, result[u]))
            }
        }
        return obj
    }
}

module.exports = db
