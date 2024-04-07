#!/usr/bin/env bash

npx vite build --mode development

firebase deploy --only hosting