import { parseDatetime } from "./utils.js";

export class App {
  constructor(canvasTagName, timeFromName, timeToName) {
    this.canvasTag = document.getElementById(canvasTagName);
    this.timeFrom = document.getElementById(timeFromName);
    this.timeTo = document.getElementById(timeToName);
    this.selectedData = [];

    this.labelsToChart = [];
    this.valuesToChart = [];

    this.init();
  }

  async init() {
    this.timeFrom.addEventListener("change", () => {
      this.updateChart();
    });
    this.timeTo.addEventListener("change", () => {
      this.updateChart();
    });
    await this.load();
    await this.createChart();
  }

  async load() {
    const resp = await fetch("https://magsapi.onrender.com/api/diesel");
    const data = await resp.json();

    // convert to datetime obj
    data.forEach((item) => {
      item.Date = parseDatetime(item.Date);
    });

    this.data = data;
    this.selectedData = this.data;
  }

  async updateChart() {
    await this.selectData();
    await this.dataPreparing();
    this.canvas.update("active");
  }

  async selectData() {
    const timeFromDate = parseDatetime(this.timeFrom.value);
    const timeToDate = parseDatetime(this.timeTo.value);

    this.selectedData = this.data.filter(
      (item) => item.Date >= timeFromDate && item.Date <= timeToDate
    );
  }

  async dataPreparing() {
    this.labelsToChart = [];
    this.valuesToChart = [];

    for (const record of this.selectedData) {
      this.valuesToChart.push(record.Price);
      this.labelsToChart.push(record.Date);
    }
  }

  async createChart() {
    this.canvas = new Chart(this.canvasTag, {
      type: "line",
      data: {
        labels: this.labelsToChart,
        datasets: [
          {
            label: "Diesel price",
            data: this.valuesToChart,
            borderWidth: 1,
          },
        ],
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
