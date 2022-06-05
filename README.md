[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-c66648af7eb3fe8bc4f294546bfd86ef473780cde1dea487d3c4ff354943c9ae.svg)](https://classroom.github.com/online_ide?assignment_repo_id=7945207&assignment_repo_type=AssignmentRepo)
<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">VBot - DYTE SDK Tooling Challenge</h3>

  <p align="center">
    VBot is a command line interface (CLI) tool that can help you manage versions of the packages that are used within your repositories. VBot provides you with 2 simple in-built commands to detect any version anamoly and can send PR to correct it.
    <br />
    <a href="https://github.com/dyte-submissions/dyte-vit-2022-dakshsethi"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/dyte-submissions/dyte-vit-2022-dakshsethi">View Demo</a>
    ·
    <a href="https://github.com/dyte-submissions/dyte-vit-2022-dakshsethi/issues">Report Bug</a>
    ·
    <a href="https://github.com/dyte-submissions/dyte-vit-2022-dakshsethi/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Screenshot][product-screenshot]]()

The project can simply be started by calling the CLI name `vbot` in your terminal. In my case i am using `Windows Powershell` here. The above screenshot shows the `options` and the `commands` of this CLI tool.

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

* [Node.js](https://nodejs.org/)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started
### Prerequisites
* Node.js - install the latest version of it.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/dyte-submissions/dyte-vit-2022-dakshsethi
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. In the root directory of your project, create an environment file by the name `.env`
4. Go to profile page of Github - https://github.com/settings/profile
5. Click on Developer Options in the bottom of the left side-bar.
  [![Developer Options][developer-settings]]()
6. Select `Personal access tokens`
7. Click on `generate new token`
8. Enter your GitHub Password
9. Do this as the below image [![Options][options]]()
10. Click on `Generate token`
11. Copy the Generated Personal Access Token
    [![PAT][pat-code]]()
  <br>
12. Open the `.env` file and it should look like this
   [![ENV File][env-file]]()

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

This is how you can use this CLI tool directly through the terminal.

Open the root directory of the project
```sh
cd repo
npm install vbot
npm install -g .
```

After successfull install now the CLI tool can be directly in the terminal.

Open the terminal and type
```bash
vbot
```
[![Product Screenshot][product-screenshot]]()

<b>Note: </b>
If the above command `vbot` gives error like this:
[![error][error-msg]]()
Then you can navigate to the root folder and simply type this command
```sh
node bin/index.js
```
[![error sort][error-resolved]]()


<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

#### 1. Input File
This is the 1st command of the `SDK Tooling Challenge`
Steps:
  - Go to project directory
  - Paste the CSV file in the root of this directory
  - run the below command in the terminal
  ```bash
    vbot i input.csv react@17.0.2 
  ```

  This produces this output in the terminal
  [![input command][input-command]]()

  This generates a CSV file `output.csv` like this:
  [![output csv file][output-csv]]()
#### 2. Update PR File
**Note:** This function requires that a `fix` branch exists right now in the repositories. As i tried working on `Creating Branch using GitHub API` but due to some errors and technical glitch, it was not working. Also due to lack of time as the project was very tedious, i am able to commit 2 new files with the help of `GitHub API` and call a PR request but not `package.json` as of right now. If given enough time, this issue will be resolved later on.

This is the 2nd command of the `SDK Tooling Challenge`
Steps:
  - Go to project directory
  - Paste the CSV file in the root of this directory
  - run the below command in the terminal
  ```bash
    vbot u i input.csv react@17.0.4 
  ```

  This produces following output
  [![update command][update-command]]()
  The URLs and sha are just for the reference of understanding as multiple back-to-back API calls are fired just to commit and open up a PR in the `fix` branch.

  This can be checked in the Repo Pull page too:
  [![Pull Request][PR]]()

  This generates an `output1.csv` file too:
  [![output csv file][output1-csv]]()



See the [open issues](https://github.com/github_username/repo_name/issues) for a full list of proposed features (and known issues).

**Note:** Basic error handling is made available in the project.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License.
<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Daksh Sethi - [@sethidaksh02](https://twitter.com/sethidaksh02) - sethidaksh02@gmail.com

Project Link: [https://github.com/dyte-submissions/dyte-vit-2022-dakshsethi](https://github.com/dyte-submissions/dyte-vit-2022-dakshsethi)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/initial.png
[developer-settings]: images/developer-settings.png
[options]: images/options.png
[pat-code]: images/pat-code.png
[env-file]: images/env-file.png
[error-msg]: images/error.png
[error-resolved]: images/error-resolved.png
[input-command]: images/input-command.png
[output-csv]: images/output-csv.png
[update-command]: images/update-command.png
[PR]: images/PR.png
[output1-csv]: images/output1-csv.png