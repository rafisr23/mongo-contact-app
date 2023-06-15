# Repository: mongo-contact-app

Welcome to the `mongo-contact-app` repository! This repository contains a simple contact management application built using MongoDB, Node.js, and Express.js. The application allows you to store and manage contacts in a MongoDB database.

## Installation

To get started with the `mongo-contact-app`, please follow the instructions below:

1. Clone the repository:
`git clone https://github.com/rafisr23/mongo-contact-app.git`

2. Navigate to the project directory:
`cd mongo-contact-app`

3. Install the dependencies:
`npm install`

4. Set up the MongoDB connection:

- Make sure you have MongoDB installed and running on your local machine or provide the connection details for a remote MongoDB server.
- Update the MongoDB connection URL in the `utils/db.js` file.

5. Start the application:
`nodemon app`


The application will be running at `http://localhost:3000`.

## Usage

Once the `mongo-contact-app` is up and running, you can perform the following actions:

- **View Contacts**: Open your web browser and go to `http://localhost:3000/contact` to view all the contacts stored in the database.

- **Add a Contact**: Click on the "Add Contact" button on the homepage or go to `http://localhost:3000/contact/add` to add a new contact.

- **Edit a Contact**: On the contacts page, click on the "Edit" button next to a contact to modify its details.

- **Delete a Contact**: On the contacts page, click on the "Delete" button next to a contact to remove it from the database.

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug reports, please open an issue on the [GitHub repository](https://github.com/rafisr23/mongo-contact-app/issues). Feel free to submit pull requests with improvements as well.

When contributing to this project, please ensure that your code adheres to the existing coding style and conventions. Also, make sure to update the documentation if necessary.

## License

The `mongo-contact-app` is open-source software released under the [MIT License](https://opensource.org/licenses/MIT). 

## Contact

If you have any questions or need further assistance, feel free to contact the project maintainer:

- Name: [Abdur Rafi](https://github.com/rafisr23)
- Email: [rafiridwan23@gmail.com](mailto:rafiridwan23@gmail.com)

Thank you for using `mongo-contact-app`! We hope it helps you manage your contacts effectively.
