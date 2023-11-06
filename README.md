
# Live Train Running Status

A web-based application which can be used for managing the data of Railways.

## Database Schema

![DatabaseModelSchema](https://raw.githubusercontent.com/mithilshah23/live-train-running-status/main/Screenshots/DatabaseModelSchema.png)

## Demo 

### Trains
![Trains](https://raw.githubusercontent.com/mithilshah23/live-train-running-status/main/Screenshots/Trains.png)

### Stations
![Stations](https://raw.githubusercontent.com/mithilshah23/live-train-running-status/main/Screenshots/Stations.png)

### Routes
![Routes](https://raw.githubusercontent.com/mithilshah23/live-train-running-status/main/Screenshots/Routes.png)

### ETA_ETD
![ETA_ETD](https://raw.githubusercontent.com/mithilshah23/live-train-running-status/main/Screenshots/ETA-ETD.png)

### Time Table
![Time Table](https://raw.githubusercontent.com/mithilshah23/live-train-running-status/main/Screenshots/New-time-table.png)

### Train Details
![Train Details](https://raw.githubusercontent.com/mithilshah23/live-train-running-status/main/Screenshots/Mumbai-Rajdhani.png)

### Add Trains
![Add Trains](https://raw.githubusercontent.com/mithilshah23/live-train-running-status/main/Screenshots/New-train.png)

### Add Routes
![Add Routes](https://raw.githubusercontent.com/mithilshah23/live-train-running-status/main/Screenshots/New-route.png)

### Employees
![Employees](https://raw.githubusercontent.com/mithilshah23/live-train-running-status/main/Screenshots/Employees.png)

## Prerequisites
Make sure you have the following dependencies installed:
- Node
- MySQL
## Run Locally

After downloading the project on the local system, perform the following steps:

1. Open the terminal and go to the location where the project is stored.

2. Type the command:
```bash
cd live-train-running-status
npm install 
```
It will install all the modules which are required by the project into a node_modules folder.

3. Since the project also needs MySQL installed on the system, enter your MySQL credentials into the project.
Directly replace the contents at the appropriate location in the dbService.js file by your MySQL credentials.

4. After performing all the above steps, you can run the project on your system by simply going to terminal and typing the following command:
```bash
npm start 
```

5. Since the application requires admin login, first insert one (or more) record into admin table of MySQL and then again run the project using the admin details from admin table.

    
## Contact
For any inquiries or questions, please contact the project maintainer at mithilshah23@gmail.com
