import Link from "next/link";
import { useState } from "react";
const Header = () => {
  const [isOpened, setIsOpened] = useState(false);
  setTimeout(() => {
    setIsOpened(true);
  }, 1);
  return (
      <div className={`header ${isOpened ? "header-slide" : null}`}>
        <Link href={`/`}>
          <a>
            <h2 className={`${isOpened ? "header-title-slide" : null}`}>
              blog
            </h2>
          </a>
        </Link>
      </div>
  );
};

export default Header;
