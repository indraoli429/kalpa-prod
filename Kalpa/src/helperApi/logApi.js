import axios from "axios";

/**
 * @params {string} logs rmarks
 * return nothing. Its a one way thing LOL
 * post logs remark
 *
 */

export default function logApi(remarks) {
  axios
    .post("/logs", {"remarks": remarks})
    .then((result) => console.log(result.data))
    .catch((err) => console.log(err));
}
