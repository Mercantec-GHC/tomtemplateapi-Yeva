// const BACKEND_URL = "https://magsapi.onrender.com/api/diesel";

// async function main() {
//   await createChart();

//   dataset = await load();
//   chartDataset = []

// }

// async function load() {
//   const resp = await fetch(BACKEND_URL);
//   const data = await resp.json();

//   // convert to datetime obj
//   data.forEach((item) => {
//     item.Date = parseDatetime(item.Date);
//   });

//   return data;
// }

// async function dataPreparing(dataRaw) {
//   const dataValues = [];
//   const dataLabels = [];

//   for (const record of dataRaw) {
//     dataValues.push(record.Price);
//     dataLabels.push(record.Date);
//   }

//   return [dataValues, dataLabels];
// }

// async function createChart() {
//   const canvas = document.getElementById("chart");
//   let [dataValues, dataLables] = await dataPreparing();

//   new Chart(canvas, {
//     type: "line",
//     data: {
//       labels: dataLables,
//       datasets: [
//         {
//           label: "Diesel price",
//           data: dataValues,
//           borderWidth: 1,
//         },
//       ],
//     },
//     options: {
//       scales: {
//         y: {
//           beginAtZero: true,
//         },
//       },
//     },
//   });
// }

// main();

import { App } from "./app.js";

new App("chart", "from", "to");
