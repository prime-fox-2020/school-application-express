'use strict';

const fs = require('fs');

class DatabaseCreation {
    static queryCommand(path, callback) {
        fs.readFile(path, 'utf8', (err, datas) => {
            if (err) console.log(err);
            else {
                // get the file name
                let slashIndex = 0;
                let dotIndex = 0; 
                for (let i = 0; i < path.length; i++) {
                    if (path[i] == '/') {slashIndex = i;}
                    else if (path[i] == '.') {dotIndex = i;}
                }
                const tableName = path.slice(slashIndex+1, dotIndex);
                
                datas = JSON.parse(datas); //
                const identifier = Object.keys(datas[0]); //
                const dataSample = Object.values(datas[0]); //

                let insert_query = `INSERT INTO ${tableName} (`;
                let create_query = `CREATE TABLE ${tableName} (`; //
                const var_type = [];
                const var_length = [];
        
                for (let [i, property] of identifier.entries()) {
                    if (identifier[i] != 'id') {
                        insert_query += property;
                        if (i != identifier.length -1) insert_query += ', ';
                    }
                    // Check data type (character or number)
                    if (isNaN(Number(dataSample[i]))) var_type.push('CHAR');
                    else var_type.push('INTEGER');
                    var_length.push(0);
                }
        
                insert_query += ') VALUES ';
                for (let [index, entries] of datas.entries()) {
                    // entries = entries.split(',');
                    entries = Object.values(entries);
                    insert_query += '(';
                    for (let [i, data] of entries.entries()) {
                        if (identifier[i] != 'id') {
                            if (typeof data == 'number') insert_query += `${data}`;
                            else insert_query += `'${data}'`;
                            if (i != entries.length-1) insert_query += ', ';
                            // Check if CHAR or VARCHAR or INTEGER OR REAL
                            if (var_type[i] == 'VARCHAR' && data.length > var_length[i]) {
                                var_length[i] = data.length;
                            } else if (var_type[i] == 'INTEGER' && data%1 != 0) {
                                var_type[i] = 'REAL';
                            } else if (var_type[i] == 'CHAR' && data.length > 1) {
                                var_type[i] = 'VARCHAR';
                                var_length[i] = data.length;
                            }
                        }
                    }
                    insert_query += ')';
                    if (index != datas.length-1) insert_query += ', ';
                }
        
                for (let i in var_type) { // Primary Key
                    create_query += `${identifier[i]} ${identifier[i] == 'id' ? 'SERIAL PRIMARY KEY' : `${var_type[i]}`}${var_type[i] == 'VARCHAR' ? `(${var_length[i]})` : ''}${i != var_type.length-1 ? ', ': ')'}`;
                }
                callback(null, [create_query, insert_query]);
                // console.log(create_query);
                // console.log(insert_query);
            } 
        });
    }
    
    static makeTable(queryCommand, client, callback) {
        const create_query = queryCommand[0];
        const insert_query = queryCommand[1];
        client.query(create_query, (err, result) => {
            if (err) console.log(err);
            else {
                console.log(result);
                client.query(insert_query, (err, result) => {
                    if (err) console.log(err);
                    else 
                        console.log(result);
                        callback();
                    });
                }
        });
    }

    static convertToDB(filesPath, client) {
        const promise = [];
        for (let path of filesPath) {
            this.queryCommand(path, (err, data) => {
                if (err) console.log(err);
                else {
                    if (path == filesPath[0]) client.connect();
                    this.makeTable(data, client, () => {
                        promise.push(true);
                        if (promise.length == filesPath.length) client.end();
                    });
                }
            });
        }
    }
}

// DatabaseCreation.queryCommand('./datas/subjects.json'); // Test
module.exports = DatabaseCreation;