import React from "react";

function Footer() {
  return (
    <div>
      <footer className="info">
        <p>
          Created by <a href="/#">Fatih Aydin</a>
        </p>
        <p>
          Designed by <a href="https://d12n.me/">Dmitry Sharabin</a>
        </p>
      </footer>
    </div>
  );
}

export default React.memo(Footer);
