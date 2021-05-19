import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

const CommentChart = ({ comments }) => {
  const [datas, setData] = useState({});

  useEffect(() => {
    let grp = {};

    comments.forEach((comment) => {
      const d = new Date(comment.date);
      let temp =
        d.getFullYear().toString() +
        "/" +
        (d.getMonth() + 1).toString() +
        "/" +
        d.getDate().toString();

      if (grp && grp[temp]) {
        grp[temp] = grp[temp] + 1;
      } else {
        grp[temp] = 1;
      }
    });

    setData({
      data: {
        labels: Object.keys(grp),

        datasets: [
          {
            label: "No of Comments",
            data: Object.values(grp),
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgba(255, 99, 132, 0.2)",
            fill: false,
          },
        ],
      },
      options: { legend: { display: true } },
    });
  }, [comments]);

  return (
    <React.Fragment>
      <Line {...datas} />
    </React.Fragment>
  );
};

export default CommentChart;
