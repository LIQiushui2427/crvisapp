import React, { useEffect } from "react";
import CryptoJS from "crypto-js"; // Import CryptoJS for token creation

const TableauViz: React.FC = () => {
  // Create the JWT token dynamically
  const createToken = (
    userid: string,
    secret: string,
    iss: string,
    kid: string,
    scp: string[]
  ): string => {
    const header = {
      alg: "HS256",
      typ: "JWT",
      iss,
      kid,
    };
    if(header.iss === undefined || header.kid === undefined) {
      throw new Error("Please provide the iss and kid in the header");
    }
    const stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
    const encodedHeader = base64url(stringifiedHeader);

    const claimSet = {
      sub: userid,
      aud: "tableau",
      nbf: Math.round(new Date().getTime() / 1000) - 100,
      jti: new Date().getTime().toString(),
      iss,
      scp: scp,
      exp: Math.round(new Date().getTime() / 1000) + 100,
    };
    if(claimSet.sub === undefined || claimSet.aud === undefined || claimSet.iss === undefined || claimSet.scp === undefined) {
      throw new Error("Please provide the sub, aud, iss and scp in the claimSet");
    }
    const stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(claimSet));
    const encodedData = base64url(stringifiedData);

    const token = encodedHeader + "." + encodedData;
    if(token === undefined) {
      throw new Error("Token is undefined");
    }
    const signature = CryptoJS.HmacSHA256(token, secret);
    const signedToken = token + "." + base64url(signature);

    return signedToken;
  };

  const base64url = (source: CryptoJS.lib.WordArray): string => {
    let encodedSource = CryptoJS.enc.Base64.stringify(source);
    encodedSource = encodedSource.replace(/=+$/, "");
    encodedSource = encodedSource.replace(/\+/g, "-");
    encodedSource = encodedSource.replace(/\//g, "_");
    return encodedSource;
  };

  const handleGenerateViz = (): void => {
    const userid = (document.getElementById("userid") as HTMLInputElement).value;
    const iss = process.env.REACT_APP_CLIENT_ID;
    const kid = process.env.REACT_APP_SECRET_ID
    const secret = process.env.REACT_APP_CLIENT_SECRET;
    const wurl = process.env.REACT_APP_TABLEAU_WURL;
    const scp: string[] = process.env.REACT_APP_TABLEAU_SCP
    ? process.env.REACT_APP_TABLEAU_SCP.split(",").map((scope) => scope.trim())
    : [];
    console.log("process.env", process.env);
    console.log("userid", userid);
    console.log("iss", iss);
    console.log("kid", kid);
    console.log("secret", secret);
    console.log("wurl", wurl);
    console.log("scp", scp);
    if (userid === undefined || iss === undefined || kid === undefined || secret === undefined || wurl === undefined || scp === undefined) {
      alert("Please fill in all the fields");
      return;
    }
    const token = createToken(userid, secret, iss!, kid!, scp!);
    const jwtInput = document.getElementById("jwt") as HTMLInputElement;
    if (jwtInput) {
      jwtInput.value = token;
    }

    const vizContainer = document.getElementById("dash");
    if (vizContainer) {
      vizContainer.innerHTML = `
        <tableau-viz
          id="tableauViz"
          src="${wurl}"
          token="${token}"
          height="800px"
          width="100%"
          toolbar="Bottom"
          hide-tabs
        ></tableau-viz>
      `;
    }
  };

  useEffect(() => {
    const button = document.getElementById("showme");
    if (button) {
      button.addEventListener("click", handleGenerateViz);
    }

    return () => {
      if (button) {
        button.removeEventListener("click", handleGenerateViz);
      }
    };
  }, []);

  return (
    <div style={{ padding: "20px 100px" }}>
      <div className="form-group row">
        <label className="col-sm-2 col-form-label" htmlFor="userid">
          User you want to authenticate on Tableau:
        </label>
        <div className="col-sm-10">
          <input
            className="form-control"
            type="text"
            id="userid"
            defaultValue="s240079@e.ntu.edu.sg"
          />
        </div>
        </div>
      <div className="form-group row">
        <div className="col-sm-2 col-form-label">
          <button id="showme" className="btn btn-primary">
            Show Me the Dash!
          </button>
        </div>
        <div className="col-sm-8">
          <input
            className="form-control"
            id="jwt"
            type="text"
            readOnly
            placeholder="Generated JWT will appear here..."
          />
        </div>
        <div className="col-sm-2">
          <button
            className="btn btn-secondary"
            id="dec"
            onClick={() =>
              window.open(
                `https://jwt.io/#debugger-io?token=${
                  (document.getElementById("jwt") as HTMLInputElement)?.value
                }`,
                "_blank"
              )
            }
          >
            Decode on JWT.io
          </button>
        </div>
      </div>
      <div id="dash" style={{ height: "100%", width: "100%" }}></div>
    </div>
  );
};

export default TableauViz;
