import { Card, CardContent, Typography, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStatsAction } from "../../actions/userAction";
import Chart from "react-apexcharts";

const HomeComponent = () => {
  const dispatch = useDispatch();
  const statsState = useSelector((state) => state.userReducer.stats);

  const [chartData, setChartData] = useState({
    series: [],
    options: {
      labels: [],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  const getStats = async () => {
    try {
      await dispatch(getStatsAction());
    } catch (error) {
      console.log(error, "from get stats home component");
    }
  };

  useEffect(() => {
    getStats();
  }, []);

  useEffect(() => {
    if (statsState && statsState.length) {
      const labels = statsState.map((stat) => stat.label);
      const series = statsState.map((stat) => stat.value);

      setChartData({
        series: series,
        options: {
          labels: labels,
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200,
                },
                legend: {
                  position: "bottom",
                },
              },
            },
          ],
        },
      });
    }
  }, [statsState]);

  return (
    <>
      <Grid container spacing={4}>
        {statsState && statsState.length ? (
          statsState.map((stat, index) => (
            <Grid key={index} item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{stat.label}</Typography>
                  <Typography variant="h4">{stat.value}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <>No stats</>
        )}
      </Grid>

      <Grid
        container
        spacing={4}
        style={{ marginTop: "1rem", display: "flex", justifyContent: "center" }}
      >
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Chart
                options={chartData.options}
                series={chartData.series}
                type="pie"
                width="70%"
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default HomeComponent;
