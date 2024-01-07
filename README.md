Google Business Profile Crawler
=======

This is a web scraping project that uses TypeScript, Puppeteer, Cheerio, and Prisma. The goal is to search for business profiles on Google Maps and collect relevant information.

Install
----------

To install the project dependencies, execute the following command:

```
npm install
```

Build
--------

To run the project, you first need to compile the TypeScript files to JavaScript. You can do this with the following command:

```
npm run build
```

Run
--------
After compiling the project, you can run it with the following command:

```
npm start
```

Project Structure
--------------------

The project is structured as follows:

-   [`src/controllers/`](vscode-file://vscode-app/c:/Users/Birtan/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html "src/controllers/"): Contains the project's controllers, which are responsible for orchestrating the system's actions.
-   [`src/entities/`](vscode-file://vscode-app/c:/Users/Birtan/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html "src/entities/"): Contains the project's entities, which are the objects that represent the domain concepts of the problem.
-   [`src/gateways/`](vscode-file://vscode-app/c:/Users/Birtan/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html "src/gateways/"): Contains the project's gateways, which are responsible for interacting with external systems, such as the browser and Google Maps.
-   [`src/helpers/`](vscode-file://vscode-app/c:/Users/Birtan/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html "src/helpers/"): Contains helper functions used throughout the project.
-   [`src/useCases/`](vscode-file://vscode-app/c:/Users/Birtan/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html "src/useCases/"): Contains the project's use cases, which are the actions that the system can perform.

Database
--------

The project uses Prisma to interact with the database. The database schema is defined in the file [`prisma/schema.prisma`](vscode-file://vscode-app/c:/Users/Birtan/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html "prisma/schema.prisma"). The `GoogleBusinessProfile` model represents a business profile on Google Maps.

TypeScript Configuration
------------------------

The TypeScript configuration for the project is defined in the file [`tsconfig.json`](vscode-file://vscode-app/c:/Users/Birtan/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html "tsconfig.json"). The project is compiled to ES2020 and the output files are placed in the directory [`dist`](vscode-file://vscode-app/c:/Users/Birtan/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html "dist").

## Example Output

The `scrapeData` function in  [src/gateways/scrapeData.ts](src/gateways/scrapeData.ts) returns an array of objects.

```json
{
  "placeId": "ChIJY-Jb8uiOmQARYzf7jOIvVI0",
  "address": "R. Aporé, 17",
  "category": "Mecânico",
  "phone": undefined,
  "googleUrl": "https://www.google.com/maps/place/Oficina+Do+Pedrinho/data=!4m7!3m6!1s0x998ee8f25be263:0x8d542fe28cfb3763!8m2!3d-22.9351346!4d-42.9693559!16s%2Fg%2F11hch__71p!19sChIJY-Jb8uiOmQARYzf7jOIvVI0?authuser=0&hl=pt-BR&rclk=1",
  "bizWebsite": undefined,
  "storeName": "Oficina Do Pedrinho",
  "ratingText": "4,9 estrelas 61 comentários",
  "stars": NaN,
  "numberOfReviews": null
}