#!/bin/sh
echo 'Pulling the latest code from master...';
git pull origin master;
echo 'Running npm update...';
npm update;
echo 'Running the build...';
npm run build;