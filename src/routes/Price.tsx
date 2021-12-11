import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: block;
  color: ${(props) => props.theme.textColor};
`;

const HeaderPrice = styled.span`
  font-size: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  color: white;
`;

const Titlebox = styled.div`
  display: flex;
  background-color: transparent;
  padding: 20px 0;
  font-size: 20px;
  border-radius: 5%;
  justify-content: space-between;
`;

const Title = styled.span`
  span {
    color: green;
    margin-left: 5px;
  }
`;

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

interface PriceProps {
  coinId: string;
  tickersData?: PriceData;
}

function Price({ coinId, tickersData }: PriceProps) {
  const [data, setData] = useState<PriceData>();
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setData(tickersData);
    setLoading(false);
  }, [coinId, tickersData]);

  return (
    <Container>
      <HeaderPrice>Price</HeaderPrice>
      {isLoading ? (
        "Loading Price..."
      ) : (
        <>
          <Titlebox>
            <span>Rank:</span>
            <Title>{data?.rank}</Title>
          </Titlebox>

          <Titlebox>
            <span>Price:</span>
            <Title>
              {data?.quotes.USD.price.toFixed(3)}
              <span>$</span>
            </Title>
          </Titlebox>

          <Titlebox>
            <span>ATH-Price:</span>
            <Title>
              {data?.quotes.USD.ath_price.toFixed(3)}
              <span>$</span>
            </Title>
          </Titlebox>

          <Titlebox>
            <span>Change rate (last 12 hours):</span>
            <Title>
              {data?.quotes.USD.percent_change_12h.toFixed(3)}
              <span>$</span>
            </Title>
          </Titlebox>
        </>
      )}
    </Container>
  );
}

export default Price;
