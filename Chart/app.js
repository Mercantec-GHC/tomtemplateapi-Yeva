import { parseDatetime } from "./utils.js";

export class App {
  constructor(canvasTagName, timeFromName, timeToName) {
    this.init(canvasTagName, timeFromName, timeToName);
  }

  async init(canvasTagName, timeFromName, timeToName) {
    this.registerEvents(canvasTagName, timeFromName, timeToName);
    await this.loadDatasets();
    this.updateChart();
  }

  registerEvents(canvasTagName, timeFromName, timeToName) {
    this.canvasTag = document.getElementById(canvasTagName);
    this.timeFrom = document.getElementById(timeFromName);
    this.timeTo = document.getElementById(timeToName);
    
    this.timeFrom.addEventListener("change", () => {
      this.updateChart();
    });
    this.timeTo.addEventListener("change", () => {
      this.updateChart();
    });
  }

  async loadDatasets() {
    this.dataDiesel = await this.loadLink(
      "https://magsapi.onrender.com/api/diesel"
    );
    this.dataGasoline = await this.loadLink(
      "https://magsapi.onrender.com/api/miles95"
    );
  }

  async loadLink(url) {
    const resp = await fetch(url);
    const data = await resp.json();

    // convert to datetime obj
    data.forEach((item) => {
      item.Date = parseDatetime(item.Date);
    });

    return data;
  }

  updateChart() {
    const timeFromDate = parseDatetime(this.timeFrom.value);
    const timeToDate = parseDatetime(this.timeTo.value);

    const selectedDieselData = this.dataDiesel.filter(
      (item) => item.Date >= timeFromDate && item.Date <= timeToDate
    );
    const selectedGasolineData = this.dataGasoline.filter(
      (item) => item.Date >= timeFromDate && item.Date <= timeToDate
    );

    const [dieselLabels, dieselValues] = this.dataPreparing(selectedDieselData);
    const [gasolineLabels, gasolineValues] =
      this.dataPreparing(selectedGasolineData);

    this.createChart(dieselLabels, [
      {
        label: "Diesel price",
        data: dieselValues,
        borderWidth: 1,
      },
      {
        label: "Gasoline price",
        data: gasolineValues,
        borderWidth: 1,
      },
    ]);
  }

  dataPreparing(rawData) {
    const labels = [];
    const values = [];

    //labels preparing
    for (const record of rawData) {
      const someDate = record.Date;
      const day = String(someDate.getDate()).padStart(2, "0");
      const month = String(someDate.getMonth() + 1).padStart(2, "0");
      const year = someDate.getFullYear();
      labels.push(`${day}-${month}-${year}`);

      values.push(record.Price);
    }

    return [labels, values];
  }

  createChart(labels, datasets) {
    if (this.canvas != null) {
      this.canvas.destroy();
    }
    this.canvas = new Chart(this.canvasTag, {
      type: "line",
      data: {
        labels: labels,
        // datasets: [
        //   {
        //     label: "Diesel price",
        //     data: this.shared.dieselValuesToChart,
        //     borderWidth: 1,
        //   },
        //   {
        //     label: "Gasoline price",
        //     data: this.shared.gasolineValuesToChart,
        //     borderWidth: 1,
        //   },
        // ],
        datasets: datasets,
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
