#!/usr/bin/env bash

# Initialization
PROJECT="ZentinelJS"
REPOSITORY="https://github.com/surelle-ha/ZentinelJS"
BRANCH="main"
DIRECTORY="/var/www/html"
DEPENDENCY="wget curl git btop nodejs npm figlet"

# PREPARE
if ! sudo apt install $DEPENDENCY; then
    echo "[$( date '+%F_%H:%M:%S' )] Dependency installation failed."
    exit 1
fi

# CHECK IF GIT AUTHENTICATED
git ls-remote $REPOSITORY &> /dev/null
if [ $? -eq 0 ]; then
    echo "[$( date '+%F_%H:%M:%S' )] Git is authenticated."
else
    echo "[$( date '+%F_%H:%M:%S' )] Git is not authenticated."
    exit 1
fi

# DEPLOYMENT
clear
figlet $PROJECT
echo "[$( date '+%F_%H:%M:%S' )] Deployment started"

if [ ! -d "$DIRECTORY" ]; then
    mkdir -p "$DIRECTORY"
    echo "[$( date '+%F_%H:%M:%S' )] Directory $DIRECTORY created."
else
    echo "[$( date '+%F_%H:%M:%S' )] Directory $DIRECTORY already exists."
fi
cd $DIRECTORY

# IF PROJECT NOT EXIST
if [ ! -d "$PROJECT" ]; then

    echo "[$( date '+%F_%H:%M:%S' )] Clone project from the repository"
    if ! git clone $REPOSITORY; then
        echo "[$( date '+%F_%H:%M:%S' )] Failed to clone repository"
        exit 1
    fi

    cd $PROJECT

    echo "[$( date '+%F_%H:%M:%S' )] NPM installation started"
    if ! npm install; then
        echo "[$( date '+%F_%H:%M:%S' )] NPM install failed"
        exit 1
    fi

    echo "[$( date '+%F_%H:%M:%S' )] Create environment template"
    if ! cp .env.example .env; then
        echo "[$( date '+%F_%H:%M:%S' )] Creation environment template failed"
        exit 1
    fi

    echo "[$( date '+%F_%H:%M:%S' )] Migration started"
    if ! npm run db:up; then
        echo "[$( date '+%F_%H:%M:%S' )] Migration failed"
        exit 1
    fi

    echo "[$( date '+%F_%H:%M:%S' )] Run Application"
    if ! npm run dev; then
        echo "[$( date '+%F_%H:%M:%S' )] Execution failed"
        exit 1
    fi


# IF PROJECT ALREADY EXIST
else

    cd $PROJECT

    echo "[$( date '+%F_%H:%M:%S' )] Pull new resources from the Repository"
    if ! git pull origin $BRANCH; then
        echo "Failed to pull latest code"
        exit 1
    fi

    echo "[$( date '+%F_%H:%M:%S' )] NPM installation started"
    if ! npm install; then
        echo "NPM install failed"
        exit 1
    fi

    if ! npm run db:up; then
        echo "Database migration failed"
        exit 1
    fi

fi

echo "[$( date '+%F_%H:%M:%S' )] Deployment Complete"