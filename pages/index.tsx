import Head from "next/head";
import classes from "../styles/Home.module.css";
import { BucketService } from "./service/bucketService";


export default function Home() {

  const {
    path,
    bucket,
    error,
    bucketX,
    bucketY,
    wanted,
    submitHandler,
  } = BucketService();

  return (
    <>
      <Head>
        <title className={classes.title}>Water jug challenge</title>
      </Head>
      <main>
        <form onSubmit={submitHandler}>
          <div className={classes.container}>
            <div>
              <label htmlFor="">Bucket X</label>
              <div>
                <input
                  className={classes.input}
                  type="number"
                  placeholder="0"
                  ref={bucketX}
                />
              </div>
            </div>
            <div className={classes.jug_container}>
              <label htmlFor="">Bucket Y</label>
              <div>
                <input
                  className={classes.input}
                  type="number"
                  placeholder="0"
                  ref={bucketY}
                />
              </div>
            </div>
            <div className={classes.jug_container}>
              <label htmlFor="">Amount wanted Z</label>
              <div>
                <input
                  className={classes.input}
                  type="number"
                  placeholder="0"
                  ref={wanted}
                />
              </div>
            </div>
          </div>
          <div className={classes.submit}>
            <button>submit</button>
          </div>
          {error && <div className={classes.error}>{error}</div>}
        </form>

        {path.length > 0 && (
          <>
            <div className={classes.result}>
              <h4>Solution</h4>
              <table className={classes.table}>
                <thead className={classes.head}>
                  <tr className={classes.bucketsNames}>
                    <th>Bucket X</th>
                    <th>Bucket Y</th>
                    <th>Explanation</th>
                  </tr>
                </thead>
                <tbody>
                  {path.map((value, index) => (
                    <tr key={index}>
                      <td>{bucket?.from === "x" ? value.x : value.y}</td>
                      <td>{bucket?.from === "x" ? value.y : value.x}</td>
                      <td>
                        {value.explanation}
                        {index + 1 === path.length && (
                          <>
                            <br />
                            <strong>Solved</strong>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>
    </>
  );
}