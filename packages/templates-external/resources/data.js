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
    id: 'analyze-delivery-price',
    type: 'UI Path Bot',
    name: 'Competitor Delivery Price Analysis',
    description: 'Collects types and prices for delivery from our top10 competitors',
    topic: 'analyze-delivery-price',
    inputs: [
      {
        id: 'competitor-api-key',
        name: 'competitorAPIKey',
        type: 'input',
        description: 'Endpoint of competitors API to get delivery options and prices',
        value: '',
        availableOptions: ['product', 'count', 'email']
      }
    ],
    outputs: [
      {
        id: 'competitor-delivery-options',
        name: 'competitorDeliveryOptions',
        type: 'output',
        description: 'CSV file with list of delivery options and prices',
        value: ''
      }
    ]
  },
  {
    id: 'anaylize-product-price',
    type: 'UI Path Bot',
    name: 'Competitor Product Price Analysis',
    description: 'Collects prices from our top10 competitors, considers top100 products',
    topic: 'anaylize-product-price',
    inputs: [
      {
        id: 'competitor-api-key-2',
        name: 'competitorAPIKey',
        type: 'input',
        description: 'Endpoint of competitors API to get top100 products and prices',
        value: '',
        availableOptions: ['product', 'count', 'email']
      }
    ],
    outputs: [
      {
        id: 'competitor-top-100',
        name: 'competitorTop100ProductPrices',
        type: 'output',
        description: 'CSV file with list of top100 products and prices',
        value: ''
      }
    ]
  },
  {
    id: 'calculate-price',
    type: 'UI Path Bot',
    name: 'Product-Price-Calculator',
    topic: 'calculate-price',
    description: 'Calculates total price for any product of the Webshop',
    inputs: [
      {
        id: 'product',
        name: 'product',
        type: 'input',
        description: 'Product ID as string',
        value: '',
        availableOptions: ['product', 'count', 'email']
      },
      {
        id: 'count',
        name: 'count',
        type: 'input',
        description: 'Quantity of products as integer',
        value: '',
        availableOptions: ['product', 'count', 'email']
      }
    ],
    outputs: [
      {
        id: 'price',
        name: 'price',
        type: 'output',
        description: 'Price in EUR including tax as string',
        value: ''
      }
    ]
  },
  {
    id: 'calculate-price-sale',
    type: 'UI Path Bot',
    name: 'Product Price Calculator Sommer Sale 2020',
    topic: 'calculate-price-sale',
    description: 'Only use for special offers on campaign microsite!',
    inputs: [
      {
        id: 'product-2',
        name: 'product',
        type: 'input',
        description: 'Product ID as string',
        value: '',
        availableOptions: ['product', 'count', 'email']
      },
      {
        id: 'count-2',
        name: 'count',
        type: 'input',
        description: 'Quantity of products as integer',
        value: '',
        availableOptions: ['product', 'count', 'email']
      },
      {
        id: 'discount',
        name: 'discount',
        type: 'input',
        description: 'Discount for the campaign in percent or as static number',
        value: '',
        availableOptions: ['product', 'count', 'email']
      }
    ],
    outputs: [
      {
        id: 'price-2',
        name: 'price',
        type: 'output',
        description: 'Price in EUR including tax as string',
        value: ''
      }
    ]
  },
  {
    id: 'generate-pdf-quote',
    type: 'UI Path Bot',
    name: 'Quote PDF Generator',
    topic: 'generate-pdf-quote',
    description: 'Generates a generic PDF for product quotes based on a corporate design template',
    inputs: [
      {
        id: 'product-3',
        name: 'product',
        type: 'input',
        description: 'Product ID as string',
        value: '',
        availableOptions: ['product', 'count', 'email']
      },
      {
        id: 'count-3',
        name: 'count',
        type: 'input',
        description: 'Quantity of products as integer',
        value: '',
        availableOptions: ['product', 'count', 'email']
      },
      {
        id: 'price-3',
        name: 'price',
        type: 'input',
        description: 'Price in EUR including tax as string',
        value: '',
        availableOptions: ['product', 'count', 'email']
      }
    ],
    outputs: [
      {
        id: 'pdfStorage',
        name: 'pdfStorage',
        type: 'output',
        description: 'URL where generated PDF is stored',
        value: ''
      }
    ]
  },
  {
    id: 'respond-support-case',
    type: 'UI Path Bot',
    name: 'Support Case Response',
    topic: 'respond-support-case',
    description: 'Creates automatic reply when new support ticket has been created',
    inputs: [
      {
        id: 'support-ticket-id',
        name: 'supportTickedId',
        type: 'input',
        description: 'Support ticket ID from JIRA',
        value: '',
        availableOptions: ['product', 'count', 'email']
      }
    ],
    outputs: []
  },
  {
    id: 'generate-support-case',
    type: 'UI Path Bot',
    name: 'Support Case Ticket Generator',
    topic: 'generate-support-case',
    description: 'Creates JIRA ticket when customer fill out support form in webshop',
    inputs: [
      {
        id: 'support-topic',
        name: 'supportTopic',
        type: 'input',
        description: 'Selection from the list of support areas',
        value: '',
        availableOptions: ['product', 'count', 'email']
      },
      {
        id: 'email',
        name: 'email',
        type: 'input',
        description: 'Email contact of customer',
        value: '',
        availableOptions: ['product', 'count', 'email']
      },
      {
        id: 'messageBody',
        name: 'messageBody',
        type: 'input',
        description: 'Message body of support form',
        value: '',
        availableOptions: ['product', 'count', 'email']
      },
      {
        id: 'attachment',
        name: 'attachment',
        type: 'input',
        description: 'Attachments uploaded to the support form',
        value: '',
        availableOptions: ['product', 'count', 'email']
      }
    ],
    outputs: [
      {
        id: 'supportTicketId-2',
        name: 'supportTicketId',
        type: 'output',
        description: 'Support ticket ID from JIRA',
        value: ''
      }
    ]
  },
  {
    id: 'send-quote',
    type: 'UI Path Bot',
    name: 'Webshop Request Mail Response',
    topic: 'send-quote',
    description: 'Send email with quote based on request from webshop',
    inputs: [
      {
        id: 'pdfStorage-2',
        name: 'pdfStorage',
        type: 'input',
        description: 'URL where the generated quote PDF is stored',
        value: '',
        availableOptions: ['product', 'count', 'email']
      },
      {
        id: 'email-2',
        name: 'email',
        type: 'input',
        description: 'Email address of requester',
        value: '',
        availableOptions: ['product', 'count', 'email']
      }
    ],
    outputs: []
  }
];