import React from 'react';
import clsx from 'clsx';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis,
  Tooltip, CartesianGrid
} from 'recharts';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ArrowDownwardOutlined from '@material-ui/icons/SystemUpdate';
import { makeStyles } from '@material-ui/core/styles';
import { round } from '../../../Helpers/Methods/FilterValues';

function calcDiff(first, second) {
  const telj = first - second;
  const namn = (first + second) / 2;
  const times = 100;

  return (telj/namn) * times;
}

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 375,
  },
}));

const Chart = ({ history = [] }) => {
  const data = history.map((item) => {
    return { price: item.old_price, time: item.when_time };
  });

  // if (history[0]) {
  //   data.push({price: history[0].price, time: 'now'});
  // }
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const hasRisen = (data[data.length - 1].price - data[data.length - 2].price) >= 0;
  const RenderDetails = () => (
    <>
      {
        data[1]
          ? (<Typography component="p" variant="body2" style={{marginBottom: '30px'}} gutterBottom>
            <b>{ data[data.length - 1].price }</b><span><i>SEK</i>
              <span style={
                hasRisen
                ? { color: 'green' }
                : { color: 'red' }
              }>
                {` ${round(data[data.length - 1].price - data[data.length - 2].price)}
                (${round(calcDiff(data[data.length - 1].price, data[data.length - 2].price))}%)`}
              </span>
            </span>
            </Typography>)
          : ''
      }
    </>
  );

  return (
    <Grid item xs={12} md={12} lg={12}>
      <Paper className={fixedHeightPaper} style={{ overflow: 'hidden' }}>
        <Typography component="h2" variant="h6" gutterBottom>
        <b>Price History</b>
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
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
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
                  dataKey="price"
                  stroke={hasRisen
                    ? '#82ca9d'
                    : '#d61c3b'
                  }
                  strokeWidth={1}
                  fillOpacity={1}
                  fill="url(#colorPv)"
              />
          </AreaChart>
        </ResponsiveContainer>
      </Paper>
    </Grid>
  );
}

export default Chart;
