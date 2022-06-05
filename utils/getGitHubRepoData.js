import 'dotenv/config'
import fetch from "node-fetch";
import { table } from 'table';
import chalk from 'chalk';
import fs from 'fs';
import { stringify } from 'csv-stringify';

import { Octokit } from "@octokit/rest";
const octokit = new Octokit({ auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN });

async function checkDependecy(data, packageName, packageVersion) {
    let actualVersion = "";
    if(data.devDependencies) {
        actualVersion = data.devDependencies[packageName];
    } else {
        actualVersion = data.dependencies[packageName];
    }
    
    /*
    Any package version is of the form x.x.x with 3 important components:
        -- Patch releases: 1.0 or 1.0.x or ~1.0.4
        -- Minor releases: 1 or 1.x or ^1.0.4
        -- Major releases: * or x

    Here we'll be removing the ^ or ~ from the starting of the version & further check
    */
    if(actualVersion[0] === '^' || actualVersion[0] === '~') actualVersion = actualVersion.slice(1);
    const [ major, minor, patch ] = actualVersion.split('.');
    const [ majorC, minorC, patchC ] = packageVersion.split('.');

    if(major >= majorC)
        if(minor >= minorC)
            if(patch >= patchC)
                return { data, status: true, actualVersion }
    return { data, status: false, actualVersion }
}

