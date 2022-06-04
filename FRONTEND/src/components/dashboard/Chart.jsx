import React from "react";
import { Line } from "react-chartjs-2";
import { formatRupiah } from "utils";

const Chart = (props) => {
  const { height, chartData } = props;

  const data = (canvas) => {
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, height + height * 0.5);
    gradient.addColorStop(0, "rgba(27, 170, 86,8)");
    gradient.addColorStop(1, "rgba(27, 170, 86,0.1)");

    return {
      labels: [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ],
      datasets: [
        {
          backgroundColor: gradient, // Put the gradient here as a fill color
          borderColor: "rgba(27, 170, 86,1)",
          borderWidth: 2,
          pointColor: "#fff",
          pointStrokeColor: "rgba(27, 170, 86,1)",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(27, 170, 86,1)",
          data: chartData,
        },
      ],
    };
  };

  var options = {
    responsive: true,
    datasetStrokeWidth: 3,
    pointDotStrokeWidth: 4,
    scaleLabel: "<%= Number(value).toFixed(0).replace('.', ',') + '°C'%>",
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    legend: {
      display: false,
    },
    tooltips: {
      callbacks: {
        title: function (tooltipItem, data) {
          return data["labels"][tooltipItem[0]["index"]];
        },
        label: function (tooltipItem, data) {
          return formatRupiah(
            data["datasets"][0]["data"][tooltipItem["index"]]
          );
        },
      },
      backgroundColor: "rgba(255,255,255,0.85)",
      titleFontSize: 16,
      titleFontColor: "rgba(27, 170, 86,1)",
      bodyFontColor: "#000",
      bodyFontSize: 14,
      displayColors: false,
      borderWidth: 2,
      borderColor: "rgba(27, 170, 86,0.15)",
    },
  };
  return (
    <>
      <Line data={data} options={options} height={height} />
    </>
  );
};

export default Chart;
