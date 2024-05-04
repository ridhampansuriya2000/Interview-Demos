import IconLib from "./icon-lib";

const Icon = ({ size, className, fill, icon, viewBox, onClick }) => {
  return (
    <svg
      width={`${size}`}
      height={`${size}`}
      className={className}
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      onClick={onClick}
      dangerouslySetInnerHTML={{ __html: `${IconLib[icon]}` }}
    ></svg>
  );
};

export default Icon;
