import test from "ava";
import splitTestSelector from ".";

test("simple", t => {
  const variants = [50, 25, 25];

  {
    const variant = splitTestSelector(1, variants); // [ 25+25, 25, 25 ]
    t.is(variant, 0, "visit #1");
  }
  {
    const variant = splitTestSelector(2, variants);
    t.is(variant, 0, "visit #2");
  }
  {
    const variant = splitTestSelector(3, variants);
    t.is(variant, 1, "visit #3");
  }
  {
    const variant = splitTestSelector(4, variants);
    t.is(variant, 2, "visit #4");
  }
  {
    const variant = splitTestSelector(4, variants);
    t.is(variant, 0, "visit #5");
  }
});

test.skip("two paralel", t => {
  const variants1 = [50, 25, 25];
  const variants2 = [10, 5, 85];
  {
    const variant = splitTestSelector(1, variants1); // [ 25+25, 25, 25 ]
    t.is(variant, 0);
  }
  {
    const variant = splitTestSelector(1, variants2); // [ 25+25, 25, 25 ]
    t.is(variant, 2);
  }
  {
    const variant = splitTestSelector(1, variants2); // [ 25+25, 25, 25 ]
    t.is(variant, 2);
  }
  {
    const variant = splitTestSelector(1, variants2); // [ 25+25, 25, 25 ]
    t.is(variant, 2);
  }
  {
    const variant = splitTestSelector(2, variants1);
    t.is(variant, 0);
  }
  {
    const variant = splitTestSelector(3, variants1);
    t.is(variant, 1);
  }
  {
    const variant = splitTestSelector(3, variants1);
    t.is(variant, 2);
  }
});

test.skip("pecentage overall", t => {
  const variants = [50, 36, 14];
  const actual = [0, 0, 0];
  for (let visitor = 1; visitor <= 100; visitor++) {
    const selected = splitTestSelector(visitor, variants);
    actual[selected]++;
  }
  t.deepEqual(actual, variants);
});

test.todo("pecentage for each visiter");
