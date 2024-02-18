## random-pair-colors


```sh
npm i @ergofriend/random-pair-colors
```

```tsx
import { generateRandomPairColor } from "@ergofriend/random-pair-colors";

const result = generateRandomPairColor({
  backgroundColor: "#3f2697",
  threshold: 70,
});
console.log(result.textColor, result.backgroundColor); // #82fce9, #3f2697
```

<style>
  pre {
    padding: 10px;
    border: 1px solid grey;
  }
</style>
