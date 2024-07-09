import { Button } from "./ui/button";

export default function CsvButton({ csvdata }) {
    const convertToCSV = (objArray) => {
        const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
        let str = `${Object.keys(array[0]).join(",")}\n`;

        array.forEach(obj => {
            let line = '';
            for (let index in obj) {
                if (line !== '') line += ','
                line += obj[index];
            }
            str += line + '\n';
        });
        return str;
    };

    const dataCsv = () => {
        const csvContent = `data:text/csv;charset=utf-8,${convertToCSV(csvdata)}`;
        const encodedURI = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedURI);
        link.setAttribute("download", "data.csv");
        document.body.appendChild(link); 
        link.click();
        document.body.removeChild(link);
    };

    return <Button onClick={dataCsv}>Export to CSV</Button>;
}
