# OPA File Bank

This is the frontend part of the OPA File Bank. OPA File Bank is a file storage web application in a local area network setting wherein company can manage the files used in its workflow. It supports any file type.

## Features

User Features:

- Add, Delete, Modify Files and Folders
- Download Files, and Folders
- Modify Profile

Admin Features:

- Add, Modify, Activate and Deactivate User
- Add, Modify, Activate and Deactivate Access Levels
- See Logs
- View and Delete Trash Files
- Modify Permissions

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`REACT_APP_BACKEND_URL`

## Run Locally

Clone the project

```bash
  git clone https://github.com/jc4balos/opa-file-bank.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

## API Reference

[Filebank API](https://voltesiv.postman.co/workspace/b4567ae1-ea0d-4950-aa6e-ad09758017cd)

## License

[GNU General Public License v3.0](https://choosealicense.com/licenses/gpl-3.0/#)

## Deployment

To create a build that will be used for deployment

```bash
  npm run build
```
