# Wisenet Duplicate Enrolment

A quick tool to find duplicate enrolments in Wisenet.

### Getting Data from Wisenet

This will pull enrolments from Wisenet, and create files with a `x-data.json` format, `x` representing the pagination number.

```sh
node getEnrolments.js
```

### Combining Data

This will be required to combine files from Wisenet API pagination.

```sh
node combileFiles.js
```

### Filtering Data

You will need to change the `combined.json` file to `data.json` before this can be completed.

This will generate two files `duplicates.json` 

```sh
node filterEnrolments.js
```