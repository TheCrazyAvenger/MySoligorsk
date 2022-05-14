#!/usr/bin/env bash

if [ "${NODE_ENV}" == "prod" ];
then
  echo "Switching to Firebase Prod environment"
  yes | cp -rf "./config/firebase_prod/google-services.json" android/app
  yes | cp -rf "./config/firebase_prod/GoogleService-Info.plist" ios/CyberMetals
elif [ "${NODE_ENV}" == "stage" ];
then
  echo "Switching to Firebase Stage environment"
  yes | cp -rf "./config/firebase_stage/google-services.json" android/app
  yes | cp -rf "./config/firebase_stage/GoogleService-Info.plist" ios/CyberMetals
elif [ "${NODE_ENV}" == "dev" ];
then
  echo "Switching to Firebase Dev environment"
  yes | cp -rf "./config/firebase_dev/google-services.json" android/app
  yes | cp -rf "./config/firebase_dev/GoogleService-Info.plist" ios/CyberMetals
fi