async function getPackageFile(repoName, packageName, packageVersion) {
    try {
        const url = `https://raw.githubusercontent.com/${process.env.GITHUB_USERNAME}/${repoName}/main/package.json`
        let options = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`
            }
        }

        let fetchRes = fetch(url, options);
        let data = await fetchRes.then(res =>
            res.json()).then(jsonData => {
                return jsonData;
            }
        )

        const flag = checkDependecy(data, packageName, packageVersion);
        return flag;

    } catch(error) {
        console.error(error);
    }
}

const generateCLITable = (repos, command) => {
    let data = [];
    for(const repo of repos) {
        // console.log(repo)
        let d = [];
        d.push(repo.name, repo.repo, repo.version, repo.version_satisfied ? chalk.greenBright(repo.version_satisfied) : chalk.redBright(repo.version_satisfied));
        if(command === "update") d.push(repo.update_pr);
        data.push(d);
    }
  
    const config = {
        columnDefault: {
        width: 15,
        },
        header: {
            alignment: 'center',
            content: 'OUTPUT',
        },
    }
  
    console.log(table(data, config));
}

const generateCSV = (repos, command) => {
    let filename = command !== "update" ? "output.csv" : "output1.csv";
    const writableStream = fs.createWriteStream(filename);

    const columns = [
        "name",
        "repo",
        "version",
        "version_satisfied"
    ];

    if(command === "update") columns.push("update_pr");

    const stringifier = stringify({ header: true, columns: columns });
    for(const repo of repos) {
        let row = [];
        row.push(repo.name, repo.repo, repo.version, repo.version_satisfied ? "true": "false");
        if(command === "update") row.push(repo.update_pr);
        stringifier.write(row);
    }

    stringifier.pipe(writableStream);
    console.log(`Finished writing data into ${filename}`);
}

const sendPR = async(repo) => {
    /*
    To generate a PR 7 steps are required:
        1. Creating a new branch in the repo
        2. GET sha-latest-commit from the base branch (assuming it is main) from /repos/{owner}/{repo}/git/ref/heads/{new-branch-name}
        3. GET sha-base-tree from  /repos/{owner}/{repo}/git/commits/{sha-latest-commit}
        4. POST /repos/{owner}/{repo}/git/trees  with 
            body = 
                {
                    "base_tree": {sha-base-tree},
                    "tree": [
                        {
                        "path": "NewFile1.txt",
                        "mode": "100644",
                        "type": "blob",
                        "content": "This is NewFile1."
                        }
                    ]
                }}
            It returns sha-new-tree
        5. POST  /repos/dakshsethi/Shopee/git/commits
            body = 
            {
                "parents": [{sha-latest-commit}],
                "tree": {sha-new-tree},
                "message": {message}
            }
            It returns sha-new-commit
        6. POST https://api.github.com/repos/dakshsethi/Shopee/git/refs/heads/fix
            body =
            {
                "sha": {sha-new-commit}
            }
    */
    
    if(repo.version_satisfied) return "";

    const url1 = `https://api.github.com/repos/${process.env.GITHUB_USERNAME}/${repo.name}/git/ref/heads/fix`
    let options1 = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`
        }
    }
    const response1 = await fetch(url1, options1);
    const jsonResponse1 = await response1.json();
    const sha_latest_commit = await jsonResponse1.object.sha;
    // console.log("URL1 = GET " + url1);
    // console.log(chalk.bgGreen("sha latest commit = " + sha_latest_commit));

    const url2 = `https://api.github.com/repos/${process.env.GITHUB_USERNAME}/${repo.name}/git/commits/${sha_latest_commit}`;
    const response2 = await fetch(url2, options1);
    const jsonResponse2 = await response2.json();
    const sha_base_tree = await jsonResponse2.tree.sha;
    // console.log("URL2 = GET " + url2);
    // console.log(chalk.bgGreen("sha base tree = " + sha_base_tree));

    const url3 = `https://api.github.com/repos/${process.env.GITHUB_USERNAME}/${repo.name}/git/trees`;
    const body3 =
        {
            "base_tree": sha_base_tree,
            "tree": [
              {
                "path": "NewFile3.txt",
                "mode": "100644",
                "type": "blob",
                "content": "Hi i was just created using API"
              },
              {
                "path": "NewFile2.txt",
                "mode": "100644",
                "type": "blob",
                "content": "This is NewFile2."
              }
            ]
        };
    let options3 = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`
        },
        body: JSON.stringify(body3)
    }
    const response3 = await fetch(url3, options3);
    const jsonResponse3 = await response3.json();
    const sha_new_tree = await jsonResponse3.sha;
    // console.log("URL3 = POST " + url3);
    // console.log(chalk.bgGreen("sha new tree = " + sha_new_tree));

    const url4 = `https://api.github.com/repos/${process.env.GITHUB_USERNAME}/${repo.name}/git/commits`;
    const body4 =
        {
            "parents": [sha_latest_commit],
            "tree": sha_new_tree,
            "message": "Modifying 2 new files"
        };
    let options4 = {
        method: 'POST',
        headers: {
           'Authorization': `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`
        },
        body: JSON.stringify(body4)
    }
    const response4 = await fetch(url4, options4);
    const jsonResponse4= await response4.json();
    const sha_new_commit = jsonResponse4.sha;
    // console.log("URL4 = POST " + url4);
    // console.log(chalk.bgGreen("sha new commit = " + sha_new_commit));

    const url5 = `https://api.github.com/repos/${process.env.GITHUB_USERNAME}/${repo.name}/git/refs/heads/fix`;
    const body5 =
        {
            "sha": sha_new_commit
        };
    let options5 = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`
        },
        body: JSON.stringify(body5)
    }
    const response5 = await fetch(url5, options5);
    const jsonResponse5= response5.status;
    // console.log("URL5 = POST " + url5);
    // console.log(chalk.bgGreen("Reponse status = " + jsonResponse5));

    const url6 = `https://api.github.com/repos/${process.env.GITHUB_USERNAME}/${repo.name}/pulls`;
    const body6 = 
        {
            "title": "chore: updates axios to 0.23.0",
            "body": "Updates the version of axios from `0.21.1` to `0.23.0`",
            "head": "fix",
            "base": "main"
        };
    let options6 = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`
        },
        body: JSON.stringify(body6)
    }
    const response6 = await fetch(url6, options6);
    const jsonResponse6= await response6.json();
    const prURL = jsonResponse6.html_url;
    // console.log(chalk.bgBlue("PR URl = " + prURL));
    
    return prURL;
}

export const githubRepoData = async(repos, packageName, packageVersion, command) => {
    // just to check if the user is able to login
    try {
    const { data: { login } } = await octokit.rest.users.getAuthenticated();
    console.log("Hello %s", login);
    } catch(error) {
        console.log(chalk.bgRed("Error in Logging you in!! Check your Personal Access Token"))
        return ;
    }

    // checking each repo by iteration
    for(let repo of repos) {
        const repoURL = repo.repo;
        let repoName = repoURL.split('/');
        repoName = repoName[repoName.length - 1];
        if (repoName === "") {
            repoName = repoURL.split('/');
            repoName = repoName[repoName.length - 2];
        }

        let result = await getPackageFile(repoName, packageName, packageVersion);
        repo.version = result.actualVersion;
        repo.version_satisfied = result.status;
        repo.data = result.data;

        if(command === "update") {
            repo.update_pr = await sendPR(repo);
        }
    }

    generateCLITable(await repos, command);
    generateCSV(await repos, command);
}