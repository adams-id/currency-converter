# Currency Converter APP
    A react application that allows the users to do FX conversion from Australian Dollars to any currency.
    Tech Stack: React, Typescript, Express, Node.

### To Run the Project in Development Mode
1. **Clone the Repository to your local machine:** 
Run this in the terminal in the location you would like to save the repository locally:
```sh
git clone https://github.com/adams-id/currency-converter.git
```
Or fork the repository and work on your own version.

2. **Install Dependencies:**
The project has two applications: the server and the client side.
Enter the repository folder and install the dependencies. You need to have [Node](https://nodejs.org/en/download/) and [Yarn](https://yarnpkg.com/getting-started/install) installed to run this step.
```sh
cd server
yarn install
```
This will install the dependencies based on the information in the [`package.json`](package.json) file for the server side.

Navigate into the "frontend" folder and run:
```
yarn install
```
This will install the dependencies based on the information in the [`package.json`](package.json) file for the client side.

3. **Run the Application**
First navigate into the folder titled "server" then run:
```sh
yarn start
```
This would start up the backend server. You can view it in  [http://localhost:8080](http://localhost:8080).
You may also see any server errors in the console.

Now, open a new terminal and navigate into the folder titled "frontend". Run this command:
```sh
yarn start
```
This runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

4. **Run the tests**
Navigate into the folder titled "frontend" then run:
```sh
yarn test
```
This would run the tests in the terminal.