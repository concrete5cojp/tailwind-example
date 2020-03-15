# TailwindCSS webpack/HTML
This repository is for showing off webpack/html tailwind starter repo.

## To build
Just run `npm run build` and the dist directory contains all of the relevant HTML/CSS
You can also use `npm run build:dev` to build development assets however the file sizes are large

## For Development
Just run `npm run dev` and you will have a web browser popup with automatic hot-reloading whenever you save
Alternatively run `npm run watch` which will auto-compile all files whenever changes happen (development mode only) usefull if you are linking to css/js files in other projects and dont need hot-reloading.

## Note
All output files are auto-generated in this version.
For SCSS files just add `<link href='scss/filename.scss' rel='stylesheet'>` it will be automatically converted and compiled into `<link href='assets/css/filename.css' rel='stylesheet'>`
Index.js is not required in your html files it is included in them all