/* eslint-disable react/prop-types */

const DynamicSVG = ({ words }) => {
  const createSvgFromWords = (words) => {
    const wordArray = words.split(' ');
    const initials = wordArray.slice(0, 2).map(word => word[0]).join('').toUpperCase();
    const colors = [
      "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#33FFF0",
      "#FF9933", "#9933FF", "#33FF99", "#FF3333", "#33A1FF"
    ];
    const backgroundColor = colors[Math.floor(Math.random() * colors.length)];

    return `
      <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
        <circle cx="25" cy="25" r="25" style="fill:${backgroundColor};"/>
        <text x="50%" y="50%" font-size="20" font-family="Arial" font-weight="bold" fill="white" text-anchor="middle" alignment-baseline="middle">
          ${initials}
        </text>
      </svg>
    `;
  };

  const svgMarkup = createSvgFromWords(words);

  return (
    <div dangerouslySetInnerHTML={{ __html: svgMarkup }} />
  );
};

export default DynamicSVG;
