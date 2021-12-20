import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface CharProps {
  coinId: string;
}

const Container = styled.div`
  display: block;
  color: ${(props) => props.theme.textColor};
`;

const HeaderChart = styled.span`
  font-size: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  color: ${(props) => props.theme.textColor};
`;

function Chart({ coinId }: CharProps) {
  const isDark = useRecoilValue(isDarkAtom);

  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );

  return (
    <Container>
      <HeaderChart>Chart</HeaderChart>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              name: "price",
              data: data?.map((price) => ({
                x: price.time_close,
                y: [price.open, price.high, price.low, price.close],
              })),
            },
          ]}
          options={{
            chart: {
              height: 150,
              width: 500,
              toolbar: {
                show: false,
              },
            },
            theme: {
              mode: isDark ? "dark" : "light",
            },
            grid: { show: false },
            yaxis: {
              show: false,
            },
            xaxis: {
              type: "datetime",
              axisBorder: {
                offsetX: 13,
              },
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: "#097df8",
                  downward: "#f70d04",
                },
              },
            },
          }}
        />
      )}
    </Container>
  );
}

export default Chart;
