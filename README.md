# Report Generator Server

Report Generator Server is an Express.js application that generates PDF reports by using templates and the Carbone library. It provides an API endpoint for rendering templates and returning the generated reports as raw PDF data.

## Prerequisites

Before running the application, ensure you have the following dependencies installed:

- Node.js
- npm (Node Package Manager, usually comes with Node.js)
- LibreOffice

Make sure LibreOffice is installed and available in your system's PATH. Carbone uses LibreOffice to convert generated DOCX files to PDF format.

## Installation

1. Clone the repository or download the source code.
2. Navigate to the project directory in your terminal.
3. Run the following command to install the required dependencies:


```
npm install
```


## Usage

1. Start the server by running the following command:


```
npm start
```


2. Once the server is running, you can send a POST request to the `/render_template` API endpoint to generate a PDF report. The endpoint expects the template data in the request body. Make sure to set the appropriate `Content-Type` header to `application/json`.

The request body should be a JSON object with the following structure:

```json
{
  "template": "BASE64_ENCODED_TEMPLATE",
  "data": {
    "key1": "value1",
    "key2": "value2",
    ...
  }
}
```

- `template` (string, required): The base64-encoded representation of the template file data. The template file should be in DOCX format.
- `data` (object, optional): An object containing the arguments/data required for report generation. Customize this structure according to your specific template requirements.

Example API request using cURL:


```
curl -X POST -H "Content-Type: application/json" -d '{ "template": "BASE64_ENCODED_TEMPLATE", "data": { "key": "value" } }' http://localhost:3000/render_template > report.pdf
```


Replace `BASE64_ENCODED_TEMPLATE` with the actual base64-encoded content of your DOCX template file, and `http://localhost:3000` with the actual URL where your server is running.

The generated PDF report will be saved as `report.pdf` in the current directory.

## Environment Variables

The server relies on the following environment variable:

- `FACTORIES` (number, optional): Specifies the number of LibreOffice instances to launch for concurrent document conversion. By default, it is set to `1`. Adjust this value based on your system's capabilities and performance requirements.


## Contributing

Contributions are welcome! If you find any issues or want to enhance the functionality of this project, feel free to submit a pull request.

Please ensure that you follow the existing code style and provide detailed information about your changes.


## License

[MIT License](LICENSE)

## Acknowledgments

This project utilizes the following open-source libraries and tools:

- [Express.js](https://expressjs.com)
- [Carbone](https://carbone.io)
- [LibreOffice](https://www.libreoffice.org/)


## Contact

If you have any questions or need further assistance, please contact [vs.vasilev@apsaburovo.ru](mailto:vs.vasilev@apsaburovo.ru).