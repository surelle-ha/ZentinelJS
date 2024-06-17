<div id="badges" align="center">
	<div align="center">
		<img src="https://64.media.tumblr.com/116c77d969e3c334de736e6e496d3279/tumblr_p1bo6rLBjM1v1b8nao1_540.gifv" width="200" height="200"/><br><br>
	</div>
</div>

<div align="center">
	<h1 style="letter-spacing: 7px">ZENTINEL.JS</h1>
</div>

Zentinel.JS is a backend boilerplate built on top of Express.JS, structured to mirror the Laravel directory format for a familiar setup. It includes Artisan-like commands called 'Zentinel' to streamline development tasks, offering a powerful toolset for efficient backend operations and seamless integration.

<div align="center">

![ExpressJS](https://img.shields.io/badge/Express.JS-black?style=for-the-badge&logo=express)
![NodeJS](https://img.shields.io/badge/Node.JS-black?style=for-the-badge&logo=node.js)
</div>

## Features
Below are the features of Zentinel.JS:
- Zentinel CLI
- Builtin Authentication using JSON Web Token.
- Builtin Role-Based Access Control as Authorization.
- Preconfigured Mongoose for MongoDB 
- Preconfigured Sequelize for MySQL
- Preconfigured Rate Limit, CORS, Helmet and Securities Modules
- Preconfigured Logs and PM2 Setup
- Interconnected MVC Components
- Sequelize UI / ORM Code Generator

## Installation
Installation via CommandLine Interface
```bash
npm i zentinel-cli --global
zentinel init

  _____                 _     _                  _
 |__  /   ___   _ __   | |_  (_)  _ __     ___  | |
   / /   / _ \ | '_ \  | __| | | | '_ \   / _ \ | |
  / /_  |  __/ | | | | | |_  | | | | | | |  __/ | |
 /____|  \___| |_| |_|  \__| |_| |_| |_|  \___| |_|

? Do you want to initialize a new ZentinelJS project? Yes
? Please enter the name of the project: TestProject
✔  Fetched Server Files
✔  Git directory removed.
✔  Environment file set up.
✔  NPM packages installed successfully.
✔  Project initialized successfully!

cd TestProject
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
zentinel dev
```

**Manual Installation via Github: To install and start developing with Zentinel, follow these steps:**

Clone the repository:
```bash 
git clone https://github.com/surelle-ha/zentineljs.git
cd zentineljs
npx rimraf ./.git
```
Navigate to the directory and install the dependencies using `npm`:
```bash 
npm install
```
Set the environment variables
```bash
cp .env.example .env
# open .env and modify the environment variables (if needed)
```
Create Database
```bash
npm run db:up
```
Migrate Database
```bash 
npx sequelize-cli db:migrate
# OR
npm run db:migrate
```
Seed Default Data
```bash 
npx sequelize-cli db:seed:all
# OR
npm run db:seed:all
```
Start Local Server
```bash
npm run dev # Development Environment
npm run prod # Production Environment
```
By Default, you'll see the Documentation as it's homepage. 
```bash
GET https://localhost:8800/
```
There are other extension modules I'm planning to implement. Right now, you can use the [ORM Builder](https://github.com/tomjschuster/sequelize-ui) installed in the Zentinel.
```bash
GET https://localhost:8800/orm-builder
```

## Commands
Create components using zentinel-cli
```bash
zentinel create
  _____                 _     _                  _
 |__  /   ___   _ __   | |_  (_)  _ __     ___  | |
   / /   / _ \ | '_ \  | __| | | | '_ \   / _ \ | |
  / /_  |  __/ | | | | | |_  | | | | | | |  __/ | |
 /____|  \___| |_| |_|  \__| |_| |_| |_|  \___| |_|

? Select component type to create (Use arrow keys)
❯ Controller
  Model
  Route
  Middleware
  All (Controller, Model, Route)
```
Run server 
```bash
zentinel [dev/prod]
```
Create Seeder File
```bash 
npx sequelize-cli seed:generate --name sample-seeder
```
Create Migration File
```bash 
npx sequelize-cli migration:generate --name sample-migration
```

## Recently Added
The Project is constantly being optimized and updated. Here are the new features I recently implemented.
- [2024/06/06] Rate Limit - a mechanism used to control the number of requests a server receives within a certain period of time. It helps to prevent abuse, ensure fair usage, and protect the server from being overwhelmed by excessive requests, which could lead to performance degradation or denial of service.
```js
/* Default Rate Limit Configuration */
const RateLimit = rateLimit({
    /* 15 minutes */
	windowMs: 15 * 60 * 1000, 

    /* Request Limit Per IP Per Window */
	limit: 100, 

    /* draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header */
	standardHeaders: 'draft-7',

    /* Disable the `X-RateLimit-*` headers */
	legacyHeaders: false, 
})
```
- [2024/06/06] Sequelize ORM - Object/Relational Mapping (ORM) framework for Node. js applications. It enables JavaScript developers to work with relational databases, including support for features such as solid transaction support, relations, read replication, and more.
- [2024/06/08] Zentinel CLI is a commandline interface tool to manager and initialize Zentinel Backend Boilerplate. To learn more about ZentinelJS, visit the repository.
```bash
npm i zentinel-cli
zentinel --help
zentinel init
zentinel create
```
- [2024/06/12] Sequelize ORM Code Generator is added and can now be accessed on /orm-builder

## Goal Checklist
- [x] Add Rate Limit
- [x] Integrate Mongoose ORM
- [x] Integrate Sequelize ORM
- [x] Add Socket.io as Native Feature
- [x] Add Logger Utility - Pino
- [x] Recreate Zentinel CLI
- [x] Implement Migration and Seeding
- [x] Publish `zentinel-cli` to NPM
- [ ] Add Native Database Visualizer
- [ ] Launch Documentation Page
- [ ] Add Cron Job
- [ ] Add Custom Function
- [ ] Add Storage Driver Support
- [ ] Add Express Validator
- [ ] Add express-response-hooks
- [x] Restructure Directories
- [ ] Typescript Support
- [x] Sequelize ORM Code Generator added

## Developer
As a developer who constantly seeks to improve my development skills, my goal with Zentinel.JS is to create a powerful yet intuitive backend boilerplate that simplifies the development process for fellow developers. I aim to provide a toolset that makes backend operations more efficient and enjoyable, ensuring that developers can focus on building great applications without getting bogged down by repetitive tasks.

I envision Zentinel.JS as a go-to boilerplate for developers who appreciate the structure and convenience of Laravel but prefer to work within the Node.js ecosystem. By combining the best aspects of both worlds, I hope to foster a community where developers can share their experiences, contribute to the project's growth, and continuously improve their craft. Ultimately, Zentinel.JS will empower developers to create scalable, secure, and high-performance applications with ease, making backend development more accessible and enjoyable for everyone.

# Contributing to Zentinel.JS

We appreciate your interest in contributing to our project. Zentinel.JS aims to provide a powerful and intuitive backend boilerplate, and contributions from developers like you help us achieve and maintain this goal.

## Quick Start for Contributors

To get started, here’s what you need to know:

### Code of Conduct
We prioritize creating a respectful and inclusive environment. Please review and adhere to our Code of Conduct to ensure a positive experience for all collaborators.

### Reporting Bugs
If you find a bug in the codebase:
1. **Check Existing Issues:** Verify if the issue has already been reported to avoid duplication.
2. **Create a Detailed Issue:** Include a descriptive title, a clear explanation of the problem, steps to reproduce, and the expected outcome.

### Feature Requests
To suggest a new feature:
1. **Search Existing Suggestions:** Check if someone else has already proposed something similar.
2. **Submit a New Issue:** Clearly describe the proposed feature, its benefits, and possible implementations.

## How to Contribute Code

### Setting Up Your Development Environment
1. **Fork the Repository:** Start by forking the Zentinel.JS repository on GitHub.
2. **Clone Your Fork:** Clone your forked repository to your local machine.
3. **Install Dependencies:** Navigate to the project directory and run `npm install` to install required dependencies.

### Making Changes
1. **Create a New Branch:** Use a branch specific to the feature or fix you are working on.
2. **Commit Changes:** Make your changes in the new branch. Commit messages should clearly explain the purpose of the changes.
3. **Write Tests:** Add or update tests to cover the new functionality or fixes. Ensure all tests pass.

### Pull Request Process
1. **Update Your Branch:** Rebase your branch on the latest main branch to ensure a smooth integration.
2. **Submit a Pull Request (PR):** Push your branch to GitHub and open a PR against the main branch of the original Zentinel.JS repository.
3. **Review Process:** The project maintainer will review your PR. Be open to making revisions based on feedback.
4. **PR Approval and Merge:** Once approved, the maintainers will merge your PR.

## Additional Resources
- **Documentation:** Familiarize yourself with the project documentation to understand how to use and extend Zentinel.JS.
- ~~**Community:** Join our community forums or chat channels to discuss ideas and ask questions.~~

## Acknowledgments
Contributors who help improve Zentinel.JS make a significant impact. We appreciate your dedication and effort in enhancing this project.

Thank you for choosing to contribute to Zentinel.JS. We look forward to your contributions!

<a href="https://github.com/surelle-ha/zentineljs/graphs/contributors">
<img src="https://contrib.rocks/image?repo=surelle-ha/zentineljs" />
</a>

