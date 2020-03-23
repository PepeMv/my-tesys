import React from "react";
import { QRCode } from "react-qrcode-logo";
const QrcodeGenerator = ({ valor, logo, size }) => {
  return (
    <div>
      {size ? (
        size <= 250 ? (
          <QRCode
            value={valor}
            size="250"
            logoWidth="100"
            logoHeight="50"
            logoImage={logo}
          />
        ) : (
          <QRCode
            value={valor}
            size={size}
            logoWidth="100"
            logoHeight="50"
            logoImage={logo}
          />
        )
      ) : (
        <QRCode
          value={valor}
          size='250'
          logoWidth="100"
          logoHeight="50"
          logoImage={logo}
        />
      )}
    </div>
  );
};

export default QrcodeGenerator;
