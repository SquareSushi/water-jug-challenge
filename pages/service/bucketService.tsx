import { useState, useRef } from 'react';

type bucketsNames = "x" | "y";

interface buckets {
  x: number;
  y: number;
  explanation: string;
}

export const BucketService = () => {
  const [path, setPath] = useState<buckets[]>([]);
  const [bucket, setBucket] = useState<{
    from: bucketsNames;
    to: bucketsNames;
  }>();
  const [error, setError] = useState<string>("");

  const bucketX = useRef<HTMLInputElement>(null);
  const bucketY = useRef<HTMLInputElement>(null);
  const wanted = useRef<HTMLInputElement>(null);

  const gcd = (a: number, b: number): number => {
    if (b == 0) return a;
    return gcd(b, a % b);
  };

  const fill = (
    max_x: number,
    max_y: number,
    z: number,
    from: bucketsNames,
    to: bucketsNames
  ) => {
    const path: buckets[] = [];
    let x = max_x;
    let y = 0;

    path.push({
      x,
      y,
      explanation: `Fill bucket ${from}`,
    });

    while (x != z && y != z) {

      const temp = Math.min(x, max_y - y);

      y += temp;
      x -= temp;

      path.push({
        x,
        y,
        explanation: `Transfer bucket ${from} to bucket ${to}`,
      });

      if (x == z || y == z) break;

      if (x == 0) {
        x = max_x;
        path.push({
          x,
          y,
          explanation: `Fill bucket ${from}`,
        });
      }

      if (y == max_y) {
        y = 0;
        path.push({
          x,
          y,
          explanation: `Dump bucket ${to}`,
        });
      }
    }
    return path;
  };

  const minSteps = (y: number, x: number, z: number) => {
    if (z > x && z > y) {
      setError("No solution");
      return -1;
    }

    if (z % gcd(x, y) != 0) {
      setError("No solution");
      return -1;
    }
    setError("");

    const xToY = fill(x, y, z, "x", "y");
    const yToX = fill(y, x, z, "y", "x");
    setBucket(
      xToY.length > yToX.length
        ? { from: "y", to: "x" }
        : { from: "x", to: "y" }
    );
    setPath(xToY.length > yToX.length ? yToX : xToY);
    return Math.min(
      xToY.length,
    );
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    if (!bucketX.current) throw new Error("bucketX is not assigned");
    if (!bucketY.current) throw new Error("bucketY is not assigned");
    if (!wanted.current) throw new Error("wanted is not assigned");
    event.preventDefault();

    setPath([]);

    const x = Math.floor(+bucketX.current.value);
    const y = Math.floor(+bucketY.current.value);
    const z = Math.floor(+wanted.current.value);

    if (x < 1 || y < 1 || z < 1) {
      return setError("Please fill all the inputs");
    }

    if (z > y && z > x) {
      return setError(`The amount wanted can't be bigger than the buckets`);
    }
    setError("");

    minSteps(y, x, z);
  };

  return {
    path,
    bucket,
    error,
    bucketX,
    bucketY,
    wanted,
    submitHandler,
  };
}