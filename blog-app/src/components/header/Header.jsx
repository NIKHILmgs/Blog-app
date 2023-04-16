import "./header.css";

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm"><h1>That Funny Blog</h1></span>
       
      </div>
      <img
        className="headerImg"
        src="https://cdn.pixabay.com/photo/2016/01/08/18/00/antelope-canyon-1128815_1280.jpg"
        alt=""
      />
    </div>
  );
}
