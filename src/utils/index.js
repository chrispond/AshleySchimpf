const PrismicDOM = require("prismic-dom");

const getStringDay = (day) => {
  return (
    day +
    (day > 0
      ? ["th", "st", "nd", "rd"][
          (day > 3 && day < 21) || day % 10 > 3 ? 0 : day % 10
        ]
      : "")
  );
};

const getStringMonth = (month) => {
  const monthLabel = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return monthLabel[month];
};

module.exports = {
  prettyDate: (prismicDate) => {
    const date = PrismicDOM.Date(prismicDate);

    return `${getStringMonth(date.getMonth())} ${getStringDay(
      date.getDate()
    )}, ${date.getFullYear()}`;
  },
  readTime: (postData) => {
    const wordCount = postData.reduce((accumulator, currentValue) => {
      const content = PrismicDOM.RichText.asText(
        currentValue.primary[currentValue.slice_type]
      );
      return accumulator + content.split(" ").length;
    }, 0);

    return Math.ceil(wordCount / 200);
  },
};
