export const ELEMENTS = [
  {
    id: 'ServiceTask_1',
    name: 'Get Price',
    templateId: null
  },
  {
    id: 'ServiceTask_2',
    name: 'Generate Quote',
    templateId: null
  },
  {
    id: 'ServiceTask_3',
    name: 'Send Quote',
    templateId: null
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
        mapping: ''
      },
      {
        id: 'input-2',
        name: 'quantity',
        type: 'input',
        description: 'the quantity as integer',
        value: '',
        mapping: ''
      }
    ],
    outputs: [
      {
        id: 'output-1',
        name: 'price',
        type: 'output',
        description: 'Generates a price of type double',
        value: '',
        mapping: ''
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
        mapping: ''
      },
      {
        id: 'input-4',
        name: 'quantity',
        type: 'input',
        description: 'the quantity as integer number',
        value: '',
        mapping: ''
      }
    ],
    outputs: [
      {
        id: 'output-3',
        name: 'url',
        type: 'output',
        description: 'the uploaded url as string',
        value: '',
        mapping: ''
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
        mapping: ''
      },
      {
        id: 'input-6',
        name: 'url',
        type: 'input',
        description: 'url of uploaded quote pdf as string',
        value: '',
        mapping: ''
      }
    ],
    outputs: [
    ]
  }
];