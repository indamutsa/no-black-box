# Machine with no libraries using JS

We can extract the features using the following command:

```bash
node feature_extractor
```

Now within the data folder, we should see the new values for the features in a file called `features.json`.

When classify the data, the best thing to do is to extract its features and then inspect the feature space to see if the nearest neighbors are similar to the data we are trying to classify.

We can reuse some functions in chart.js that return nearest neighbors and the distance between two points.
