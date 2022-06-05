import fs from 'fs';
import { parse } from 'fast-csv';
import { githubRepoData } from './getGitHubRepoData.js';
import chalk from 'chalk';

export const getUpdateFile = async(fileName, packageV) => {
    // the below condition checks if the file is CSV or not
    if(fileName.slice(-4) !== '.csv') {
        console.log(chalk.bgRed("Please enter a CSV file only!"));
        return ;
    }

    // the below condition checks for the exisitence of the CSV file
    const path = `./${fileName}`;
    if (!fs.existsSync(path)) {
        console.log(chalk.bgRed(`The file ${fileName} does not exist!`));
        return ;
    }

    const [ packageName, packageVersion ] = packageV.split('@');

    console.log("File Name: " + chalk.greenBright(fileName));
    console.log("Package Name: " + chalk.greenBright(packageName));
    console.log("Package Version: " + chalk.greenBright(packageVersion));

    // the below code is parsing the given CSV file and getting data in an array
    let rows = []
    fs.createReadStream(`./${fileName}`)
    .pipe(parse({ headers: true }))
    .on('error', error => console.error(error))
    .on("data", row => {
        rows.push(row);
    })
    .on('end', rowCount => {
        console.log(`Parsed ${rowCount} rows`);
        githubRepoData(rows, packageName, packageVersion, "update");
    });
}