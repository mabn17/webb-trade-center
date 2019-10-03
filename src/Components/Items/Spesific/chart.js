import React from 'react';
import clsx from 'clsx';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  Tooltip,
  ResponsiveContainer } from 'recharts';
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
    height: 240,
  },
}));

const Chart = ({ history = [] }) => {
  const data = history.map((item) => {
    return { price: item.old_price, time: item.when_time };
  });
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const RenderDetails = () => (
    <>
      {
        data[1]
          ? (<Typography component="p" variant="body2" gutterBottom>
            <b>{ data[data.length - 1].price }</b><span><i>SEK</i>
              <span style={
                (data[data.length - 1].price - data[data.length - 2].price) >= 0
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
      <Paper className={fixedHeightPaper}>
        <Typography component="h2" variant="h6" gutterBottom>
        <b>Price History</b>
        { data[1] && (data[data.length - 1].price - data[data.length - 2].price) >= 0
          ? <ArrowDownwardOutlined style={{ paddingBottom: '10px', color: 'green', transform: 'rotate(180deg)' }} />
          : <ArrowDownwardOutlined style={{ paddingTop: '10px', color: 'red' }} />
        }
        </Typography>
          <RenderDetails />
        <ResponsiveContainer>
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
            <Line type="monotone" dataKey="price" stroke="#556CD6" dot={true} />
          </LineChart>
        </ResponsiveContainer>
      </Paper>
    </Grid>
  );
}

export default Chart;
