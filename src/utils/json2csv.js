let jsonexport = require('jsonexport');

export let json2csv = (res, filename, options={}) => {
  jsonexport(res, options, function(err, csv) {
    if(err) return console.log(err);
    // console.log(csv);

    let Today = new Date();
    let fileName = Today.getFullYear()+'-'+(Today.getMonth()+1)+'-'+Today.getDate()+'-'+filename;

    let csvContent = "data:text/csv;charset=utf-8,\uFEFF" + csv;
    let encodedUri = encodeURI(csvContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${(fileName || 'file')}.csv`);
    document.body.appendChild(link); // Required for FF
    link.click(); // This will download the data file named "my_data.csv".
    document.body.removeChild(link); // Required for FF
  });
}