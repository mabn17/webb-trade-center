import React from 'react';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Label,
//   Tooltip,
//   ResponsiveContainer } from 'recharts';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis,
  Tooltip, CartesianGrid
} from 'recharts';
import Typography from '@material-ui/core/Typography';
import {
  getStockHistory,
  getAllStocks
} from '../../Helpers/Requests/stocks/stocks';
import ArrowDownwardOutlined from '@material-ui/icons/SystemUpdate';
import { round } from '../../Helpers/Methods/FilterValues';

function calcDiff(first, second) {
  const telj = first - second;
  const namn = (first + second) / 2;
  const times = 100;

  return (telj/namn) * times;
}

const Chart = ({hasUpdated = false, stock = {}, mhm }) => {
  const [data, setData] = React.useState([]);
  const [isUpdating, setIsUpdating] = React.useState(false);
  // eslint-disable-next-line no-unused-vars
  const [price, setPrice] = React.useState(0); // Wiered bugfix for not re-render

  const generateData = (stock_item) => {
    return {
      time: stock_item.when_time,
      amount: stock_item.old_price
    }
  };

  const hasRisen = data[1] && (data[data.length - 1].amount - data[data.length - 2].amount) >= 0;

  const handleData = (holder) => {
    setData(holder);
  }

  const handleChart = () => {
    if (!isUpdating) {
      setIsUpdating(true);
      getStockHistory().then((items) => {
        const holder = [];
        let element;
        if (typeof items === typeof ['j']) {
          for (let index = 0; index < items.length; index++) {
            element = items[index];
            if (element.item_name === stock.item_name) {
              holder.unshift(generateData(element));
            }
          }
        }

        getAllStocks().then((res) => {
          for (let jndex = 0; jndex < res.items.length; jndex++) {
            const elem = res.items[jndex];
            if (elem.name === stock.item_name) {
              holder.push({ time: 'now', amount: elem.price });
              break;
            }
          }

          handleData(holder);
          setIsUpdating(false);
          setPrice((val) => val += 1);
        }).catch((e) => {
          handleData(holder);
          setIsUpdating(false);
          setPrice((val) => val += 1);
        });
      }).catch(() => setIsUpdating(false));
    }
  }

  React.useEffect(() => {
    handleChart();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasUpdated, stock]);

  const RenderDetails = () => (
    <>
      {
        data[1]
          ? (<Typography component="p" variant="body2" style={{marginBottom: '30px'}} gutterBottom>
            <b>{ data[data.length - 1].amount }</b><span><i>SEK</i>
              <span style={hasRisen
                ? { color: 'green' }
                : { color: 'red' }
              }>
                {` ${round(data[data.length - 1].amount - data[data.length - 2].amount)}
                (${round(calcDiff(data[data.length - 1].amount, data[data.length - 2].amount))}%)`}
              </span>
            </span>
            </Typography>)
          : ''
      }
    </>
  );

  return (
    <>
      <Typography component="h2" variant="h6" gutterBottom>
      <b>{ stock ? stock.item_name : '-' }</b> Prices
      { data[1] && hasRisen
        ? <ArrowDownwardOutlined style={{ paddingBottom: '10px', color: 'green', transform: 'rotate(180deg)' }} />
        : <ArrowDownwardOutlined style={{ paddingTop: '10px', color: 'red' }} />
      }
      </Typography>
        <RenderDetails />
        <ResponsiveContainer height={250}>
          <AreaChart data={data}
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <defs>
                <linearGradient id={stock.item_name} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={hasRisen
                    ? '#82ca9d'
                    : '#d61c3b'
                  } stopOpacity={0.5} />
                  <stop offset="95%" stopColor={hasRisen
                    ? '#82ca9d'
                    : '#d61c3b'
                  } stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                  dataKey="time"
                  tickFormatter={timestamp => timestamp}
              />
              <YAxis
                  type="number"
                  domain={['dataMin - 1', 'dataMax + 1']}
                  tickFormatter={value => value.toFixed(2)}
              />
              <Tooltip
                  formatter={value => [value]}
                  labelFormatter={timestamp => `time: ${timestamp}`}
              />
              <Area
                  type="monotone"
                  dataKey="amount"
                  stroke={hasRisen
                    ? '#82ca9d'
                    : '#d61c3b'
                  }
                  fillOpacity={1}
                  fill={`url(#${stock.item_name})`}
              />
          </AreaChart>
        </ResponsiveContainer>
      {/* <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <Tooltip />
          <XAxis dataKey="time" />
          <YAxis>
            <Label angle={270} position="left" style={{ textAnchor: 'middle' }}>
              Sales (kr)
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke="#556CD6" dot={true} />
        </LineChart>
      </ResponsiveContainer> */}
    </>
  );
}

export default Chart;
