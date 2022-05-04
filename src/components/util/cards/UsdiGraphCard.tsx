import { Box, Typography } from "@mui/material";
import { useLight } from "../../../hooks/useLight";
import { formatGradient, formatColor, neutral, gradient } from "../../../theme";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Mar 1",
    uv: 4000,
    pv: 2400,
  },
  {
    name: "Mar 2",
    uv: 2000,
    pv: 1398,
  },
  {
    name: "Apr 3",
    uv: 2000,
    pv: 2800,
  },
  {
    name: "Apr 4",
    uv: 2780,
    pv: 3908,
  },
  {
    name: "Apr 5",
    uv: 1890,
    pv: 4800,
  },
  {
    name: "Apr 6",
    uv: 2390,
    pv: 3800,
  },
  {
    name: "Apr 7",
    uv: 3490,
    pv: 4300,
  },
  {
    name: "Mar 8",
    uv: 4000,
    pv: 2400,
  },
  {
    name: "Mar 9",
    uv: 3000,
    pv: 1398,
  },
  {
    name: "Apr 10",
    uv: 2000,
    pv: 4800,
  },
  {
    name: "Apr 11",
    uv: 2780,
    pv: 3908,
  },
  {
    name: "Apr 12",
    uv: 1890,
    pv: 4800,
  },
  {
    name: "Apr 13",
    uv: 2390,
    pv: 3800,
  },
  {
    name: "Apr 14",
    uv: 3490,
    pv: 4300,
  },
  {
    name: "Mar 15",
    uv: 4000,
    pv: 2400,
  },
  {
    name: "Mar 16",
    uv: 3000,
    pv: 1398,
  },
  {
    name: "Apr 17",
    uv: 2000,
    pv: 5800,
  },
  {
    name: "Apr 18",
    uv: 2780,
    pv: 3908,
  },
  {
    name: "Apr 19",
    uv: 1890,
    pv: 4800,
  },
  {
    name: "Apr 20",
    uv: 2390,
    pv: 3800,
  },
  {
    name: "Apr 21",
    uv: 3490,
    pv: 4300,
  },
  {
    name: "Mar 22",
    uv: 4000,
    pv: 2400,
  },
  {
    name: "Mar 23",
    uv: 3000,
    pv: 1398,
  },
  {
    name: "Apr 24",
    uv: 2000,
    pv: 1800,
  },
  {
    name: "Apr 25",
    uv: 2780,
    pv: 3908,
  },
  {
    name: "Apr 26",
    uv: 1890,
    pv: 4800,
  },
  {
    name: "Apr 27",
    uv: 2390,
    pv: 3800,
  },
  {
    name: "Apr 28",
    uv: 3490,
    pv: 4300,
  },
];

const GraphTypography = ({ text }: { text: string }) => (
  <Typography
    variant="body1"
    fontWeight={600}
    color={formatColor(neutral.gray3)}
  >
    {text}
  </Typography>
);

export const UsdiGraphCard = () => {
  const isLight = useLight();

  return (
    <Box
      sx={{
        padding: 6,
        backgroundImage: `linear-gradient(${formatGradient(
          isLight ? gradient.gradient1 : gradient.gradient2
        )})`,
        borderRadius: 17,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box display="flex">
          <GraphTypography text="Hold API: 1.83%" />
          <Box
            sx={{
              width: 26,
              height: 0,
              border: "1px solid #A3A9BA",
              transform: "rotate(90deg) translateX(10px)",
              marginX: 3,
            }}
          ></Box>
          <GraphTypography text="Borrow APR: 4.24%" />
        </Box>

        <Box sx={{marginTop: -1}}>
          <Box sx={{ display: "flex", alignItems: "center", }}>
            <Box
              sx={{
                width: 12,
                height: 12,
                background: "#6929F0",
                borderRadius: 0.5,
                marginRight: 1,
              }}
            ></Box>{" "}
            <GraphTypography text="Borrow" />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                width: 12,
                height: 12,
                background: "#AFEABC",
                borderRadius: 0.5,
                marginRight: 1,
              }}
            ></Box>{" "}
            <GraphTypography text="Hold" />
          </Box>
        </Box>
      </Box>

      <ResponsiveContainer width="100%" height={150}>
        <LineChart
          width={300}
          height={200}
          data={data}
          margin={{
            top: 5,
            bottom: 5,
          }}
        >
          <CartesianGrid horizontal={false} vertical={false} />

          <XAxis
            dataKey="name"
            interval="preserveStartEnd"
            tick={{ fontSize: 12 }}
            tickLine={false}
            minTickGap={60}
            offset={-5}
          />

          <Tooltip cursor={false} />
          <Line type="monotone" dataKey="pv" stroke="#6929F0" dot={false} />
          <Line type="monotone" dataKey="uv" stroke="#AFEABC" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};
