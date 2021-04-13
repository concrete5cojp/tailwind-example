![Build](https://github.com/concrete5cojp/tailwind-example/workflows/Build/badge.svg)

# TailwindCSS webpack/HTML for concrete5

This repository is for webpack/html tailwind starter repo for concrete5 theme development

## Updates

- Now updated to version 2.1 of tailwind (using JIT)
- Updated to webpack 5
- Now Includes @tailwind/forms and @tailwind/typhography (remove @tailwind/ui)

## To build

Just run `npm run build` and the dist directory contains all of the relevant HTML/CSS
You can also use `npm run build:dev` to build development assets however the file sizes are large

## To build for concrete5

Just run `npm run build:c5` and the dist/theme_name directory contains all of the relevant php/css/js

## For Development

Just run `npm run dev` and you will have a web browser popup with automatic hot-reloading whenever you save
Alternatively run `npm run watch` which will auto-compile all files whenever changes happen (development mode only) usefull if you are linking to css/js files in other projects and dont need hot-reloading.

## Note

All output files are auto-generated in this version.
For SCSS files just add `<link href='scss/filename.scss' rel='stylesheet'>` it will be automatically converted and compiled into `<link href='assets/css/filename.css' rel='stylesheet'>`
Index.js is not required in your html files it is included in them all
