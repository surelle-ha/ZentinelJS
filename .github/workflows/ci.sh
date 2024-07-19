#!/usr/bin/env bash

# Initialization
PROJECT="ZentinelJS"
REPOSITORY="https://github.com/surelle-ha/ZentinelJS"
BRANCH="main"
ENVIRONMENT="production"
DIRECTORY="/var/www/html/"
DEPENDENCIES=("wget" "curl" "git" "btop" "nodejs" "npm" "figlet")

# Log Function
log() {
    echo "[$(date '+%F_%H:%M:%S')] $1"
}

# Check if a command exists
command_exists() {
    command -v "$1" &> /dev/null
}

# Install dependencies
install_dependencies() {
    for dep in "${DEPENDENCIES[@]}"; do
        if ! command_exists $dep; then
            if ! sudo apt install -y $dep; then
                log "Dependency installation failed: $dep"
                exit 1
            fi
        fi
    done
}

# PREPARE
install_dependencies

# Install PM2 if not already installed
if ! command_exists pm2; then
    log "PM2 is not installed, installing now"
    if ! npm install -g pm2; then
        log "Failed to install PM2"
        exit 1
    fi
fi

# CHECK IF GIT AUTHENTICATED
if git ls-remote $REPOSITORY &> /dev/null; then
    log "Git is authenticated."
else
    log "Git is not authenticated."
    exit 1
fi

# DEPLOYMENT
clear
figlet $PROJECT
log "Deployment started"

if [ ! -d "$DIRECTORY" ]; then
    mkdir -p "$DIRECTORY"
    log "Directory $DIRECTORY created."
else
    log "Directory $DIRECTORY already exists."
fi
cd $DIRECTORY

# IF PROJECT NOT EXIST
if [ ! -d "$PROJECT" ]; then

    log "Cloning project from the repository"
    if ! git clone $REPOSITORY; then
        log "Failed to clone repository"
        exit 1
    fi

    cd $PROJECT

    log "NPM installation started"
    if ! npm install; then
        log "NPM install failed"
        exit 1
    fi

    log "Creating environment template"
    if [ ! -f .env ]; then
        if ! cp .env.example .env; then
            log "Creating environment template failed"
            exit 1
        fi
    fi

    log "Migration started"
    if ! npm run db:up; then
        log "Migration failed"
        exit 1
    fi

    log "Running Application"
    if ! npm run dev; then
        log "Execution failed"
        exit 1
    fi

# IF PROJECT ALREADY EXIST
else

    cd $PROJECT

    log "Pulling new resources from the Repository"
    if ! git pull origin $BRANCH; then
        log "Failed to pull latest code"
        exit 1
    fi

    log "NPM installation started"
    if ! npm install; then
        log "NPM install failed"
        exit 1
    fi

    log "Database migration started"
    if ! npm run db:up; then
        log "Database migration failed"
        exit 1
    fi

fi

# PM2 Setup
log "Setting up PM2"
if ! command_exists pm2; then
    log "PM2 is not installed, installing now"
    if ! npm install -g pm2; then
        log "Failed to install PM2"
        exit 1
    fi
fi

# Create PM2 ecosystem config
log "Creating PM2 ecosystem configuration"
cat <<EOL > ecosystem.config.js
module.exports = {
    apps: [{
    name: '$PROJECT',
    script: 'npm',
    args: 'run start',
    env: {
        NODE_ENV: $ENVIRONMENT
    }
    }]
};
EOL

# Start or restart application with PM2
log "Starting application with PM2"
if pm2 list | grep -q "$PROJECT"; then
    if ! pm2 reload ecosystem.config.js; then
        log "Failed to reload application with PM2"
        exit 1
    fi
else
    if ! pm2 start ecosystem.config.js; then
        log "Failed to start application with PM2"
        exit 1
    fi
fi

log "Deployment Complete"
