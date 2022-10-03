import sql from 'mssql' 

const sqlConfig = {
    user: "admin", 
    password: "here£3",
    server: "LAPTOP-57R2GNSV",
    // server: '127.0.0.1',
    database: "SnakesLadders",
    options: {
        trustedconnection: true, 
        trustServerCertificate: true,
        enableArithAbort: true, 
        instancename: "57R2GNSV",
    },
    port: 1433
}

export const getUserIfExisits = async (username, password) => {
    let pool = await sql.connect(sqlConfig)
    let res = await pool.request().query(`SELECT * FROM users WHERE username=\'${username}\' AND password=\'${password}\'`)
    // let res = await pool.request().query(`SELECT * FROM users WHERE username=\'${username}\' AND password=\'${password}\'`)
    console.log(res)
    pool.close()
    return res.recordset[0]
}