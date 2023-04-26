import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line, Bar, Pie } from "react-chartjs-2";

const Statistic = () => {
  const [userData, setUserData] = useState([]);
  const [dailyData, setDailyData] = useState({});
  const [monthlyData, setMonthlyData] = useState({});
  const [cityData, setCityData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:5000/api/user");
      setUserData(result.data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const getDailyData = () => {
      const daily = userData.reduce((acc, curr) => {
        const date = curr.createdAt.split("T")[0];
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});

      setDailyData({
        labels: Object.keys(daily),
        datasets: [
          {
            label: "Inscriptions par jour",
            data: Object.values(daily),
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      });
    };

    getDailyData();
  }, [userData]);

  useEffect(() => {
    const getMonthlyData = () => {
      const monthly = userData.reduce((acc, curr) => {
        const month = curr.createdAt.split("-").slice(0, 2).join("-");
        acc[month] = (acc[month] || 0) + 1;
        return acc;
      }, {});

      setMonthlyData({
        labels: Object.keys(monthly),
        datasets: [
          {
            label: "Inscriptions par mois",
            data: Object.values(monthly),
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      });
    };

    getMonthlyData();
  }, [userData]);

  useEffect(() => {
    const getCityData = () => {
      const city = userData.reduce((acc, curr) => {
        acc[curr.city] = (acc[curr.city] || 0) + 1;
        return acc;
      }, {});

      setCityData({
        labels: Object.keys(city),
        datasets: [
          {
            label: "Inscriptions par ville",
            data: Object.values(city),
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
              "rgb(75, 192, 192)",
              "rgb(153, 102, 255)",
              "rgb(255, 159, 64)",
            ],
            hoverOffset: 4,
          },
        ],
      });
    };

    getCityData();
  }, [userData]);

  return (
    <div>
      <Line data={dailyData} />
      <Bar data={monthlyData} />
      <Pie data={cityData} />
    </div>
  );
};

export default Statistic;
