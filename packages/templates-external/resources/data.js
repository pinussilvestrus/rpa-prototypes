export const ELEMENTS = [
  {
    id: 'Activity_1rjzrcj',
    name: 'Calculate price',
    templateId: null,
    inputs: [],
    outputs: [],
    outputMappings: []
  },
  {
    id: 'Activity_07c75k4',
    name: 'Generate quote',
    templateId: null,
    inputs: [],
    outputs: [],
    outputMappings: []
  },
  {
    id: 'Activity_0iuynvp',
    name: 'Send quote',
    templateId: null,
    inputs: [],
    outputs: [],
    outputMappings: []
  }
];

export const TEMPLATES = [
  {
    id: 'rpa-price',
    type: 'UI Path Bot',
    name: 'Price Calculator',
    description: 'Calculates a price for a given quantity of products based on legacy Excel logic',
    topic: 'rpa-price',
    inputs: [
      {
        id: 'input-1',
        name: 'product',
        type: 'input',
        description: 'the product name as string',
        value: '',
        availableOptions: []
      },
      {
        id: 'input-2',
        name: 'quantity',
        type: 'input',
        description: 'the quantity as integer',
        value: '',
        availableOptions: []
      }
    ],
    outputs: [
      {
        id: 'output-1',
        name: 'price',
        type: 'output',
        description: 'Generates a price of type double',
        value: ''
      }
    ]
  },
  {
    id: 'rpa-quote',
    type: 'UI Path Bot',
    name: 'Quote Generator',
    description: 'Generates a quote as PDF and stores on Google Drive',
    topic: 'rpa-quote',
    inputs: [
      {
        id: 'input-3',
        name: 'product',
        type: 'input',
        description: 'the product name as string',
        value: '',
        availableOptions: ['price']
      },
      {
        id: 'input-4',
        name: 'quantity',
        type: 'input',
        description: 'the quantity as integer number',
        value: '',
        availableOptions: ['price']
      },
      {
        id: 'input-7',
        name: 'fullPrice',
        type: 'input',
        description: 'the full price for the quote',
        value: '',
        availableOptions: ['price']
      }
    ],
    outputs: [
      {
        id: 'output-3',
        name: 'url',
        type: 'output',
        description: 'the uploaded url as string',
        value: ''
      }
    ]
  },
  {
    id: 'rpa-qsend',
    type: 'UI Path Bot',
    name: 'Quote Sender',
    topic: 'rpa-qsend',
    description: 'Sends a quote via email with link to quote PDF',
    inputs: [
      {
        id: 'input-5',
        name: 'email',
        type: 'input',
        description: 'email adress as string',
        value: '',
        availableOptions: ['price', 'url']
      },
      {
        id: 'input-6',
        name: 'downloadUrl',
        type: 'input',
        description: 'url of quote pdf as string',
        value: '',
        availableOptions: ['price', 'url']
      }
    ],
    outputs: [
    ]
  }
];