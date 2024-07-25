const fs = require('fs');
const path = require('path');

function generateController(controllerName) {
    const template = `module.exports = function (app) {
    const Controller = {
        name: "${controllerName}",
    };

    Controller.name = async (req, res) => {
        return res.status(200).json({ user_loggedin: req.user.id });
    };

    return Controller;
    };
    `;

    return template;
}

function generateModel(modelName) {
    const template = `const mongoose = require('mongoose');

const ${modelName}Schema = new mongoose.Schema({
    // Define your schema fields here
});

const ${modelName} = mongoose.model('${modelName}', ${modelName}Schema);

module.exports = ${modelName};
    `;

    return template;
}

function generateRoute(routeName) {
    const template = `const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello from ${routeName} route!');
});

module.exports = router;
    `;

    return template;
}

function generateFile(type, name) {
    let templateFunction, folderName, fileExtension;

    switch (type) {
        case 'controller':
            templateFunction = generateController;
            folderName = 'controllers';
            fileExtension = '.Controller.js';
            break;
        case 'model':
            templateFunction = generateModel;
            folderName = 'models';
            fileExtension = '.Sequelize.js';
            break;
        case 'route':
            templateFunction = generateRoute;
            folderName = 'routes';
            fileExtension = '.Route.js';
            break;
        default:
            console.error(`Invalid component type '${type}'.`);
            return;
    }

    const template = templateFunction(name);
    const componentFolderPath = path.join(__dirname, '..', 'app', folderName);
    const componentFilePath = path.join(componentFolderPath, `${name}${fileExtension}`);

    if (!fs.existsSync(componentFolderPath)) {
        fs.mkdirSync(componentFolderPath, { recursive: true });
    }

    fs.writeFileSync(componentFilePath, template);

    console.log(`Created ${type} '${name}' successfully at ${componentFilePath}`);
}

const args = process.argv.slice(2);
const type = args[0];
const name = args[1];

if (!type || !name) {
    console.error('Please provide both a type and a name for the component.');
    process.exit(1);
}

generateFile(type, name);
