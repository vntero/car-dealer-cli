# car-dealer-cli

"A small JavaScript command line function that reads data from a csv file to return a computed feedback."

# Installation

- Clone the repository or copy the content of the zip file to your local machine
- Navigate tot he project directory (cd car-dealer-cli)
- Install dependencies (npm i)
- Star using the application (node src/app.js), you should see in the console the help menu describing which commands are available and showing examples

- - Available Commands

* count-cars-by-brand <brand>: Counts the number of cars by the specified brand.
* list-cars-by-brand <brand>: Lists all cars by the specified brand.
* list-cars-by-mileage-range <minMileage> <maxMileage>: Lists cars within the specified mileage range.
* total-value-by-dealership <dealership>: Gets the total value of cars in the specified dealership.

- - Examples
    cd to the project directory and run the commands below:

* $ node src/app.js count-cars-by-brand Audi'
* $ node src/app.js list-cars-by-brand BMW
* $ node src/app.js list-cars-by-mileage-range 10000 50000
* $ node src/app.js total-value-by-dealership "My Dealership"

# Additional comments

- Unfortunately, at the present time, the application restarts itself each time it receives a command after returning a computed feedback. Ideally it would keep going on its own and keep engaging with the user until they decided to exit/quit. But for the sake of time I decided to ship it as is, I'll definitely keep working on it to achieve optimal user experience in future iterations.
- Unit tests added check the functioning of the use cases layer, there could have been more coverage but at least the most essential logical part can be seen as working properly.
-
