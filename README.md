# rpa-prototypes

Prototypes built via our RPA Prototyping phase, Q2 2020

## Demos

* [`element-template`](./packages/element-template)

## Setup

```bash
$ git clone https://github.com/pinussilvestrus/rpa-prototypes.git
$ cd rpa-prototypes
$ npm install
```

## Usage

```bash
$ npm run dev
```

Visit http://localhost:5000 and visit one demo inside the `packages` directory.

## Contribution

Every demo goes into the `packages` sub-directory. It has to include a `npm run build` task resulting in an `index.html` to serve the Demo in the end. 

Check out the [example demo](./packages/catalog-example) for guidance.

## License

[**MIT**](./LICENSE)
